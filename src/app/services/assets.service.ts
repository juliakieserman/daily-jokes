import { Injectable, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { AssetObj } from '../models/asset-model';
import * as firebase from 'firebase';
import * as _ from 'lodash';

//https://github.com/jlmonteagudo/upload-firebase/blob/master/src/app/services/upload-images.service.ts
@Injectable()
export class AssetsService {
    private _af;
    private assets: FirebaseObjectObservable<any[]>;

    constructor(af: AngularFire) {
        this._af = af;
    }

    public uploadImagesToFirebase(files: Array<AssetObj[]>) {
        let storageRef = firebase.storage().ref();
        _.each(files, (item:AssetObj) => {
            item.isUploading = true;
            let uploadTask: firebase.storage.UploadTask = storageRef.child('images/${item.file.name}').put(item.file);

            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, 
            (snapshot) => item.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
            (err0r) => {},
            () => {
                item.url = uploadTask.snapshot.downloadURL;
                item.isUploading = false;
                this.saveAsset({ name: item.file.name, url: item.url });
            });
        });

    }

    public getAsset(count: number) {
        //return this.assetStorage[count];
    }

    private saveAsset(image: any) {
        this._af.database.list('/images').push(image);
    }

}