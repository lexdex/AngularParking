
export class Provider {
    id: number;
    name: string;
    city: string;
    street: string;
    building: string;
    parkingIds: number[];
    active: boolean;

    public static copyOf(provider: Provider): Provider {
        return Object.assign(new Provider(), provider);
    }

    public clone(): Provider {
        return Provider.copyOf(this);
    }
}