import { Component, OnInit } from '@angular/core';
import { HomePageComponent } from './home-page/home-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  private today;
  private monthObj = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  ngOnInit() {
   this.getTodayDate();
  }

  private getTodayDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth();
    var month = this.monthObj[mm];
    var yyyy = today.getFullYear();

    this.today = month + ' ' + dd + ', ' + yyyy;
  }
}
