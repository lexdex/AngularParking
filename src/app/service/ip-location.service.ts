import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class IpLocationService {

    constructor(private http: HttpClient) {
    }

    public getLocation(callback: IpLocationCallback, errorCallback?: IpLocationErrorCallback): void {
        //OR http://freegeoip.net/json/
        this.http.get<any>('http://ip-api.com/json/').subscribe((result: any) => {
            if (result.status === 'success') {
                let response = <IpLocationResponse> result;
                let ipLocation = new IpLocation();
                ipLocation.address = response.city + ', ' + response.regionName + ', ' + response.country;
                ipLocation.latitude = Number(response.lat);
                ipLocation.longitude = Number(response.lon);
                callback(ipLocation);
            } else {
                errorCallback(<IpLocationErrorCallback> result);
            }
        });
    }

}

export class IpLocation {
    public address: string;
    public latitude: number;
    public longitude: number;
}

export class IpLocationResponse {
    public status: string;
    public country: string;
    public countryCode: string;
    public region: string;
    public regionName: string;
    public city: string;
    public zip: string;
    public lat: string;
    public lon: string;
    public timezone: string;
    public isp: string;
    public org: string;
    public as: string;
    public query: string;
}

export class IpLocationError {
    public message: string;
    public query: string;
    public status: string;
}

interface IpLocationCallback {
    (ipLocation: IpLocation): void;
}

interface IpLocationErrorCallback {
    (error: any): void;
}
