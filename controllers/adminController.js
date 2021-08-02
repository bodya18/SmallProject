const RBAC = require("../service/RBAC_Service")

exports.GetAdmin = async (req,res) => {
    const rbac = new RBAC
    const news = await rbac.news.GetNews()
    console.log(news);
    let data = new Date()
    let nowDate = Date.UTC(data.getFullYear(), data.getMonth()+1, data.getDate(), data.getHours(), data.getMinutes())
    
    const categories = await rbac.category.GetCategories()
    res.render('./AdminLTE-3.1.0/index.hbs', {
        nowDate,
        title: 'Админ панель',
        isAdmin: true,
        news: news,
        categories: categories,
        isAdminPanel: true
    })
}