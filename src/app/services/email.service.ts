import { Injectable } from '@angular/core';
import { EmailObj } from '../models/email-model';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Md5 } from 'ts-md5/dist/md5';
import { Http, Headers, URLSearchParams, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class EmailService {
    private _af;
    email: FirebaseObjectObservable<any[]>;
    private contactUrl = '../email.php';

    constructor(af: AngularFire, private http: Http) {
        this._af = af;
    }

    public addEmail(email: EmailObj, hash: any) {
        const databaseObj = this._af.database.object('/emails');
        databaseObj.update({ [hash]: email });
    }

    public getDailySubscribers(): FirebaseObjectObservable<any[]> {
        return this._af.database.list('/emails');
    }

    public getWeeklySubscribers() {

    }

    public getMonthlySubscribers() {

    }

    public testEmail() {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post("DUMMY", options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

}