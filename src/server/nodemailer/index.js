const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
import Order from '../templates/Order';


const clientId = '848572588552-lus09ldl7tso0nlu01oa3oi7m2uohm6h.apps.googleusercontent.com';
const clientSecret = 'HtPPuVSl2v37kKnMxRF9rVPt';
const refresh_token = '1//04UPzx44-FG0gCgYIARAAGAQSNwF-L9IrKx9NzIU8vSApcJhS_7wY2cPoDIvIlSogySeUMWOCTWJtjeBOqDnYNEGAuMODsd8D8OI'

const myOAuth2Cilent = new OAuth2(
    clientId,
    clientSecret,
    "https://developers.google.com/oauthplayground"
    )
    myOAuth2Cilent.setCredentials({
        refresh_token
})
const myAccessToken = myOAuth2Cilent.getAccessToken();
    
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: "OAuth2",
        user: "QuickMowFo@gmail.com",
        clientId,
        clientSecret,
        refreshToken: refresh_token,
        accessToken: myAccessToken
    }
})

const sendMail = (email, subject, html) => new Promise((resolve, reject) => {

    const mailOptions = {
        from: 'QuickMowFo Law Mowing Services <quickmowfo@gmail.com>',
        to: email,
        subject,
        html
    }

    transport.sendMail(mailOptions, (err, result) => {
        if(err){
            console.log(err)
            resolve(false)
        } else {
            console.log(result)
            resolve(true)
        }
    })

})
module.exports = sendMail