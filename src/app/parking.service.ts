import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpResponse} from '@angular/common/http';

import {Parking} from './model/view/parking';
import {Spot} from './model/view/spot';
import {environment} from '../environments/environment';
import {Favorite} from './model/view/favorite';
import {SpotStatistic} from './model/view/spotstatistic';


@Injectable()
export class ParkingService {

    private parkingUrl = environment.apiUrl;
    private parkingNearbyUrl = environment.apiUrl + '/parkings-nearby/';
    private parkingDetailUrl = environment.apiUrl + '/parkingdetail/';


    constructor(private http: HttpClient) {
    }

    getDistinctParkingCities(): Observable<String[]> {
        return this.http.get<String[]>(this.parkingUrl + '/unique-cities');
    }

    getParkingsNearby(latitude: number, longitude: number, radius: number): Observable<HttpResponse<Parking[]>> {
        return this.http.get<Parking[]>(this.parkingNearbyUrl, {
            params: {
                latitude: latitude.toString(),
                longitude: longitude.toString(),
                radius: radius.toString(),
            },
            observe: 'response'
        });
    }

    getParking(id: number): Observable<Parking> {
        return this.http.get<Parking>(this.parkingDetailUrl + id);
    }

    getSpotsByParkingId(id: number): Observable<Spot[]> {
        return this.http.get<Spot[]>(this.parkingDetailUrl + id + '/spots');
    }

    getAvailableSpotsByParkingId(id: number): Observable<Spot[]> {
        return this.http.get<Spot[]>(this.parkingDetailUrl + id + '/freespots');
    }


    saveToFavorite(id: number, favorite: Favorite): Observable<HttpResponse<any>> {
        return this.http.post<HttpResponse<any>>(
            this.parkingDetailUrl + id + '/savetofavorites', favorite, {observe: 'response'});
    }

    deleteFromFavorite(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<HttpResponse<any>>(
            this.parkingDetailUrl + id + '/deletefromfavorites', {observe: 'response'}
        );
    }

    getSpotStatistic(id: number, start_time: string, end_time: string): Observable<SpotStatistic[]> {

        return this.http.get<SpotStatistic[]>(this.parkingDetailUrl + id + '/spotstatistic',
            {
                params: {
                    start_time: start_time,
                    end_time: end_time
                }
            });
    }


}
