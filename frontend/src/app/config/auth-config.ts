import { PassedInitialConfig } from "angular-auth-oidc-client";

export const cId = "auth-config";
export const authConfig: PassedInitialConfig = {
    config: {
        configId: cId,
        authority: 'http://localhost:8181/realms/sb-shop-realm',
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'sb-shop-credentials-id',
        scope: 'openid profile offline_access',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        renewTimeBeforeTokenExpiresInSeconds: 30,
    }
}