import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {ParkingService} from "../../parking.service";
import {SpotStatistic} from '../../model/view/spotstatistic';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpErrorResponse, HttpResponse, HttpParams} from '@angular/common/http';
import {Chart} from 'chart.js';


@Component({
    selector: 'app-spotstatistic',
    templateUrl: './spotstatistic.component.html',
    styleUrls: ['./spotstatistic.component.css']
})
export class SpotstatisticComponent implements OnInit {


    statistic: SpotStatistic[];

    id: number;
    thirtySecInterval: number = 30000;
    favoriteNameInputHide: boolean = true;
    minDate: Date;
    maxDate: Date;
    startTime: Date;
    endTime: Date;
    tempDate: Date;
    start_date: string;
    end_date: string;
    hoursChart = [];
    eventsChart = [];
    numbers: number[];
    hours: number[];
    events: number[];
    setIntervalNumber: any;
     show :boolean;
     context:string;
     error: boolean;
    
    


    constructor(private route: ActivatedRoute,
                private router: Router,
                private parkingService: ParkingService,) {
        this.minDate = new Date();
        this.minDate.setDate(this.minDate.getDate() - 7);
        this.maxDate = new Date();
        this.id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.show = true;
        this.error = false;
        this.getSpotStatistic();
      
        
  
    }




    ngOnInit() {


        
        this.fillArraysToGraphic();
        setInterval(this.refresh(), this.thirtySecInterval);
        this.setIntervalNumber = setInterval(() => this.refresh(), this.thirtySecInterval);
       

    }

    refresh(): void {
    
    }


   


    setError() : void {
        this.error = true;
         console.log("there is some error happened");
    }


    fillArraysToGraphic(): void {
        this.numbers = []
        if(this.statistic != undefined)
        {
        this.statistic.forEach((element) => {
            this.numbers.push(element.id);
        });
        this.hours = []
        
        this.statistic.forEach((element) => {
            this.hours.push(element.numberOfHours);
        });
        this.hours.push(0);
        this.events = []
        this.statistic.forEach((element) => {
            this.events.push(element.numberOfEvents);
        });
        this.events.push(0);
    }
        


    }

    drawHourGraphic(): void {
        var densityData = {
            label: 'Spots',
            data: this.hours
        };


        this.hoursChart = new Chart('canvas', {
            type: 'bar',
            data: {
                labels: this.numbers,
                datasets: [densityData]
            },
            options: {
                legend: {
                    display: true
                },
                title: {
                    display: true,
                    text: 'How many hours spots of this parking have been taken'
                },
                scales: {
                    xAxes: [{
                        display: true
                    }],
                    yAxes: [{
                        display: true
                    }],
                }
            }
        });

        this.numbers = null;
        this.hours = null;
        this.events = null;
       
    }


    drawEventGraphic(): void {

        var densityData = {
            label: 'Spots',
            data: this.events
        };


        this.eventsChart = new Chart('canvas', {
            type: 'bar',
            data: {
                labels: this.numbers,
                datasets: [densityData]
            },
            options: {
                legend: {
                    display: true,
                    text: 'Whi'
                },
                title: {
                    display: true,
                    text: 'Which spots are most popular'
                },
                scales: {
                    xAxes: [{
                        display: true
                    }],
                    yAxes: [{
                        display: true
                    }],
                }
            }
        });

        this.numbers = null;
        this.hours = null;
        this.events = null;
       
    }

    getSpotStatistic(): void {
        this.setData();
        this.startTime = new Date(this.route.snapshot.queryParams["start_year"],
        this.route.snapshot.queryParams["start_month"],
        this.route.snapshot.queryParams["start_day"],0,0,0);
        this.endTime = new Date(this.route.snapshot.queryParams["end_year"],
        this.route.snapshot.queryParams["end_month"],
        this.route.snapshot.queryParams["end_day"],23,59,59);
                  this.parkingService.getSpotStatistic(this.id,
            this.startTime.getTime().toString(), this.endTime.getTime().toString())
            .subscribe(statistic => this.statistic = statistic);
                
    }


    addItem() {
        this.show = true;
              this.getSpotStatistic();
         // this.statistic.length
    }



    showHoursGraphic() {
        this.show = true;
        this.fillArraysToGraphic();
        this.drawHourGraphic();
    }


    showEventsGraphic() {
        this.show = true;
        this.fillArraysToGraphic();
        this.drawEventGraphic();
      }

    returnToParkingDetail() {
        const id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.router.navigate(['parkingdetail/' + id]);
    }

setData(): void
{
     
    this.router.navigate(['parkingdetail/' + this.id + '/spotstatistic'],
    {
        queryParams: {
            start_day: this.minDate.getDate(),
            start_month: this.minDate.getMonth(),
            start_year: this.minDate.getFullYear(),
            end_day: this.maxDate.getDate(),
            end_month: this.maxDate.getMonth(),
            end_year: this.maxDate.getFullYear()
        }
    }
);

}

checkData(): void {
    if (this.minDate > this.maxDate) {
        this.tempDate = this.minDate;
        this.minDate = this.maxDate;
        this.maxDate = this.tempDate;
    }
    if (this.maxDate < this.minDate) {
        this.tempDate = this.minDate;
        this.minDate = this.maxDate;
        this.maxDate = this.tempDate;
    }
    
    }

    setMinData(): void {
     this.show = true;
      this.setData();
      this.checkData();
    
    }

    setMaxData(): void {
        this.show = true; 
        this.setData();
        this.checkData();
    }

   

    clear(): void {
        this.show = false;          
       
    }


    setTrue():void {
        this.setMaxData();
    }


    
       


}
