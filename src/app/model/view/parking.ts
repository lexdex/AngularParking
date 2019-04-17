export class Parking {
    id: number;
    city: string;
    street: string;
    building: string;
    address: string;
    latitude: number;
    longitude: number;
    token: string;
    price: number;
    providerId: number;
    providerName: string;
    favoritesCount: number;
    spotsCount: number;
    availableSpotsCount: number;
    distance: number;
    isFavorite: Boolean;
    favoriteName: string;
    infoWindowOpen: boolean;
    hasCharger: boolean;
    hasInvalid: boolean;
    isCovered: boolean;
    markerColor: string;

    public static copyOf(parking: Parking): Parking {
        return Object.assign(new Parking(), parking);
    }

    public clone(): Parking {
        return Parking.copyOf(this);
    }
}