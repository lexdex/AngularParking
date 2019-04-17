import {Component, OnInit, ViewChild} from '@angular/core';
import {Location, LocationFieldComponent} from './location-field/location-field.component';
import {FormGroup} from '@angular/forms';
import {RadiusFieldComponent} from './radius-field/radius-field.component';
import {PriceRange, PriceRangeFieldComponent} from './price-range-field/price-range-field.component';
import {Subject} from 'rxjs/Subject';
import {ChargerCheckboxComponent} from './charger-checkbox/charger-checkbox.component';
import {MatSnackBar} from '@angular/material';
import {FavoriteCheckboxComponent} from './favorite-checkbox/favorite-checkbox.component';
import {TokenStorage} from '../../auth/token/token-storage';

const earthRadius = 6371;

@Component({
    selector: 'app-parking-list-filter',
    templateUrl: './parking-list-filter.component.html',
    styleUrls: ['./parking-list-filter.component.css']
})

export class ParkingListFilterComponent implements OnInit {

    @ViewChild('locationField')
    public locationField: LocationFieldComponent;

    @ViewChild('radiusField')
    public radiusField: RadiusFieldComponent;

    @ViewChild('priceRangeField')
    public priceRangeField: PriceRangeFieldComponent;

    @ViewChild('chargerField')
    public chargerField: ChargerCheckboxComponent;

    @ViewChild('favoriteField')
    public favoriteField: FavoriteCheckboxComponent;

    private readonly formGroup = new FormGroup({});

    private readonly valueChangesSubject = new Subject<ParkingListFilter>();

    private internalValue: ParkingListFilter;

    public present: Boolean;

    private distance: number;

    constructor(private snackBar: MatSnackBar) {
    }

    public get value(): ParkingListFilter {
        return this.internalValue;
    }

    ngOnInit() {
        this.locationField.valueChanges.subscribe(location => {

            for (let city of this.locationField.cityLatLng) {
                this.distance = ParkingListFilterComponent.getDistanceBetweenPoint(city.latitude, city.longitude, location.latitude, location.longitude);
                if (this.distance <= 20) {
                    this.present = true;
                    break;
                } else {
                    this.present = false;

                }
            }

            if (this.present) {
                this.internalValue = new ParkingListFilter(location, this.priceRangeField.value, this.radiusField.value,
                    this.chargerField.value, this.favoriteField.value);
                this.valueChangesSubject.next(this.internalValue);
                localStorage.setItem('locationLatitude', location.latitude.toString());
                localStorage.setItem('locationLongtitude', location.longitude.toString());
            } else {
                this.snackBar.open('Our api doesn\'t support this location, unfortunately. :('
                    , null, {
                        duration: 1000
                    });
            }
        });
        this.priceRangeField.valueChanges.subscribe(priceRange => {
            if (this.locationField.value) {
                this.internalValue = new ParkingListFilter(this.locationField.value, priceRange, this.radiusField.value,
                    this.chargerField.value, this.favoriteField.value);
                this.valueChangesSubject.next(this.internalValue);
                if (priceRange.min != undefined)
                    localStorage.setItem('minValue', priceRange.min.toString());
                if (priceRange.max != undefined)
                    localStorage.setItem('maxValue', priceRange.max.toString());
            }
        });
        this.radiusField.valueChanges.subscribe(radius => {
            if (this.locationField.value) {
                this.internalValue = new ParkingListFilter(this.locationField.value, this.priceRangeField.value, radius,
                    this.chargerField.value, this.favoriteField.value);
                this.valueChangesSubject.next(this.internalValue);
            }
            localStorage.setItem('radius', radius.toString());
        });
        this.chargerField.valueChanges.subscribe(hasCharger => {
            if (this.locationField.value) {
                this.internalValue = new ParkingListFilter(this.locationField.value, this.priceRangeField.value, this.radiusField.value,
                    hasCharger, this.favoriteField.value);
                this.valueChangesSubject.next(this.internalValue);
            }
            localStorage.setItem('hasCharger', hasCharger.toString());
        });
        this.favoriteField.valueChanges.subscribe(favorite => {
            if (this.locationField.value) {
                this.internalValue = new ParkingListFilter(this.locationField.value, this.priceRangeField.value, this.radiusField.value,
                    this.chargerField.value, favorite);
                this.valueChangesSubject.next(this.internalValue);
            }
            localStorage.setItem('favorite', favorite.toString());
        });
    }

    private static getDistanceBetweenPoint(startLat, startLong, endLat, endLong): number {
        let dLat = ParkingListFilterComponent.toRadians((endLat - startLat));
        let dLong = ParkingListFilterComponent.toRadians((endLong - startLong));

        startLat = ParkingListFilterComponent.toRadians(startLat);
        endLat = ParkingListFilterComponent.toRadians(endLat);

        let a = ParkingListFilterComponent.haversin(dLat) + Math.cos(startLat) * Math.cos(endLat) * ParkingListFilterComponent.haversin(dLong);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return earthRadius * c;
    };

    private static haversin(val) {
        return Math.pow(Math.sin(val / 2), 2);
    }

    private static toRadians(number): number {
        return number * Math.PI / 180;
    }

}

export class ParkingListFilter {

    public readonly location: Location;
    public readonly priceRange: PriceRange;
    public readonly radius: number;
    public readonly hasCharger: boolean;
    public readonly favorite: boolean;

    public constructor(location: Location, priceRange: PriceRange, radius: number, hasCharger: boolean, favorite: boolean) {
        this.location = location;
        this.priceRange = priceRange;
        this.radius = radius;
        this.hasCharger = hasCharger;
        this.favorite = favorite;
    }

}
