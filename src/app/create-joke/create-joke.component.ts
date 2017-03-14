import { Component, OnInit } from '@angular/core';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { AngularFire, FirebaseListObservable, FirebaseRef } from 'angularfire2';
import { Router } from '@angular/router';
import { JokeObj } from '../joke-model';
import { JokesService } from '../services/jokes.service';

@Component({
  selector: 'app-create-joke',
  templateUrl: './create-joke.component.html',
  styleUrls: ['./create-joke.component.css'],
  providers: [JokesService]
})

export class CreateJokeComponent implements OnInit {

  private description: string;
  private date: DateModel;
  private options: DatePickerOptions;
  private jokes: FirebaseListObservable<any[]>;
  private newJoke: JokeObj;

  constructor(
    private af: AngularFire, 
    private router: Router, 
    private jokeService: JokesService) { 
    this.options = new DatePickerOptions();
  }

  ngOnInit() {
    this.newJoke = new JokeObj();

    //init for file upload
    /*var storageRef = firebase.storage.ref("folderName/file.jpg");
    var fileUpload = document.getElementById("fileUpload");
    fileUpload.on(‘change’, function(evt) {
      var firstFile = evt.target.file[0]; // get the first file uploaded
      var uploadTask = storageRef.put(firstFile);
});*/
  }

  private addToDB() {
    this.jokeService.addJoke(this.newJoke);
   /* const dateString = this.newJoke.date.toString();
    const databaseObj = this.af.database.object('/jokes');
    databaseObj.update({ [dateString]: this.newJoke });*/
    this.router.navigate(['/home']);
  }

  fileChange($event) {
    this.newJoke.hasAsset = true;
    console.log($event);
  }

}
