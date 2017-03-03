import { Injectable } from '@angular/core';
import { JokeObj } from '../joke-model';
import { AngularFire, FirebaseListObservable, FirebaseRef } from 'angularfire2';

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
        return this._af.database.list('/jokes', {
            query: {
                orderByChild: 'date',
                equalTo: today
            }
        });
    }

}