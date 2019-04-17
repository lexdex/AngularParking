import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {v4 as uuid} from 'uuid';
import {MatSnackBar} from '@angular/material';

import {Parking} from '../../model/view/parking';
import {ManagerParkingService} from '../manager-parking.service';
import {HttpResponse} from '@angular/common/http';
import {Provider} from "../../model/view/provider";
import {ClientService} from "../../clients/client.service";
import {Role} from "../../auth/roles";
import {TokenStorage} from "../../auth/token/token-storage";

@Component({
    selector: 'app-manager-parking-configure',
    templateUrl: './manager-parking-configure.component.html',
    styleUrls: ['./manager-parking-configure.component.css']
})
export class ManagerParkingConfigureComponent implements OnInit {
    role: any = Role;
    configureType: ConfigureType;
    step = -1;
    loadedParking: Parking;
    parking: Parking;
    providers: Provider[] = [];
  

    parkingConfigureForm = new FormGroup({
        city: new FormControl('', [
            Validators.required,
        ]),
        street: new FormControl('', [Validators.required,]),
        building: new FormControl('', [Validators.required,]),
        price: new FormControl('', [Validators.required,]),
        token: new FormControl('', [Validators.required,]),
        providerName: new FormControl('', []),
        favoritesCount: new FormControl('', []),
        spotsCount: new FormControl('', []),
        isCovered: new FormControl('', []),
        hasCharger: new FormControl('', [])
    });

    constructor(private route: ActivatedRoute,
                public snackBar: MatSnackBar,
                private router: Router,
                private clientService: ClientService,
                private managerParkingService: ManagerParkingService,
                private tokenStorage: TokenStorage) {
                    
    }

    ngOnInit() {
        if (this.getRole() === Role.Admin) {
            this.getProviders();
            this.parkingConfigureForm.addControl('provider', new FormControl('', [Validators.required,]));
        }
        if (this.route.snapshot.paramMap.get('configureType') === 'edit') {
            this.configureType = new ConfigureType('edit', ManagerParkingConfigureType.EDIT);
            this.loadParking();
        } else {
            this.configureType = new ConfigureType('add', ManagerParkingConfigureType.ADD);
            this.loadedParking = new Parking();
            this.parking = new Parking();
            this.parking.isCovered = false;
            this.parking.hasCharger = false;
        }
    }

    loadParking(): void {
        const id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.managerParkingService.getParking(id)
            .subscribe(parking => {
                this.loadedParking = parking;
                this.parking = parking.clone();
            });
    }

    saveParking(): void {
        this.parking.hasInvalid = true;
            this.managerParkingService.saveParking(this.parking)
                .subscribe((response: HttpResponse<any>) => {
                if (this.configureType.type === ManagerParkingConfigureType.ADD) {
                    this.snackBar.open('Parking created sucsessfully.', null, {
                        duration: 2000
                    });
                } else {
                    this.snackBar.open('Parking updated sucsessfully.', null, {
                        duration: 2000
                    });
                }
                    this.router.navigate(['manager-configuration/parkings']);
            }, error => {
                this.snackBar.open('Cannot save parking. You have enter invalid adddress or dublicate of token. Please check your data.'
                 , null, {
                    duration: 2000
                });
            });
    }

    getProviders(): void {
        this.clientService.getProviders()
            .subscribe(providers => this.providers = providers);
    }

    getRole(): Role {
        return this.tokenStorage.getRole();
    }

    setStep(index: number): void {
        this.step = index;
    }

    nextStep(): void {
        this.step++;
    }

    prevStep(): void {
        this.step--;
    }

    showOnMap(): void {
        window.open(`https://www.google.com/maps/search/?api=1&query=
                    ${this.parking.latitude},${this.parking.longitude}`);
    }

    generateToken() {
        this.parking.token = uuid();
    }

    resetAddress() {
        this.parking.city = this.loadedParking.city;
        this.parking.street = this.loadedParking.street;
        this.parking.building = this.loadedParking.building;
    }

    resetLocation() {
        this.parking.latitude = this.loadedParking.latitude;
        this.parking.longitude = this.loadedParking.longitude;
    }

    resetPrice() {
        this.parking.price = this.loadedParking.price;
    }

    resetToken() {
        this.parking.token = this.loadedParking.token;
    }

    resetType() {
        this.parking.isCovered = this.loadedParking.isCovered;
        this.parking.hasCharger = this.loadedParking.hasCharger;
    }

    resetProvider() {
        this.parking.providerId = this.loadedParking.providerId;
    }


    setParkingLocation(): void {
        var geocoder = new google.maps.Geocoder();
        var address = "" + this.parking.building + " " + this.parking.street + " " + this.parking.city;
        var result = "";
        geocoder.geocode({'address': address}, (results, status) => {
            if (results != undefined) {
                var latitude = results[0].geometry.location.lat();
                var longitude = results[0].geometry.location.lng();
                this.parking.latitude = latitude;
                this.parking.longitude = longitude;
            }
        });
            
}








}

export enum ManagerParkingConfigureType {
    EDIT, ADD
}

class ConfigureType {
    constructor(public text: string, public type: ManagerParkingConfigureType) {
    }
}







