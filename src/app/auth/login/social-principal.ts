export class SocialPrincipal {
    public id: string;
    public email: string;
    public name: string;
    public provider: string;

    public constructor(id: string, email: string, name: string, provider: string) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.provider = provider;
    }
}

