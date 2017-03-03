import { Component, OnInit } from '@angular/core';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { AngularFire, FirebaseListObservable, FirebaseRef } from 'angularfire2';

export class JokeObj {
  title: string;
  description: string;
  date: Date;
}

@Component({
  selector: 'app-create-joke',
  templateUrl: './create-joke.component.html',
  styleUrls: ['./create-joke.component.css']
})

export class CreateJokeComponent implements OnInit {

  private description: string;
  private date: DateModel;
  private options: DatePickerOptions;
  private jokes: FirebaseListObservable<any[]>;
  private newJoke: JokeObj;

  constructor(af: AngularFire) { 
    this.options = new DatePickerOptions();
    this.jokes = af.database.list('/jokes');

  }

  ngOnInit() {
    this.newJoke = new JokeObj();
  }

  private addToDB() {
    console.log("this is how the date is formatted");
    console.log(this.newJoke.date);
    this.jokes.push(this.newJoke);
  }



}
