import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-jokes-archive',
  templateUrl: './jokes-archive.component.html',
  styleUrls: ['./jokes-archive.component.css']
})
export class JokesArchiveComponent implements OnInit {

  private jokes: FirebaseListObservable<any[]>;

  constructor(af: AngularFire) { 
    this.jokes = af.database.list('/jokes');
  }

  ngOnInit() {
  }

}
