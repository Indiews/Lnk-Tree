import nodemailer from 'nodemailer';

// You can use ethereal for local testing to generate a preview link:
// Create an ethereal account at https://ethereal.email/create
// For production, supply your actual SMTP settings.

export const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.ethereal.email',
        port: Number(process.env.SMTP_PORT) || 587,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
};

export async function sendInvitationEmail(toEmail: string, inviteUrl: string, inviterName: string = "Admin") {
    const transporter = createTransporter();

    const mailOptions = {
        from: process.env.SMTP_FROM || '"Lnk-Tree Team" <noreply@example.com>',
        to: toEmail,
        subject: "You've been invited to join Lnk-Tree!",
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333;">Welcome to Lnk-Tree!</h2>
        <p>You have been invited by ${inviterName} to join the Lnk-Tree dashboard.</p>
        <p>Please click the button below to accept your invitation and set up your password.</p>
        <a href="${inviteUrl}" style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0;">
          Accept Invitation
        </a>
        <p style="color: #666; font-size: 14px;">This link will expire in 24 hours.</p>
        <p style="color: #666; font-size: 14px;">If you didn't expect this invitation, you can safely ignore this email.</p>
      </div>
    `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);

        // Preview only available when sending through an Ethereal account
        if (info.messageId && process.env.SMTP_HOST === 'smtp.ethereal.email') {
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
}
