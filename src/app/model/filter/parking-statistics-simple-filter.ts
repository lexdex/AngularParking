export class ParkingStatisticsSimpleFilter {
    latitude: string;
    longitude: string;
    radius: string;
    days: string;

    constructor(latitude: number, longitude: number, radius: number, days: number) {
        this.latitude = latitude.toString();
        this.longitude = longitude.toString();
        this.radius = radius.toString();
        this.days = days.toString();
    }
}