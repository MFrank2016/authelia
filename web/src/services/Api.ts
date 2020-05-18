import { AxiosResponse } from "axios";

export const FirstFactorPath = "./api/firstfactor";
export const InitiateTOTPRegistrationPath = "./api/secondfactor/totp/identity/start";
export const CompleteTOTPRegistrationPath = "./api/secondfactor/totp/identity/finish";

export const InitiateU2FRegistrationPath = "./api/secondfactor/u2f/identity/start";
export const CompleteU2FRegistrationStep1Path = "./api/secondfactor/u2f/identity/finish";
export const CompleteU2FRegistrationStep2Path = "./api/secondfactor/u2f/register";

export const InitiateU2FSignInPath = "./api/secondfactor/u2f/sign_request";
export const CompleteU2FSignInPath = "./api/secondfactor/u2f/sign";

export const CompletePushNotificationSignInPath = "./api/secondfactor/duo"
export const CompleteTOTPSignInPath = "./api/secondfactor/totp"

export const InitiateResetPasswordPath = "./api/reset-password/identity/start";
export const CompleteResetPasswordPath = "./api/reset-password/identity/finish";
// Do the password reset during completion.
export const ResetPasswordPath = "./api/reset-password"

export const LogoutPath = "./api/logout";
export const StatePath = "./api/state";
export const UserInfoPath = "./api/user/info";
export const UserInfo2FAMethodPath = "./api/user/info/2fa_method";

export const ConfigurationPath = "./api/configuration";
export const ExtendedConfigurationPath = "./api/configuration/extended";

export interface ErrorResponse {
    status: "KO";
    message: string;
}

export interface Response<T> {
    status: "OK";
    data: T;
}

export type ServiceResponse<T> = Response<T> | ErrorResponse;

function toErrorResponse<T>(resp: AxiosResponse<ServiceResponse<T>>): ErrorResponse | undefined {
    if (resp.data && "status" in resp.data && resp.data["status"] === "KO") {
        return resp.data as ErrorResponse;
    }
    return undefined;
}

export function toData<T>(resp: AxiosResponse<ServiceResponse<T>>): T | undefined {
    if (resp.data && "status" in resp.data && resp.data["status"] === "OK") {
        return resp.data.data as T;
    }
    return undefined
}

export function hasServiceError<T>(resp: AxiosResponse<ServiceResponse<T>>) {
    const errResp = toErrorResponse(resp);
    if (errResp && errResp.status === "KO") {
        return true;
    }
    return false;
}