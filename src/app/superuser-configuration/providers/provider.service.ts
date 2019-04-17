import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Provider} from '../../model/view/provider';
import {Observable} from 'rxjs/Observable';
import {ProviderRequest} from './add-provider/provider-request';
import {ProviderListFilterParameters} from '../../model/filter/provider-list-filter-parameters';
import {environment} from '../../../environments/environment';

@Injectable()
export class ProviderService {

    private providerUrl = environment.apiUrl + '/providers';

    constructor(private http: HttpClient) {
    }

    getAllByFilter(providerFilter: ProviderListFilterParameters): Observable<Provider[]> {
        let params;
        if ((providerFilter.companyName && providerFilter.active) != undefined) {
            params = {
                providerFilter: JSON.stringify(providerFilter)
            };
        } else {
            providerFilter.active = '';
            providerFilter.companyName = '';
            params = {
                providerFilter: JSON.stringify(providerFilter)
            };
        }


        return this.http.get<Provider[]>(this.providerUrl, {params: JSON.parse(params.providerFilter)});
    }

    getDetail(id: number): Observable<Provider> {
        return this.http.get<Provider>(this.providerUrl + '/' + id).map(json => {
            return Provider.copyOf(json);
        });
    }

    save(providerRequest: ProviderRequest) {
        return this.http.post(this.providerUrl + '/save', providerRequest);
    }

}
