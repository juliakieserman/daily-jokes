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


    //https://hooks.zapier.com/hooks/catch/2087894/m7hxle/

    public addEmail(email: EmailObj, hash: any) {
        const databaseObj = this._af.database.object('/emails');
        databaseObj.update({ [hash]: email });
    }

    public sendEmail():Observable<String> {
        const name = "Julia";
        const email="kieserman.julia@gmail.com";
        const message="this is a test";
         let body = `name=${name}&email=${email}&message=${message}`;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
 
    return this.http.post(this.contactUrl, body, options)
                    //.map(res =>  <string> res.json())
                    .catch(this.handleError)
    }

    private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error('Error in retrieving news: ' + error);
    return Observable.throw(error.json().error || 'Server error');
  }
   /* public sendEmail() {
        const fromName = "Julia";
        const fromEmail = "kieserman.julia@gmail.com";
        const message = "THIS IS A TEST";

        var requestHeaders = new Headers();
        var body = new URLSearchParams()
        body.append("from", fromEmail)
    body.append("to", fromEmail)
    body.append("subject", message)
    body.append("html", message)
    requestHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    return this.http.post(
      "https://api:key-aa1fecf5c0fa298f77f60b63b76a9768@api.mailgun.net/v3/" + "https://api.mailgun.net/v3/jokes-website.firebaseapp.com" + "/messages",
      body, {headers: requestHeaders})
    }*/
}