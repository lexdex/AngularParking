import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Client} from '../model/view/client';
import {Role} from './role';
import {ROLES} from './mock-roles';
import {Provider} from '../model/view/provider';
import {environment} from '../../environments/environment';
import {PasswordData} from "../client-profile/client-profile-edit-password/password-data";
import {Parking} from "../model/view/parking";

@Injectable()
export class ClientService {

    private clientsUrl = environment.apiUrl + '/clients';
    private clientProfile = environment.apiUrl + '/profile';
    private clientActivateUrl = environment.apiUrl + '/auth';

    constructor(private http: HttpClient) {
    }

    getAllClients(): Observable<Client[]> {
        return this.http.get<Client[]>(this.clientsUrl);
    }

    getLimitNumberOfClients(): Observable<Client[]> {
        return this.http.get<Client[]>(this.clientsUrl + '/clients-limit');
    }

    getClientsByAnyMatch(input: string): Observable<Client[]> {
        return this.http.get<Client[]>(this.clientsUrl + '/find-clients/' + input);
    }

    getClientsByRole(input: string): Observable<Client[]> {
        return this.http.get<Client[]>(this.clientsUrl + '/find-by-role/' + input);
    }

    getClientDetail(id: number): Observable<Client> {
        return this.http.get<Client>(this.clientsUrl + '/' + id);
    }

    updateClient(id: number, client: Client) {
        return this.http.post(this.clientsUrl + '/update/' + id, client);
    }

    getProviders(): Observable<Provider[]> {
        return this.http.get<Provider[]>(this.clientsUrl + '/get-providers');
    }

    getProviderByClientId(id: number): Observable<Provider> {
        return this.http.get<Provider>(this.clientsUrl + '/find-provider/' + id);
    }

    getRoles(): Role[] {
        return ROLES;
    }

    getClientProfile(): Observable<Client> {
        return this.http.get<Client>(this.clientProfile);
    }

    updateClientProfile(id: number, client: Client) {
        return this.http.post(this.clientProfile + '/update/' + id, client);
    }

    updateClientPassword(uuid: string): Observable<any> {
        return this.http.post(this.clientProfile + '/update/password', uuid);
    }

    sendConfirmation(data: PasswordData): Observable<any> {
        return this.http.post(this.clientProfile + '/update/password/confirm', data);
    }

    sendForgetPasswordConfirmation(data: PasswordData): Observable<any> {
        return this.http.post(this.clientProfile + '/forget/password/confirm', data);
    }

    activateUser(uuid: string): Observable<any> {
        return this.http.post(this.clientActivateUrl + '/activate', uuid);
    }

    getFavoritesParkingsForClient(): Observable<Parking[]> {
        return this.http.get<Parking[]>(this.clientProfile + '/favorites');
    }

    getClientsFavoritesParkingsById(id: number): Observable<Parking[]> {
        return this.http.get<Parking[]>(this.clientsUrl + '/clients-favorites/' + id);
    }

}
