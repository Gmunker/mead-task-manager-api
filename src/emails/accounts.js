const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'gmunker@vitalityhandmade.com',
    subject: 'Thanks joining in!',
    text: `Welcome to the app ${name}, let me know how you like it.`
  })
}

const sendGoodbyeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'gmunker@vitalityhandmade.com',
    subject: 'So sorry to see you go',
    text: 'Sorry to see you go, please let me know if we can improve.'
  })
}

module.exports = {
  sendWelcomeEmail,
  sendGoodbyeEmail
}
