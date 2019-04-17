import {Component, OnInit, ViewChild} from '@angular/core';
import * as HttpStatus from 'http-status-codes';
import {Spot} from '../../model/view/spot';
import {ManagerSpotService} from '../manager-spot.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatSelect, MatSnackBar} from '@angular/material';
import {DeleteConfirmationDialogComponent} from '../manager-parking-list/delete-confirmation-dialog/delete-confirmation-dialog.component';
import {HttpResponse} from '@angular/common/http';
import {SpotAddDialogComponent} from './spot-add-dialog/spot-add-dialog.component';

@Component({
    selector: 'app-manager-spot-list',
    templateUrl: './manager-spot-list.component.html',
    styleUrls: ['./manager-spot-list.component.css']
})
export class ManagerSpotListComponent implements OnInit {

    spots: Spot[] = [];
    spot: Spot;

    @ViewChild('category')
    private category: MatSelect;

    constructor(private route: ActivatedRoute,
                private managerSpotService: ManagerSpotService,
                private router: Router,
                private snackBar: MatSnackBar,
                private dialog: MatDialog) {
    }


    ngOnInit() {
        this.loadSpots();
    }

    loadSpots(): void {
        const parkingId = parseInt(this.route.snapshot.paramMap.get('id'));
        this.managerSpotService.getSpots(parkingId)
            .subscribe(spots => {
                this.spots = spots.body;
            }, error => {
                this.router.navigate(['error/forbidden']);
            });
    }

    onSpotEditClick(spot: Spot): void {
        spot.isFree = true;
        spot.spotNumberUpdate = spot.spotNumber;
        spot.hasChargerUpdate = spot.hasCharger;
        spot.isInvalidUpdate = spot.isInvalid;
        spot.isBlockedUpdate = spot.isBlocked;
    }

    onSpotCancelEditClick(spot: Spot): void {
        spot.isFree = false;
    }

    onSpotDeleteClick(spot: Spot): void {
        let dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
            data: {confirmed: false}
        });

        dialogRef.afterClosed().subscribe(data => {
            if (data.confirmed) {
                this.managerSpotService.deleteSpot(spot)
                    .subscribe(response => this.onDeleteResponse(spot, response));
            }
        });
    }

    onSpotAddClick(): void {
        let dialogRef = this.dialog.open(SpotAddDialogComponent, {
            data: new Spot()
        });

        dialogRef.afterClosed().subscribe((spot: Spot) => {
            this.spotSave(spot);
        });
    }

    onSpotUpdateClick(spot: Spot): void {
        spot.spotNumber = spot.spotNumberUpdate;
        spot.hasCharger = spot.hasChargerUpdate;
        spot.isInvalid = spot.isInvalidUpdate;
        spot.isBlocked = spot.isBlockedUpdate;
        this.spotSave(spot);
    }

    private onDeleteResponse(spot: Spot, response: HttpResponse<any>): void {
        if (response.status === HttpStatus.OK) {
            this.snackBar.open('Spot deleted sucsessfully.', null, {
                duration: 2000
            });
            let index = this.spots.indexOf(spot);
            this.spots.splice(index, 1);
        }
    }

    spotSave(spot: Spot): void {
        const parkingId = parseInt(this.route.snapshot.paramMap.get('id'));
        if (spot.isFree) {
            spot.parkingId = parkingId;
            this.managerSpotService.saveSpot(spot).subscribe((response: HttpResponse<any>) => {
                if (spot.id != 0) {
                    this.snackBar.open('Spot edited sucsessfully', null, {
                        duration: 2000
                    });
                } else {
                    this.snackBar.open('Spot created sucsessfully', null, {
                        duration: 2000
                    });
                }
                spot.isFree = false;
                this.ngOnInit();
            }, error => {
                this.snackBar.open(error.error, null, {
                    duration: 2000
                });
            });
        }
    }

    findSpots(search: string): void {
        var criterias;
        if (!this.category.value)
            criterias = new SpotSearchCriterias(search, true, false, false, false);
        if (this.category.value == 1)
            criterias = new SpotSearchCriterias(search, true, false, false, false);
        if (this.category.value == 2)
            criterias = new SpotSearchCriterias(search, false, true, false, false);
        if (this.category.value == 3)
            criterias = new SpotSearchCriterias(search, false, false, true, false);
        if (this.category.value == 4)
            criterias = new SpotSearchCriterias(search, false, false, false, true);
        const parkingId = parseInt(this.route.snapshot.paramMap.get('id'));
        this.managerSpotService.findSpots(parkingId, criterias)
            .subscribe(spots => {
                this.spots = spots.body;
            }, error => {
                this.router.navigate(['error/forbidden']);
            });
    }
}

export class SpotSearchCriterias {
    public readonly search: string;
    public readonly all: boolean;
    public readonly hasCharger: boolean;
    public readonly isInvalid: boolean;
    public readonly isBlocked: boolean;

    constructor(search: string, all: boolean, hasCharger: boolean, isInvalid: boolean, isBlocked: boolean) {
        this.search = '';
        this.search = search;
        this.all = all;
        this.hasCharger = hasCharger;
        this.isInvalid = isInvalid;
        this.isBlocked = isBlocked;
    }
}
