import { Injectable } from '@angular/core';
import { JokeObj } from '../models/joke-model';
import { AngularFire, FirebaseListObservable, FirebaseRef, FirebaseObjectObservable } from 'angularfire2';

const MONTH_OBJ = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const FIVE = 5;
const START_TIME = new Date('February 15, 2017 5:08:00');
const DAY_IN_MILLISECONDS = 1000*60*60*24;
const DAYS_IN_WEEK = 7;
const WEEKS_IN_MONTH = 4;

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

    public getLastFive(): FirebaseListObservable<any[]> {
        return this._af.database.list('/jokes', {
            query: {
                limitToLast: FIVE
            }
        });
    }

    /* Date functions */
    public calcDateDiff() {
        let today = new Date();
        let todayTime = today.getTime();
        let startTime = START_TIME.getTime();

        let diff = Math.abs(todayTime - startTime);
        return Math.round(diff/DAY_IN_MILLISECONDS);
    }

    public calcWeekDiff() {
        let days = this.calcDateDiff();
        return Math.round(days/DAYS_IN_WEEK);
    }

    public calcMonthDiff() {
        let weeks = this.calcMonthDiff();
        return Math.round(weeks/WEEKS_IN_MONTH);
    }

    public getStartDate() {
        return START_TIME;
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