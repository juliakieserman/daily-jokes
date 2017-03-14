import { Component, OnInit } from '@angular/core';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { AngularFire, FirebaseListObservable, FirebaseRef } from 'angularfire2';
import { Router } from '@angular/router';
import { JokeObj } from '../joke-model';
import { AssetObj } from '../asset-model';
import { JokesService } from '../services/jokes.service';
import { AssetsService } from '../services/assets.service';

@Component({
  selector: 'app-create-joke',
  templateUrl: './create-joke.component.html',
  styleUrls: ['./create-joke.component.css'],
  providers: [JokesService, AssetsService]
})

export class CreateJokeComponent implements OnInit {

  private description: string;
  private date: DateModel;
  private options: DatePickerOptions;
  private jokes: FirebaseListObservable<any[]>;
  private newJoke: JokeObj;


  //file upload variables
  isDropZoneOver: boolean = false;
  isEnabledUpload: boolean = true;
  files: Array<AssetObj[]> = [];


  constructor(
    private af: AngularFire, 
    private router: Router, 
    private jokeService: JokesService,
    private assetService: AssetsService) { 
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

  /* File upload functions */
  public fileOverDropZone(e: any) {
    this.isDropZoneOver = e;
  }

  uploadImages() {
    this.newJoke.hasAsset = true;
    this.isEnabledUpload = false;
    this.assetService.uploadImagesToFirebase(this.files);
  }

  clearFiles() {
    this.files = [];
    this.isEnabledUpload = true;
  }

  private addToDB() {
    this.jokeService.addJoke(this.newJoke);
   /* const dateString = this.newJoke.date.toString();
    const databaseObj = this.af.database.object('/jokes');
    databaseObj.update({ [dateString]: this.newJoke });*/
    this.router.navigate(['/home']);
  }

  /*fileChange($event) {
    this.newJoke.hasAsset = true;

    
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      console.log(file);
      console.log(formData);
    }

    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child('mountains.jpg');
    const pathRef = storageRef.child('images/montains.jpg');

    //var file = //fileAPI;
    //ref.put(file).then()

    console.log(event);
  }*/

}
