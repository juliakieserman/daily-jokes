import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable, AngularFire } from 'angularfire2';
import { JokeObj } from '../models/joke-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jokes-archive',
  templateUrl: './jokes-archive.component.html',
  styleUrls: ['./jokes-archive.component.css']
})
export class JokesArchiveComponent implements OnInit {

  private jokes: FirebaseListObservable<any>;
  private _af: AngularFire;

  constructor(private af: AngularFire, private router: Router) { 
    this._af = af;
  }

  ngOnInit() {
    //load jokes
    this.jokes = this._af.database.list('/jokes');
  }

  private goToJoke(item: JokeObj) {
    console.log("you wanna see the item");
    console.log(item);
    //this.router.navigate(['/home', item.date]);
  }

}
