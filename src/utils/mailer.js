import nodemailer from "nodemailer";

class Mailer {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAILER_ADDRESS,
                pass: process.env.MAILER_PASS
            }
        });
        this.baseApiURL =
            process.env.NODE_ENV === "local"
                ? "http://localhost:4000"
                : "https://projectify-app-api.onrender.com";
        this.baseUiURL = process.env.UI_BASE_URL;
    }
    send = async (mailOptions) => {
        try {
            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            throw error;
        }
    };

    sendActivationMail = async (emailAddress, token) => {
        try {
            await this.send({
                to: emailAddress,
                subject: "Projectify App | Activate Your Account",
                html: `<a href="http://localhost:3000/admins/activate?activationToken=${token}">Verify your email</a> `
            });
        } catch (error) {
            throw error;
        }
    };
    sendPasswordResetToken = async (emailAddress, token) => {
        try {
            this.send({
                to: emailAddress,
                subject: "Projectify App | Reset Password",
                html: `<a href="http://localhost:6000/reset-password/passwordResetToken=${token}">Reset Your Password</a>`
            });
        } catch (error) {
            throw error;
        }
    };

    sendCreatePasswordInviteToTeamMember = async (emailAddress, token) => {
        try {
            await this.send({
                to: emailAddress,
                subject: "Pojectify App | Welcome to the team",
                html: `<a href="http://localhost:4000/team-member/create-password?inviteToken=${token}">Click to Create a Password</a>`
            });
        } catch (error) {
            throw error;
        }
    };
}

export const mailer = new Mailer();
