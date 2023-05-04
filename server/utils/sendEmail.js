const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'consultanplatform@gmail.com',
                pass: 'dat02092001',
            },
        });

        await transporter.sendMail({
            from: 'consultanplatform@gmail.com',
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;
