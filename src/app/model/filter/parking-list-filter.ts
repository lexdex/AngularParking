export class ParkingListFilter1 {

    public readonly latitude: number;
    public readonly longitude: number;
    public readonly minPrice: number;
    public readonly maxPrice: number;
    public readonly radius: number;

    public constructor(latitude: number, longitude: number, minPrice: number, maxPrice: number, radius: number) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
        this.radius = radius;
    }
}