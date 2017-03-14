import { Injectable } from '@angular/core';
import { JokeObj } from '../models/joke-model';
import { AngularFire, FirebaseListObservable, FirebaseRef, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class JokesService {
    
    private _af;

    constructor(af: AngularFire) {
        this._af = af;
    }

    public getJokes() {
        return this._af.database.list('/jokes');
    }

    public getDailyJoke(today: String) {
        return this._af.database.object('/jokes/' + today);
    }

    public submitRating(today: Date, updatedArray: number[]) {
        const jokesObservable = this.getDailyJoke(today.toString());
        jokesObservable.set({ ratings: updatedArray});
    }

    public addJoke(jokeObj: JokeObj) {
        const date = jokeObj.date.toString();
        const databaseObj = this._af.database.object('/jokes');
        databaseObj.update({ [date]: jokeObj});
    }

}