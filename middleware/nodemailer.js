const nodemailer = require('nodemailer')
const config = require('./config')
const newsModel = require(`../models/${config.database}/news`);

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: 'bodya18xx@gmail.com',
    pass: 'zaqwsxz1.',
    },
})

exports.SendMSG = async () => {  
    const news = new newsModel;
    const emails = await news.getSubscribers()
    let mail = []
    for (let i = 0; i < emails.length; i++) {
        mail[i] = emails[i].email
    }
    let result = await transporter.sendMail({
    from: '<news@gmail.com>',
    to: mail,
    subject: 'Новостной портал',
    html:
        `Переходите по <a href="${config.site}">ссылке</a> на наш новостной портал.<br> У нас Вы пожете прочитать новости на различные, <strong>интересные Вам</strong>, темы!`
    })    
}

exports.acceptAcc = async (token, email) => {
    let result = await transporter.sendMail({
    from: '<news@gmail.com>',
    to: email,
    subject: 'Новостной портал',
    html:
        `<p>Подтвержение аккаунта</p> 
        <p>Если вы не регистрировали аккаунт просто проигнорируйте данное сообщение</p>
        <p>Иначе для потверждения перейдите по <a href="${config.site}/users/accept/${token}">ссылке</a></p>`
    })    
}

exports.recoveryPass = async (email, token) =>{
    let result = await transporter.sendMail({
    from: '<news@gmail.com>',
    to: email,
    subject: 'Новостной портал',
    html:
        `<p>Восстановление пароля</p> 
        <p>Если вы не запрашивали восстановления пароля просто проигнорируйте данное сообщение</p>
        <p>Иначе для восстановления перейдите по <a href="${config.site}/users/recovery/${token}">ссылке</a></p>`
    })    
}

exports.NewPass = async (email) =>{
    let result = await transporter.sendMail({
    from: '<news@gmail.com>',
    to: email,
    subject: 'Новостной портал',
    html:
        `<p>Пароль успешно восстановлен</p> 
        <p>Переходите по <a href="${config.site}">ссылке</a> на наш новостной портал.<br> У нас Вы пожете прочитать новости на различные, <strong>интересные Вам</strong>, темы!</p>`
    })    
}