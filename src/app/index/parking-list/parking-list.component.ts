import {Component, OnDestroy, OnInit} from '@angular/core';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/debounceTime';
import {Parking} from '../../model/view/parking';
import {Router} from '@angular/router';

@Component({
    selector: 'app-parking-list',
    templateUrl: './parking-list.component.html',
    styleUrls: ['./parking-list.component.css']
})
export class ParkingListComponent implements OnInit, OnDestroy {

    public parkings: Parking[] = [];

    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    showOnMap(latitude: number, longitude: number): void {
        window.open(`https://www.google.com/maps/search/?api=1&query=
                    ${latitude},${longitude}`);
    }

    ngOnDestroy(): void {
    }

    onMoreInfoClick(id: number): void {
        this.router.navigateByUrl('/parkingdetail/' + id);
    }

    round(floatNumber: number): number {
        return Math.round(floatNumber);
    }
}
