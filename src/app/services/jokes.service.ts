import { Injectable } from '@angular/core';
import { JokeObj } from '../joke-model';
import { AngularFire, FirebaseListObservable, FirebaseRef, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class JokesService {
    
    private _af;
    public jokeCount: number = 0;

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
        console.log("in here?");
        const jokesObservable = this.getDailyJoke(today.toString());
        console.log("this is the observable");
        console.log(jokesObservable);
        jokesObservable.set({ ratings: updatedArray});
    }

    public getJokeCount() {
        return this.jokeCount;
    }

}