export class ParkingStatisticsFilter {
    latitude: string;
    longitude: string;
    radius: string;
    days: string;
    minPrice: string;
    maxPrice: string;
    hasCharger: string;
    hasInvalid: string;
    isCovered: string;

    constructor(latitude: number, longitude: number, radius: number, days: number, minPrice: number, maxPrice: number, hasCharger: boolean, hasInvalid: boolean, isCovered: boolean) {
        this.latitude = latitude.toString();
        this.longitude = longitude.toString();
        this.radius = radius.toString();
        this.days = days.toString();
        this.minPrice = minPrice.toString();
        this.maxPrice = maxPrice.toString();
        this.hasCharger = hasCharger.toString();
        this.hasInvalid = hasInvalid.toString();
        this.isCovered = isCovered.toString();
    }


}