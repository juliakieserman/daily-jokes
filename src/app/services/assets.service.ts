import { Injectable, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class AssetsService {
    private _af;
    private assets: FirebaseObjectObservable<any[]>;

    constructor(af: AngularFire) {
        this._af = af;
    }

    public addAsset(count: number, fileName: string) {
        const databaseObj = this._af.database.object('/assets');
        databaseObj.update({ [count]: fileName });
    }

    public getAsset(count: number) {
        //return this.assetStorage[count];
    }

}