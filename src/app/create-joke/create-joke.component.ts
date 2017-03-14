import { Component, OnInit } from '@angular/core';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { AngularFire, FirebaseListObservable, FirebaseRef } from 'angularfire2';
import { Router } from '@angular/router';
import { JokeObj } from '../models/joke-model';
import { AssetObj } from '../models/asset-model';
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

  private fileName: string;
  private fileNames: string[] = [];

  constructor(
    private af: AngularFire, 
    private router: Router, 
    private jokeService: JokesService,
    private assetService: AssetsService) { 
    this.options = new DatePickerOptions();
  }

  ngOnInit() {
    this.newJoke = new JokeObj();
  }

  /* Start file upload functions */
  public fileOverDropZone(e: any) {
    this.isDropZoneOver = e;
  }

  uploadImagesToFirebase() {
    this.newJoke.hasAsset = true;
    this.isEnabledUpload = false;
    const assetNum = this.files.length;
    this.assetService.uploadImagesToFirebase(this.files);
  }

  clearFiles() {
    this.files = [];
    this.isEnabledUpload = true;
  }
  /* End file upload functions */

  private addFileName() {
    this.fileNames.push(this.fileName);
    this.fileName = '';
  }

  private addToDB() {
    this.jokeService.addJoke(this.newJoke);
    this.router.navigate(['/home']);
  }

}
