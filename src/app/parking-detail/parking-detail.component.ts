import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {MatDialog, MatSnackBar} from '@angular/material';
import {HttpResponse} from '@angular/common/http';
import {TokenStorage} from '../auth/token/token-storage';

import {Parking} from '../model/view/parking';
import {ParkingService} from "../parking.service";
import {Spot} from '../model/view/spot';
import {Observable} from 'rxjs/Observable';
import {
    FavoriteAddData,
    FavoritesAddConfigmDialogComponent
} from './favorites-add-configm-dialog/favorites-add-configm-dialog.component';
import {Favorite} from '../model/view/favorite';
import {DeleteConfirmationDialogComponent} from '../manager/manager-parking-list/delete-confirmation-dialog/delete-confirmation-dialog.component';
import {Role} from "../auth/roles";

@Component({
  selector: 'app-parking-detail',
  templateUrl: './parking-detail.component.html',
  styleUrls: ['./parking-detail.component.css']
})
export class ParkingDetailComponent implements OnInit, OnDestroy {

  parking: Parking;
  favorite: Favorite;
  spots: Spot[];
  freeSpots: Spot[];
  type: String;
  fullnessBarMessage: String;
  max: number;
  value: number;
  fiveSecInterval: number = 5000;
  setIntervalNumber: any;


  constructor(
    private route: ActivatedRoute,
    private parkingService: ParkingService,
    private location: Location,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private tokenStorage: TokenStorage,
  ) { }

  ngOnInit() {
    this.getParking().subscribe(parking => {
      this.fullnessBarCount();
    });
    this.getSpots();
    this.getAvailableSpots();
    this.setIntervalNumber = setInterval(() => this.refresh(), this.fiveSecInterval);
  }

  ngOnDestroy(): void {
    clearInterval(this.setIntervalNumber);
  }

  refresh(): void {
    this.getParking().subscribe(parking => {
      this.fullnessBarCount();
    });
    this.getSpots();
    this.getAvailableSpots();
  }

  fullnessBarCount(): void {
    this.max = this.parking.spotsCount;
    this.value = this.parking.spotsCount - this.parking.availableSpotsCount;
    if (this.value < (this.max * 0.6)) {
      this.type = 'success';
      this.fullnessBarMessage = 'Welcome!';
    } else if (this.value < (this.max * 0.75)) {
      this.type = 'info';
      this.fullnessBarMessage = 'You have a chance!';
    } else if (this.value < (this.max * 0.99)) {
      this.type = 'warning';
      this.fullnessBarMessage = 'Hurry up!';
    } else {
      this.type = 'danger';
      this.fullnessBarMessage = 'Sorry, all spots are busy!';
    }
  }

  getParking(): Observable<Parking> {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    let o = this.parkingService.getParking(id);
    o.subscribe(parking => this.parking = parking);
    return o;
  }

  getSpots(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.parkingService.getSpotsByParkingId(id)
      .subscribe(spots => this.spots = spots);
  }

  getAvailableSpots(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.parkingService.getAvailableSpotsByParkingId(id)
      .subscribe(spots => this.freeSpots = spots);
  }

  onParkingAddToFavoritesClick(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));

    let dialogRef = this.dialog.open(FavoritesAddConfigmDialogComponent, {
      data: new FavoriteAddData()
    });

    dialogRef.afterClosed().subscribe((data: FavoriteAddData) => {
      if (data.confirmed) {
        this.favorite = new Favorite();
        if (data.name.length != 0) {
          this.favorite.name = data.name;
        } else {
          this.favorite.name = this.parking.address;
        }
        this.parkingService.saveToFavorite(id, this.favorite).subscribe((response: HttpResponse<any>) => {
          this.snackBar.open('Parking add to favorite sucsessfully.', null, {
            duration: 2000
          });
        });
      }
    });

  }
  onParkingDeleteClick(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    let dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: { confirmed: false }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data.confirmed) {
        this.parkingService.deleteFromFavorite(id).subscribe((response: HttpResponse<any>) => {
          this.snackBar.open('Parking delete from favorite sucsessfully.', null, {
            duration: 2000
          });
        });
      }
    });
  }


  getRole(): Role {
    return this.tokenStorage.getRole();
  }

  hasToken(): boolean {
    return this.tokenStorage.hasToken();
  }

  logOut() {
    this.tokenStorage.signOut();
  }

  sendToSpotStatistic() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.router.navigate(['parkingdetail/' + id + '/spotstatistic']);
  }

}
