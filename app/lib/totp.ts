import * as OTPAuth from "otpauth";

const APP_NAME = "Lnk-Tree";

/**
 * Generate a new TOTP secret and return the secret + provisioning URI.
 */
export function generateTOTPSecret(email: string) {
    const totp = new OTPAuth.TOTP({
        issuer: APP_NAME,
        label: email,
        algorithm: "SHA1",
        digits: 6,
        period: 30,
    });

    return {
        secret: totp.secret.base32,
        uri: totp.toString(),
    };
}

/**
 * Verify a TOTP code against a stored base32 secret.
 */
export function verifyTOTPCode(secret: string, code: string): boolean {
    const totp = new OTPAuth.TOTP({
        issuer: APP_NAME,
        algorithm: "SHA1",
        digits: 6,
        period: 30,
        secret: OTPAuth.Secret.fromBase32(secret),
    });

    // delta allows for 1 time-step tolerance (30s before/after)
    const delta = totp.validate({ token: code, window: 1 });
    return delta !== null;
}
