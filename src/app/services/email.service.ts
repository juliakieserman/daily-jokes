import { Injectable } from '@angular/core';
import { EmailObj } from '../email-model';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import {Md5} from 'ts-md5/dist/md5';

@Injectable()
export class EmailService {
    private _af;
    email: FirebaseObjectObservable<any[]>;

    constructor(af: AngularFire) {
        this._af = af;
    }

    public addEmail(email: EmailObj, hash: any) {
        const databaseObj = this._af.database.object('/emails');
        databaseObj.update({ [hash]: email});
    }
}