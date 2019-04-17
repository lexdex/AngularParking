import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {Parking} from "../model/view/parking";
import {ParkingStatisticsFilter} from "../model/filter/parking-statistics-filter";
import {ParkingStatisticsSimpleFilter} from "../model/filter/parking-statistics-simple-filter";

@Injectable()
export class StatisticsService {

    private statisticUrl = environment.apiUrl + '/statistic';

    constructor(private http: HttpClient) {
    }

    getParkingsStreetsByAnyMatching(city: string, street: string): Observable<string[]> {
        return this.http.get<string[]>(this.statisticUrl + '/parkings-streets', {
            params: {
                city: city,
                street: street
            }
        });
    }

    getParkingsCitiesByAnyMatching(input: string): Observable<string[]> {
        return this.http.get<string[]>(this.statisticUrl + '/parkings-cities/' + input);
    }

    getAllParkingsCities(): Observable<string[]> {
        return this.http.get<string[]>(this.statisticUrl + '/all-parkings-cities');
    }

    getBestParkingsByCityStreetDate(city: string, street: string, days: number): Observable<Parking[]> {
        return this.http.get<Parking[]>(this.statisticUrl + '/best-parkings', {
            params: {
                city: city,
                street: street,
                days: days.toString()
            }
        });
    }

    getBestParkingsInTheCityByDate(city: string, days: number): Observable<Parking[]> {
        return this.http.get<Parking[]>(this.statisticUrl + '/best-parkings-in-city', {
            params: {
                city: city,
                days: days.toString()
            }
        });
    }

    getBestParkingsByLocation(parkingSimpleStatisticSimpleFilter: ParkingStatisticsSimpleFilter): Observable<Parking[]> {
        let params = {
            parkingSimpleStatisticFilter: JSON.stringify(parkingSimpleStatisticSimpleFilter)
        };

        return this.http.get<Parking[]>(this.statisticUrl + '/best-parkings-by-location', {params: JSON.parse(params.parkingSimpleStatisticFilter)});
    }

    getBestParkingsByLocationPriceAndFunctional(parkingStatisticFilter: ParkingStatisticsFilter): Observable<Parking[]> {
        let params = {
            parkingStatisticFilter: JSON.stringify(parkingStatisticFilter)
        };

        return this.http.get<Parking[]>(this.statisticUrl + '/best-parkings-by-location-and-properties', {params: JSON.parse(params.parkingStatisticFilter)});
    }

}
