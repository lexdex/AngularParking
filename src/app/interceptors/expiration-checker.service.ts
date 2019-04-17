import {Injectable} from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {TokenStorage} from "../auth/token/token-storage";
import {TokenPair} from "../auth/token/token-pair";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

@Injectable()
export class ExpirationCheckerService implements HttpInterceptor {

    private accessTokenHeader = environment.accessTokenHeader;
    private refreshTokenHeader = environment.refreshTokenHeader;

    constructor(private http: HttpClient,
                private router: Router,
                private tokenStorage: TokenStorage) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.tokenStorage.isExpired()) {
            req = this.addRefreshTokentToRequest(req);
        }
        return next.handle(req).do(response => {
                if (response instanceof HttpResponse) {
                    if (response.headers.has(this.accessTokenHeader) && response.headers.has(this.refreshTokenHeader)) {
                        this.tokenStorage.saveToken(new TokenPair(response.headers.get(this.accessTokenHeader), response.headers.get(this.refreshTokenHeader)));
                    }
                }
                return response;
            },
            error => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status == 401) {
                        this.tokenStorage.signOut();
                        this.router.navigate(['/']);
                    }
                }
            });
    }

    private addRefreshTokentToRequest(request: HttpRequest<any>): HttpRequest<any> {
        return request.clone({
            headers: request.headers.append(this.refreshTokenHeader, this.tokenStorage.getRefreshToken())
        });
    }
}
