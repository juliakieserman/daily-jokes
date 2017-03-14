/* Modules */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { DatePickerModule } from 'ng2-datepicker';
import { CommonModule } from '@angular/common';
import { ClarityModule } from 'clarity-angular';

/* ng2-bootstrap modules */
import { RatingModule } from 'ng2-bootstrap/rating';

/* Components */
import { AppComponent } from './app.component';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { HomePageComponent } from './home-page/home-page.component';
import { JokesArchiveComponent } from './jokes-archive/jokes-archive.component';
import { CreateJokeComponent } from './create-joke/create-joke.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SubscriptionPageComponent } from './subscription-page/subscription-page.component';
//import { AboutPageComponent } from './about-page/about-page.component';
import { HeaderComponent } from './shared/header/header.component';

import { NgDropFilesDirective } from './directives/ng-drop-files.directive';

export const firebaseConfig = {
    apiKey: "AIzaSyAq3BR1axTBqeqdqHWbqF68bPShUOiML8Y",
    authDomain: "jokes-website.firebaseapp.com",
    databaseURL: "https://jokes-website.firebaseio.com",
    storageBucket: "jokes-website.appspot.com",
    messagingSenderId: "1016586563889"
};

const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};

const appRoutes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home/:date', component: HomePageComponent },
  { path: 'create', component: CreateJokeComponent },
  { path: 'archives', component: JokesArchiveComponent },
  { path: 'subscriptions', component: SubscriptionPageComponent },
 // { path: 'about', component: AboutPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    JokesArchiveComponent,
    CreateJokeComponent,
    NavbarComponent,
    SubscriptionPageComponent,
    //AboutPageComponent,
    HeaderComponent,
    NgDropFilesDirective
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(appRoutes),
    DatePickerModule,
    RatingModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    ClarityModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
