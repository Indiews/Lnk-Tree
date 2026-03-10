import crypto from 'crypto';

/**
 * Generates a Gravatar profile picture URL for a given email address.
 * 
 * @param email - The user's email address
 * @param size - The desired size of the avatar in pixels (default 80)
 * @returns The Gravatar image URL
 */
export function getGravatarUrl(email: string, size: number = 80): string {
    // 1. Trim leading and trailing whitespace from an email address
    // 2. Force all characters to lower-case
    const normalizedEmail = email.trim().toLowerCase();

    // 3. md5 hash the final string
    const hash = crypto.createHash('md5').update(normalizedEmail).digest('hex');

    // 4. Return the Gravatar URL
    // d=mp (mystery-person) is used as a fallback if the user has no Gravatar
    return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=mp`;
}
