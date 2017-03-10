/* Modules */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { DatePickerModule } from 'ng2-datepicker';
import { CommonModule } from '@angular/common';

/* ng2-bootstrap modules */
import { RatingModule } from 'ng2-bootstrap/rating';

/* Components */
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { HomePageComponent } from './home-page/home-page.component';
import { JokesArchiveComponent } from './jokes-archive/jokes-archive.component';
import { CreateJokeComponent } from './create-joke/create-joke.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

export const firebaseConfig = {
    apiKey: "AIzaSyAq3BR1axTBqeqdqHWbqF68bPShUOiML8Y",
    authDomain: "jokes-website.firebaseapp.com",
    databaseURL: "https://jokes-website.firebaseio.com",
    storageBucket: "jokes-website.appspot.com",
    messagingSenderId: "1016586563889"
};

const appRoutes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home/:date', component: HomePageComponent },
  { path: 'create', component: CreateJokeComponent },
  { path: 'archives', component: JokesArchiveComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    JokesArchiveComponent,
    CreateJokeComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(appRoutes),
    DatePickerModule,
    RatingModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
