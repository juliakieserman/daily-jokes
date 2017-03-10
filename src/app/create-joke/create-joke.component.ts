import { Component, OnInit } from '@angular/core';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { AngularFire, FirebaseListObservable, FirebaseRef } from 'angularfire2';
import { Router } from '@angular/router';
import { JokeObj } from '../joke-model';

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

  constructor(private af: AngularFire, private router: Router) { 
    this.options = new DatePickerOptions();
  }

  ngOnInit() {
    this.newJoke = new JokeObj();
    this.newJoke.ratings = [-1, -1];
  }

  private addToDB() {
    const dateString = this.newJoke.date.toString();
    const databaseObj = this.af.database.object('/jokes');
    databaseObj.update({ [dateString]: this.newJoke });
    this.router.navigate(['/home']);
  }



}
