import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class SharedServiceService {

    myMethod$: Observable<any>;
    private myMethodSubject = new Subject<any>();

    constructor() {
        this.myMethod$ = this.myMethodSubject.asObservable();
    }

    highLightOnMap(id) {
        this.myMethodSubject.next(id);
    }
}
