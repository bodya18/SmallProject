const nodemailer = require('nodemailer')
const config = require('./config')

exports.SendMSG = async () => {
    let testEmailAccount = await nodemailer.createTestAccount()

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'bodya18xx@gmail.com',
        pass: 'zaqwsxz1.',
        },
    })
    
    let result = await transporter.sendMail({
    from: '<news@gmail.com>',
    to: 'bodya18x@mail.ru',
    subject: 'Новостной портал',
    html:
        `Переходите по <a href="${config.site}">ссылке</a> на наш новостной портал.<br> У нас Вы пожете прочитать новости на различные, <strong>интересные Вам</strong>, темы!`,
    })    
}

exports.acceptAcc = async (token, email) => {
    let testEmailAccount = await nodemailer.createTestAccount()

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'bodya18xx@gmail.com',
        pass: 'zaqwsxz1.',
        },
    })
    
    let result = await transporter.sendMail({
    from: '<news@gmail.com>',
    to: email,
    subject: 'Новостной портал',
    html:
        `<p>Подтвержение аккаунта</p> 
        <p>Если вы не регистрировали аккаунт просто проигнорируйте данное сообщение</p>
        <p>Иначе для потверждения перейдите по <a href="${config.site}/users/accept/${token}">ссылке</a></p>`,
    })    
}