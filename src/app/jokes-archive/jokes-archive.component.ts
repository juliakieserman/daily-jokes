import { Component, OnInit } from '@angular/core';
import { JokesService } from '../services/jokes.service';
import { JokeObj } from '../joke-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jokes-archive',
  templateUrl: './jokes-archive.component.html',
  styleUrls: ['./jokes-archive.component.css'],
  providers: [JokesService]
})
export class JokesArchiveComponent implements OnInit {

  private jokes: JokeObj[] = [];

  constructor(private jokeService: JokesService, private router: Router) { 
  }

  ngOnInit() {
    this.getJokes();
  }

  private getJokes() {
    this.jokeService.getJokes().subscribe(
      (jokes) => {
        jokes.forEach(joke => {
          this.jokes.push(joke);
        });
      });
  }

  private goToJoke(item: JokeObj) {
    //this.router.navigate(['/home', item.date]);
  }

}
