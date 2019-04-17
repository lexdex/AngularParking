import {Component, OnInit, ViewChild} from '@angular/core';
import {Parking} from '../../model/view/parking';
import {ManagerParkingService} from '../manager-parking.service';
import {Router} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import {MatDialog, MatSelect, MatSnackBar} from '@angular/material';
import * as HttpStatus from 'http-status-codes';
import {DeleteConfirmationDialogComponent} from './delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
    selector: 'app-manager-parking-list',
    templateUrl: './manager-parking-list.component.html',
    styleUrls: ['./manager-parking-list.component.css']
})
export class ManagerParkingListComponent implements OnInit {

    parkings: Parking[] = [];

    @ViewChild('category')
    private category: MatSelect;

    constructor(private managerParkingService: ManagerParkingService,
                private router: Router,
                private snackBar: MatSnackBar,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        this.loadParkings();
    }

    loadParkings(): void {
        this.managerParkingService.getParkings()
            .subscribe(parkings => {
                this.parkings = parkings.body;
            });
    }

    showOnMap(latitude: number, longitude: number): void {
        window.open(`https://www.google.com/maps/search/?api=1&query=
                    ${latitude},${longitude}`);
    }

    showStatistic(id: number): void {
        this.router.navigate(['parkingdetail/' + id + '/spotstatistic']);
    }

    showSpots(id: number): void {
        this.router.navigate(['manager-configuration/' + id + '/spots']);
    }

    onParkingEditClick(id: number): void {
        this.router.navigateByUrl('/manager-configuration/parkings/edit/' + id);
    }

    onParkingDeleteClick(parking: Parking): void {
        let dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
            data: {confirmed: false}
        });

        dialogRef.afterClosed().subscribe(data => {
            if (data.confirmed) {
                this.managerParkingService.deleteParking(parking)
                    .subscribe(response => this.onDeleteResponse(parking, response));
            }
        });
    }

    private onDeleteResponse(parking: Parking, response: HttpResponse<any>): void {
        if (response.status === HttpStatus.OK) {
            this.snackBar.open('Parking deleted sucsessfully.', null, {
                duration: 2000
            });
            let index = this.parkings.indexOf(parking);
            this.parkings.splice(index, 1);
        }
    }

    findParkings(search: string): void {
        var criterias;
        if (!this.category.value)
            criterias = new ParkingSerchCriterias(search, true, false, false);
        if (this.category.value == 1)
            criterias = new ParkingSerchCriterias(search, true, false, false);
        if (this.category.value == 2)
            criterias = new ParkingSerchCriterias(search, false, true, false);
        if (this.category.value == 3)
            criterias = new ParkingSerchCriterias(search, false, false, true);
        this.managerParkingService.findParkings(criterias)
            .subscribe(parkings => {
                this.parkings = parkings.body;
            }, error => {
                this.router.navigate(['error/forbidden']);
            });
    }
}

export class ConfirmationDialog {

    result: boolean;

    constructor(public dialog: MatDialog) {
    }

    openDialog(): void {
        let dialogRef = this.dialog.open(ConfirmationDialog, {
            width: '50px',
        });

        dialogRef.afterClosed().subscribe(result => {
            this.result = result;
        });
    }
}

export class ParkingSerchCriterias {
    public readonly search: string;
    public readonly all: boolean;
    public readonly hasCharger: boolean;
    public readonly isCovered: boolean;

    constructor(search: string, all: boolean, hasCharger: boolean, isCovered: boolean) {
        this.search = "";
        this.search = search;
        this.all = all;
        this.hasCharger = hasCharger;
        this.isCovered = isCovered;
    }
}