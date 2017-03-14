import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { EmailService } from '../services/email.service';
import { EmailObj } from '../email-model';

@Component({
  selector: 'app-subscription-page',
  templateUrl: './subscription-page.component.html',
  styleUrls: ['./subscription-page.component.css'],
  providers: [LoginService, EmailService]
})
export class SubscriptionPageComponent implements OnInit {

  private _af: AngularFire;
  private loginService: LoginService;
  private emailService: EmailService;
  private loggedIn: boolean = false;
  private subscriptionOptions = ['Daily', 'Weekly', 'Monthly'];
  private email: EmailObj;

  constructor(af: AngularFire, 
  loginService: LoginService, 
  private router: Router,
  emailService: EmailService) {
    this._af = af;
    this.loginService = loginService;
    this.emailService = emailService;
   }

  ngOnInit() {
    this.loggedIn = this.loginService.checkLogin();
    this.email = new EmailObj();
  }

  appLogin() {
    this.loginService.login();
  }

  subscribe() {
    console.log(this.email);
    this.emailService.addEmail(this.email);
    this.router.navigate(['/home']);
  }

}
