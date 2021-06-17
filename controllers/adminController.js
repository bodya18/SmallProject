const RBAC = require("../service/RBAC_Service")

exports.GetAdmin = async (req,res) => {
    const rbac = new RBAC
    const news = await rbac.news.GetNews()
    const categories = await rbac.category.GetCategories()
    res.render('./AdminLTE-3.1.0/index.hbs', {
        title: 'Админ панель',
        isAdmin: true,
        news: news,
        categories: categories,
        isAdminPanel: true
    })
}