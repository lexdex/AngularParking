import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {RegistrationData} from "./registration/registration-data";
import {Observable} from "rxjs/Observable";
import {LoginData} from "./login/login-data";
import {SocialPrincipal} from "./login/social-principal";

@Injectable()
export class CustomAuthService {

    private loginUrl = environment.apiUrl + '/auth/generate-token';
    private registrationUrl = environment.apiUrl + '/auth/signup';
    private socialUrl = environment.apiUrl + '/auth/social';

    constructor(private http: HttpClient) {
    }

    signIn(loginData: LoginData): Observable<any> {
        return this.http.post(this.loginUrl, loginData);
    }

    register(registrationData: RegistrationData): Observable<any> {
        return this.http.post(this.registrationUrl, registrationData);
    }

    signInWithSocial(data: SocialPrincipal): Observable<any> {
        return this.http.post(this.socialUrl, data);
    }
}
