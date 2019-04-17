import {Injectable} from '@angular/core';
import {Parking} from '../model/view/parking';
import {Observable} from 'rxjs/Observable';

const MiToKm = 1.60934;

@Injectable()
export class DistanceService {

    obs: Observable<Parking[]>;

    constructor() {
    }

    getDistanceBetweenPoint(parkings: Parking[], lat, lng) {
        for (let parking of parkings) {
            var distance = require('google-distance-matrix');
            parking.markerColor = '/assets/images/icon_parking_info_40x38.png';
            var latLngOrigin = lat + ',' + lng;
            var lanLngDest = parking.latitude + ',' + parking.longitude;
            var origins = [latLngOrigin];
            var destinations = [lanLngDest];

            distance.key('AIzaSyAufS5bcmpO5UiWxG_MpcSOrIiRNzbUJus');
            distance.units('imperial');

            distance.matrix(origins, destinations, function (err, distances) {
                if (err) {
                    return console.log(err);
                }
                if (!distances) {
                    return console.log('no distances');
                }
                if (distances.status == 'OK') {
                    for (var i = 0; i < origins.length; i++) {
                        for (var j = 0; j < destinations.length; j++) {
                            var origin = distances.origin_addresses[i];
                            var destination = distances.destination_addresses[j];
                            if (distances.rows[0].elements[j].status == 'OK') {
                                let distance = distances.rows[i].elements[j].distance.text;
                                distance = distance.substr(0, distance.indexOf(' '));
                                Number.parseInt(distance);
                                distance *= MiToKm;
                                parking.distance = Math.floor(distance * 10) / 10;
                            } else {
                                console.log(destination + ' is not reachable by land from ' + origin);
                            }
                        }
                    }
                }
            });
        }
    }

}
