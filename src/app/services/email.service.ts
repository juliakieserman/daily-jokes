import { Injectable } from '@angular/core';
import { EmailObj } from '../email-model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class EmailService {
    private _af;
    emails: FirebaseListObservable<any[]>;

    constructor(af: AngularFire) {
        this._af = af;
    }

    public addEmail(email: EmailObj) {
        this.emails = this._af.database.list('/emails');
        this.emails.push({email});
    }
}