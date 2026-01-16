import nodemailer from 'nodemailer';
import { config } from '../config/config.js';

const sendEmail = async(to:string,html:string)=>{
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "alok61.bd@gmail.com",
    pass: config.googleAppPassword, // The 16-character App Password
  },
});


    const responseEmail = await transporter.sendMail({
      from: 'alok61.bd@gmail.com', // sender address
      to, // list of recipients
      subject: "reset password ✔✔", // subject line
      text: "This is a reset password email. this reset password link valied for 5 minute", // plain text body
      html
    });
return responseEmail;

}


export default sendEmail;