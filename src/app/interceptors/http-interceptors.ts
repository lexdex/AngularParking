import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {InterceptorService} from "./interceptor.service";
import {ExpirationCheckerService} from "./expiration-checker.service";


export const httpInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: ExpirationCheckerService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
];