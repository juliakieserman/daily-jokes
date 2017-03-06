import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FirebaseListObservable} from 'angularfire2';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { RatingComponent } from '../rating/rating.component';
import { JokeObj } from '../joke-model';
import { JokesService } from '../services/jokes.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [JokesService]
})
export class HomePageComponent implements OnInit {

  private todayDisplay;
  private todaySearch;
  private monthObj = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  private jokeToday: JokeObj;
  private sub: any;
  private passedData: string;

  constructor(private jokeService: JokesService, private route: ActivatedRoute) {}

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
    var month = this.monthObj[mm];
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
  this.jokeToday = new JokeObj();
  
  this.jokeService.getDailyJoke(searchDate).subscribe(
    (data) => {
      this.jokeToday = data[0];
    });
  }

}
