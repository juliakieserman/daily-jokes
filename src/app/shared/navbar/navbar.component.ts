import { Component, OnInit } from '@angular/core';
import { JokesService } from '../../services/jokes.service';
import { Router } from '@angular/router';
import { JokeObj } from '../../models/joke-model';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    providers: [JokesService]
})
export class NavbarComponent implements OnInit {

    private jokes: JokeObj[] = [];
    private jokeCount: number = 0;
    
    constructor(private jokeService: JokesService, private router: Router) {}

    ngOnInit() {
        this.getJokes();
    }

    private getJokes() {
    this.jokeService.getJokes().subscribe(
      (jokes) => {
        jokes.forEach(joke => {
          this.jokes.push(joke);
          this.jokeCount++;
        });
      });
    }

    goToJoke(joke) {
      this.router.navigate(['/home', joke.date]);
    }

}