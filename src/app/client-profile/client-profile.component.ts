import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {ClientService} from "../clients/client.service";
import {Client} from "../model/view/client";
import {Provider} from "../model/view/provider";
import {Parking} from "../model/view/parking";
import {MatDialog, MatSnackBar} from '@angular/material';
import {HttpResponse} from '@angular/common/http';
import {DeleteConfirmationDialogComponent} from "../manager/manager-parking-list/delete-confirmation-dialog/delete-confirmation-dialog.component";
import {ParkingService} from "../parking.service";

@Component({
    selector: 'app-client-profile',
    templateUrl: './client-profile.component.html',
    styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {

    client: Client;
    provider: Provider;
    favoritesParkings: Parking[] = [];
    showProviderDetails: boolean = false;


    constructor(private route: ActivatedRoute,
                private clientService: ClientService,
                private router: Router,
                private snackBar: MatSnackBar,
                private parkingService: ParkingService,
                private dialog: MatDialog) {
    }


    ngOnInit() {
        this.getClientProfile();
        this.getFavoriteParkings();
    }

    getClientProfile(): void {
        this.clientService.getClientProfile()
            .subscribe(client => this.client = client);
    }

    getFavoriteParkings(): void {
        this.clientService.getFavoritesParkingsForClient()
            .subscribe(parkings => this.favoritesParkings = parkings);
    }

    goToProfileEdit() {
        this.router.navigate(['profile/edit']);
    }

    onParkingDeleteClick(parking: Parking) {
        let dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
            data: {confirmed: false}
        });

        dialogRef.afterClosed().subscribe(data => {
            if (data.confirmed) {
                this.parkingService.deleteFromFavorite(parking.id).subscribe(response => this.onDeleteResponse(parking, response));
            }
            // this.getFavoriteParkings();
        });
    }

    private onDeleteResponse(parking: Parking, response: HttpResponse<any>): void {
        this.snackBar.open('Parking deleted from favorites.', null, {
            duration: 2000
        });
        let index = this.favoritesParkings.indexOf(parking);
        this.favoritesParkings.splice(index, 1);
    }
}
