const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const util = require('util');
const emailConfig = require('../config/email');

// create reusable transporter object using the default SMTP transport
let transport = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  //secure: false, // true for 465, false for other ports
  auth: {
    user: emailConfig.user, // generated ethereal user
    pass: emailConfig.pass, // generated ethereal password
  },
});

const generateHtml = (template, options) => {
  const html = pug.renderFile(`${__dirname}/../views/emails/${template}.pug`, options);
  return juice(html);
}

exports.send = ({email, subject, template, templateVars = {}, from = 'UpTask <no-reply@uptask.com>'}) => {
  //const html = generateHtml(template, templateVars);
  //const text = htmlToText.fromString()
  let mailOptions = {
    from: from, // sender address
    to: email, // list of receivers [ comma-separated values ]
    subject: subject, // Subject line
    //text: "Hola", // plain text body
    html: generateHtml(template, templateVars), // html body
  }

  // send mail with defined transport object
  return transport.sendMail(mailOptions);
}


