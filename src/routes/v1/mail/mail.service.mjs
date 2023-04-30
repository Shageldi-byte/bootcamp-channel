import nodemailer from "nodemailer";

var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'expresslesson1@gmail.com',
            pass: 'viewbcwaezilqwkc'
        }
    });


export function sendMail(email, subject,message,onResult){

    var mailOptions = {
        from: 'expresslesson1@gmail.com',
        to: email,
        subject: subject,
        html: message
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            onResult(error);
        } else {
            onResult('Email sent: ' + info.response);
        }
    });
}