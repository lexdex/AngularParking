export enum Role {
    Unauthorized,
    Driver,
    Manager,
    Admin
}

export function determineRole(input: string): Role {
    if (input == 'DRIVER') {
        return Role.Driver;
    } else if (input == 'PROVIDER_MANAGER') {
        return Role.Manager;
    } else if (input == 'SUPERUSER') {
        return Role.Admin
    } else {
        return Role.Unauthorized
    }
}

