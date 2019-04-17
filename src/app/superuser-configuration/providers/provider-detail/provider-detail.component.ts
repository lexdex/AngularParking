import {Component, OnInit} from '@angular/core';
import {ProviderService} from '../provider.service';
import {Provider} from '../../../model/view/provider';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-provider-detail',
    templateUrl: './provider-detail.component.html',
    styleUrls: ['./provider-detail.component.css']
})
export class ProviderDetailComponent implements OnInit {

    provider: Provider;

    constructor(private route: ActivatedRoute,
                private providerService: ProviderService) {
    }

    ngOnInit() {
        this.getProviderDetail();
    }

    getProviderDetail(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.providerService.getDetail(id)
            .subscribe(provider => this.provider = provider);
    }

    /*changeState(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.providerService.changeState(id)
            .subscribe(provider => this.provider = provider);
    }*/
}
