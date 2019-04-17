import {Component, OnInit, ViewChild} from '@angular/core';
import {Parking} from '../../model/view/parking';
import {ParkingService} from '../../parking.service';
import {MatSnackBar} from '@angular/material';
import {DataserviceService} from '../dataservice.service';
import {StatisticsService} from '../../statistic/statistics.service';
import {SharedServiceService} from '../shared-service.service';
import {DistanceService} from '../distance.service';
import {InfoWindow} from '@agm/core/services/google-maps-types';
import {ParkingStatisticsSimpleFilter} from '../../model/filter/parking-statistics-simple-filter';


const numberOfDaysByDefault = 30;

@Component({
    selector: 'app-parking-map',
    templateUrl: './parking-map.component.html',
    styleUrls: ['./parking-map.component.css']
})

export class ParkingMapComponent implements OnInit {
    lat = 49.843977;
    lng = 24.026318;
    parkings: Parking[] = [];
    bestParkings: Parking[] = [];
    dir = undefined;
    distance: string;
    radius: number;
    visibility: boolean;
    infoWindowOpened = null;
    zoom = 10;

    constructor(private parkingService: ParkingService,
                private dataService: DataserviceService,
                private statisticService: StatisticsService,
                private snackBar: MatSnackBar,
                private sharedService: SharedServiceService,
                private distanceService: DistanceService) {
    }

    ngOnInit() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                if ((localStorage.getItem('locationLatitude') && localStorage.getItem('locationLongtitude') != null)) {
                    this.lat = +localStorage.getItem('locationLatitude');
                    this.lng = +localStorage.getItem('locationLongtitude');
                } else {
                    this.lat = position.coords.latitude;
                    this.lng = position.coords.longitude;
                }
                if (localStorage.getItem('radius') != undefined) {
                    this.radius = +localStorage.getItem('radius') * 1000;
                } else {
                    this.radius = 5000;
                }
                this.parkingService.getParkingsNearby(this.lat, this.lng, this.radius).subscribe((response) => {
                    this.parkings = response.body;
                    this.distanceService.getDistanceBetweenPoint(this.parkings, this.lat, this.lng);
                    this.dataService.pushParkingsToDataService(this.parkings);
                }, error => {
                    console.log(error);
                });
                setTimeout(() => this.findBestParkingsByLocation(
                    this.lat,
                    this.lng,
                    this.radius,
                    numberOfDaysByDefault), 2000);
            });

            this.sharedService.myMethod$.subscribe(id => {
                for (let parking of this.parkings) {
                    if (parking.id == id) {
                        if (this.infoWindowOpened)
                            this.infoWindowOpened.close();
                        parking.infoWindowOpen = true;
                        this.zoom = 12;
                        parking.markerColor = '/assets/images/icon_parking_info_40x38_green.png';
                    } else {
                        parking.markerColor = '/assets/images/icon_parking_info_40x38.png';
                        parking.infoWindowOpen = false;
                    }

                }
            });
        }
    }

    getDirection(lat, lng) {
        this.visibility = true;
        this.dir = {
            origin: {lat: this.lat, lng: this.lng},
            destination: {lat: lat, lng: lng},
            drivingOptions: {
                departureTime: new Date(Date.now()),
                trafficModel: 'pessimistic'
            },
            travelMode: 'DRIVING'
        };
    }

    clearDirection() {
        this.visibility = false;
    }

    showInfoWindow(id) {
        for (let parking of this.parkings) {
            if (parking.id === id) {
                parking.infoWindowOpen = true;
                parking.markerColor = '/assets/images/icon_parking_info_40x38_green.png';
                this.zoom = 12;
            } else {
                parking.infoWindowOpen = false;
                parking.markerColor = '/assets/images/icon_parking_info_40x38.png';
            }
        }

    }

    checkingForParkingAvailability(numberOfParkings: number, radius: number) {
        if (numberOfParkings < 1) {
            this.snackBar.open('Unfortunately, there are no parkings in radius of ' + radius / 1000 + ' km', null, {
                duration: 3000
            });
        } else {
            this.snackBar.open('The most popular parking in radius ' + radius / 1000 + ' km is on ' + this.bestParkings[0].street + ' ' +
                this.bestParkings[0].building, null, {
                duration: 3000
            });
        }
    }

    findBestParkingsByLocation(latitude: number, longitude: number, radius: number, days: number) {
        this.statisticService.getBestParkingsByLocation(new ParkingStatisticsSimpleFilter(latitude, longitude, radius, days))
            .subscribe(bestParkiings => {
                this.bestParkings = bestParkiings;
                this.dataService.pushBestParkingsToDataService(this.bestParkings);
                this.checkingForParkingAvailability(this.bestParkings.length, radius);
            });
    }

}
