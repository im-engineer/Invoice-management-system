import nodemailer from "nodemailer"
import {get} from '../config'
var email = get('staging').Email;
const path = require('path');

export const sentEmail = (from,to,subject,text) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: email.user,
        pass: email.password
        }
    });
    var mailOptions = {
        from:from,
        to:to,
        subject:subject,
        html:text,
        attachments: [
            {
                filename: 'Invoice.pdf',           
                 path: ('output/Invoice.pdf'),         
                contentType: 'application/pdf'        }
        ]
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            // console.log(error);
            return false
        } else {
            // console.log('Email sent: ' + info.response);
            return true
        }
    });
     
}
