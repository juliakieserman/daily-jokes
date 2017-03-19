import { Injectable } from '@angular/core';
import { EmailObj } from '../models/email-model';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Md5 } from 'ts-md5/dist/md5';
import { Http, Headers } from '@angular/http';

@Injectable()
export class EmailService {
    private _af;
    email: FirebaseObjectObservable<any[]>;

    constructor(af: AngularFire, private http: Http) {
        this._af = af;
    }

    public addEmail(email: EmailObj, hash: any) {
        const databaseObj = this._af.database.object('/emails');
        databaseObj.update({ [hash]: email });
    }

    public sendEmail() {
        const fromName = "Julia";
        const fromEmail = "kieserman.julia@gmail.com";
        const message = "THIS IS A TEST";

        const headers = new Headers();
        headers.append("Authorization", "Basic "+btoa(JSON.parse(localStorage.getItem('EMAIL_API_KEY')).key));
        headers.append("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        const recieverMail = "kieserman.julia@gmail.com";
        const subject = "testing the email";
        const recieverName = "Julia Kieserman";
        const url = "https://api.mailgun.net/v3/sandbox10b55717efc841c595bc8bda9274c51d.mailgun.org/messages";
        const body = "from="+fromName+"<"+fromEmail+">&to="+recieverName+"<"+recieverMail+">&subject="+subject+"&text="+message;
        return this.http.post(url,body,{headers:headers});
    }
}