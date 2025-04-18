import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { OidcSecurityService } from "angular-auth-oidc-client";
import { cId } from "../config/auth-config";


export const authInterceptor: HttpInterceptorFn = (req, next) => {
    console.log('token call made');
    const authService = inject(OidcSecurityService);

    authService.getAccessToken(cId).subscribe(token => {
        console.log('token requested');
        if (token) {
            console.log('token received');
            let header = 'Bearer ' + token;
            let headers = req.headers.set('Authorization', header);
            req = req.clone({ headers });
            return next(req);
        }
        console.log('token failed');
        return next(req);
    });
    return next(req);
};