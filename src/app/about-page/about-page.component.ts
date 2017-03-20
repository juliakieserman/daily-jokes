import { Component, OnInit } from '@angular/core';
import { JokesService } from '../services/jokes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css'],
  providers: [JokesService]
})
export class AboutPageComponent implements OnInit {

  constructor(private jokeService: JokesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  private randomJoke() {
    let startDate = this.jokeService.getStartDate();
    const endDate = new Date();
    let randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    let param = randomDate.getFullYear() + '-' + this.addZero(randomDate.getMonth()+1) + '-' + this.addZero(randomDate.getDate());
    this.router.navigate(['/home', param]);
  }

  private addZero(value: Number) {
    let paddedValue;
    if (value < 10) {
      paddedValue = '0' + value;
    } else {
      paddedValue = value;
    }
    
    return paddedValue;
  }

}
