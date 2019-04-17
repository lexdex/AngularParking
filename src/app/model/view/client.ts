export class Client {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    favoritesNames: string[];
    providerName: string;
    providersId: number;
    role: string;
    image: string;
    activated: boolean;

    public static copyOf(client: Client): Client {
        return Object.assign(new Client(), client);
    }

}