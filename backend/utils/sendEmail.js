const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (options) => {

    const msg = {
        to: options.email,
        from: process.env.SENDGRID_MAIL,
        templateId: options.templateId,
        dynamic_template_data: options.data,
    }
    
    sgMail.send(msg).then(() => {
        console.log('Email Sent')
    }).catch((error) => {
        console.error(error)
    });
};

module.exports = sendEmail;