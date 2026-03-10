import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET || "your-development-secret-key-123456789";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1 day from now")
        .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    });
    return payload;
}

/**
 * Short-lived JWT for the 2FA verification step (5 minutes).
 */
export async function encryptPending2FA(userId: number) {
    return await new SignJWT({ userId, pending2FA: true })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("5 minutes from now")
        .sign(key);
}

export async function decryptPending2FA(token: string): Promise<{ userId: number } | null> {
    try {
        const { payload } = await jwtVerify(token, key, {
            algorithms: ["HS256"],
        });
        if (payload.pending2FA === true && typeof payload.userId === "number") {
            return { userId: payload.userId };
        }
        return null;
    } catch {
        return null;
    }
}
