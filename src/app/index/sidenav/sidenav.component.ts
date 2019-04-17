import {Component, OnInit} from '@angular/core';
import {Parking} from '../../model/view/parking';
import {StatisticsService} from '../../statistic/statistics.service';
import {DataserviceService} from '../dataservice.service';
import {SharedServiceService} from '../shared-service.service';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

    parkings: Parking[];
    mostPopularParkings: Parking[];
    public streetFilter = '';

    showMostPopular: boolean = false;

    constructor(private statisticService: StatisticsService,
                private dataService: DataserviceService,
                private sharedService: SharedServiceService) {
    }

    ngOnInit() {
        this.dataService.currentParkings.subscribe(parkings => this.parkings = parkings);
    }

    showMostPopularParkings() {
        this.showMostPopular = true;
        this.dataService.currentBestParkings.subscribe(parkings => this.mostPopularParkings = parkings);
    }

    showAllParkings() {
        this.showMostPopular = false;
        this.dataService.currentParkings.subscribe(parkings => this.parkings = parkings);
    }

    highlightOnMap(id) {
        this.sharedService.highLightOnMap(id);
    }
    
}
