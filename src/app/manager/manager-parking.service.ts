import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {environment} from '../../environments/environment';
import {Parking} from '../model/view/parking';
import {ParkingSerchCriterias} from "./manager-parking-list/manager-parking-list.component";

@Injectable()
export class ManagerParkingService {

    private parkingConfigureUrl = environment.apiUrl + '/manager-configuration';

    constructor(private http: HttpClient) {
    }

    getParking(id: number): Observable<Parking> {
        return this.http.get<Parking>(this.parkingConfigureUrl + '/parking/' + id).map(json => {
            return Parking.copyOf(json);
        });
    }

    getParkings(): Observable<HttpResponse<Parking[] | any>> {
        return this.http.get<HttpResponse<Parking[] | any>>(
            this.parkingConfigureUrl + '/parkings', {observe: 'response'});
    }

    saveParking(parking: Parking): Observable<HttpResponse<any>> {
        return this.http.post<HttpResponse<any>>(
            this.parkingConfigureUrl + '/parking/save', parking, {observe: 'response'});
    }

    deleteParking(parking: Parking): Observable<HttpResponse<any>> {
        return this.http.post<HttpResponse<any>>(
            this.parkingConfigureUrl + '/parking/delete', parking, {observe: 'response'});
    }

    findParkings(criterias: ParkingSerchCriterias): Observable<HttpResponse<Parking[] | any>> {
        return this.http.post<HttpResponse<Parking[] | any>>(
            this.parkingConfigureUrl + '/parkings/criterias', criterias, {observe: 'response'});
    }
}
