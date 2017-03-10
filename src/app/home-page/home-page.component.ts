import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FirebaseObjectObservable, AngularFire } from 'angularfire2';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { JokeObj } from '../joke-model';
import { RatingObj } from '../rating-model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  private todayDisplay;
  private todaySearch;
  private monthObj = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  private jokeToday: FirebaseObjectObservable<JokeObj>;
  private sub: any;
  private passedData: string;

  /* rating variables */
  public max: number = 5;
  public rate: number = 5;
  public isReadonly: boolean = false;
  public overStar: number;
  private submittedRating: boolean = false;

  private _af;

  constructor(private route: ActivatedRoute, af: AngularFire) {
    this._af = af;
  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.passedData = params['date'];
    });

    if(this.passedData) {
      this.loadDailyJoke(this.passedData);
    } else {
      this.getTodayDate();
    }
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
    this.todaySearch = yyyy + '-' + (this.addZero(mm)) + '-' + this.addZero(dd);

    this.loadDailyJoke(this.todaySearch);
}

private addZero(value: Number) {
  let paddedValue;
  if (value < 10) {
    paddedValue = '0' + value;
  }
  return paddedValue;
}

private loadDailyJoke(searchDate: string) {
  //for testing purposes...replace with searchDate
  const dummyDate = "2005-05-05";

  this.jokeToday = this._af.database.object('/jokes/' + dummyDate);
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

    //TODAY SEARCH WILL NEED TO BE REPLACED WITH A USER ID
    const databaseObj = this._af.database.object('/ratings/' + this.todaySearch);
    databaseObj.set({ rating: this.rate });
  }


}
