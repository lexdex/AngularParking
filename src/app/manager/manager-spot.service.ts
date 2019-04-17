import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Spot} from '../model/view/spot';
import {SpotSearchCriterias} from './manager-spot-list/manager-spot-list.component';

@Injectable()
export class ManagerSpotService {
    private spotConfigureUrl = environment.apiUrl + '/manager-configuration';

    constructor(private http: HttpClient) {
    }


    getSpots(parkingId: number): Observable<HttpResponse<Spot[] | any>> {
        return this.http.get<HttpResponse<Spot[] | any>>(
            this.spotConfigureUrl + '/spotsforparking/' + parkingId, {observe: 'response'});
    }

    saveSpot(spot: Spot): Observable<HttpResponse<any>> {
        return this.http.post<HttpResponse<any>>(
            this.spotConfigureUrl + '/spot/save', spot, {observe: 'response'});
    }

    deleteSpot(spot: Spot): Observable<HttpResponse<any>> {
        return this.http.post<HttpResponse<any>>(
            this.spotConfigureUrl + '/spot/delete', spot, {observe: 'response'});
    }

    findSpots(parkingId: number, criterias: SpotSearchCriterias): Observable<HttpResponse<Spot[] | any>> {
        return this.http.post<HttpResponse<Spot[] | any>>(
            this.spotConfigureUrl + '/spotsforparking/' + parkingId + '/criterias', criterias, {observe: 'response'});
    }

}
