// eslint-disable-next-line import/no-extraneous-dependencies
import nodemailer from 'nodemailer';

export const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: `${process.env.EMAIL}`,
        pass: `${process.env.PASSWORD}`
    }
});

export default { transport };
