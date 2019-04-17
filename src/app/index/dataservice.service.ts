import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Parking} from "../model/view/parking";
import {Observable} from "rxjs/Observable";

@Injectable()
export class DataserviceService {

    private parkings: BehaviorSubject<Parking[]> = new BehaviorSubject([]);
    currentParkings: Observable<Parking[]> = this.parkings.asObservable();

    private bestParkings: BehaviorSubject<Parking[]> = new BehaviorSubject([]);
    currentBestParkings: Observable<Parking[]> = this.bestParkings.asObservable();

    private minPrice = new BehaviorSubject<number>(0);
    currentMinPrice = this.minPrice.asObservable();

    private maxPrice = new BehaviorSubject<number>(0);
    currentMaxPrice = this.maxPrice.asObservable();

    private hasCharger = new BehaviorSubject<boolean>(false);
    currentHasCharger = this.hasCharger.asObservable();

    constructor() {
    }

    pushParkingsToDataService(parkings: Parking[]) {
        this.parkings.next(parkings);
    }

    pushBestParkingsToDataService(bestParkings: Parking[]) {
        this.bestParkings.next(bestParkings);
    }

    setMinPrice(minPrice: number) {
        this.minPrice.next(minPrice);
    }

    setMaxPrice(maxPrice: number) {
        this.maxPrice.next(maxPrice);
    }

    setHasCharger(hasCharger: boolean) {
        this.hasCharger.next(hasCharger);
    }

}
