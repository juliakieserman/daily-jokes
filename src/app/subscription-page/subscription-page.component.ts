import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
//import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { EmailService } from '../services/email.service';
import { EmailObj } from '../models/email-model';
import { Md5 } from 'ts-md5/dist/md5';
import { JokesService } from '../services/jokes.service';

@Component({
  selector: 'app-subscription-page',
  templateUrl: './subscription-page.component.html',
  styleUrls: ['./subscription-page.component.css'],
  providers: [EmailService, Md5, JokesService]
})
export class SubscriptionPageComponent implements OnInit {

  private _af: AngularFire;
  //private loginService: LoginService;
  private emailService: EmailService;
  private jokeService: JokesService;
  private loggedIn: boolean = false;
  private subscriptionOptions = ['Daily', 'Weekly', 'Monthly'];
  private email: EmailObj;

  /* counter variables */
  private dayCount: number;
  private weekCount: number;
  private monthCount: number;

  constructor(af: AngularFire, 
  //loginService: LoginService, 
  private router: Router,
  emailService: EmailService,
  jokeService: JokesService,
  private _md5: Md5) {
    this._af = af;
    //this.loginService = loginService;
    this.emailService = emailService;
    this.jokeService = jokeService;
   }

  ngOnInit() {
    //this.loggedIn = this.loginService.checkLogin();
    this.email = new EmailObj();
    console.log("THIS IS WHAT I WANT");
    console.log(this.emailService.getDailySubscribers());
    //this.getCalendarValues();
  }

  getCalendarValues() {
    console.log("wut");
    this.dayCount = this.jokeService.calcDateDiff();
    console.log("back with day");
    console.log(this.dayCount);
    this.weekCount = this.jokeService.calcWeekDiff();
    console.log("back with week");
    console.log(this.weekCount);
    //this.monthCount = this.jokeService.calcMonthDiff();
    console.log("back!");
  }

  appLogin() {
    //this.loginService.login();
  }

  testEmail() {
    this.emailService.testEmail();
  }

  subscribe() {
    let hash = Md5.hashStr(this.email.email);
    this.emailService.addEmail(this.email, hash);
    this.router.navigate(['/home']);
  }

   handleResponse(response){
      // console.log(`msg is: {response.status}`);
 
      if(response.status =='success'){
        alert('tg it worked');
      }
 
      if(response.status =='error'){
        alert('ugh this is german and not working');
      }
    }


}
