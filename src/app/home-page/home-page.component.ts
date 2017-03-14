import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FirebaseObjectObservable, FirebaseListObservable, AngularFire } from 'angularfire2';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { JokeObj } from '../models/joke-model';
import { RatingObj } from '../models/rating-model';
import { AssetsService } from '../services/assets.service';
import { JokesService } from '../services/jokes.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [AssetsService, JokesService]
})
export class HomePageComponent implements OnInit {

  private todayDisplay;
  private todaySearch;
  private monthObj = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  //private jokeToday: FirebaseObjectObservable<JokeObj>;
  private jokeToday: JokeObj;
  private jokeRatings: FirebaseListObservable<any>;
  private sub: any;
  private passedData: string;
  private searchToday: string;
   
    //for testing purposes...replace with searchDate
  public dummyDate: String = "9999-04-04";

  /* rating variables */
  public max: number = 5;
  public rate: number = 5;
  public isReadonly: boolean = false;
  public overStar: number;
  private submittedRating: boolean = false;

  private _af: AngularFire;

  constructor(
    private route: ActivatedRoute, 
    private af: AngularFire,
    private jokeService: JokesService,
    private assetService: AssetsService) {
    this._af = af;
  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.passedData = params['date'];
    });

    if(this.passedData) {
      this.searchToday = this.passedData
    } else {
      this.searchToday = this.getTodayDate();
    }

    //load data
    this.loadDailyJoke(this.searchToday);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private getTodayDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var month = this.monthObj[mm-1];
    var yyyy = today.getFullYear();

    // format dates to search database and display on page
    this.todayDisplay = month + ' ' + dd + ', ' + yyyy;
    let searchDate = yyyy + '-' + (this.addZero(mm)) + '-' + this.addZero(dd);

    return searchDate;
}

private addZero(value: Number) {
  let paddedValue;
  if (value < 10) {
    paddedValue = '0' + value;
  }
  return paddedValue;
}

  private loadDailyJoke(searchDate: string) {
    //get joke object and bind
    this.jokeToday = this.jokeService.getDailyJoke(this.dummyDate);
    console.log("this is the joke");
    console.log(this.jokeToday);

    //get ratings for this joke
    this.jokeRatings = this._af.database.list('/ratings/' + this.dummyDate);

    //if it has an asset, need to go get it
    if (this.jokeToday.hasAsset) {
      console.log("and we got an asset");
    }
  }

  /* rating functions */
  public hoverOver(value: number) {
    this.overStar = value;
  };

  public resetStar() {
    this.overStar = void 0;
  }

  public submitRating() {
    //acknowledge submission to user
    this.submittedRating = true;
    this.isReadonly = true;
   

    this.jokeRatings.push(this.rate);
  }

      /* retrieve stored image */
   // const storageRef = firebase.storage().ref().child('testString');
   // storageRef.getDownloadURL().then(url => this.image = url);


}
