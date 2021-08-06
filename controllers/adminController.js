const RBAC = require("../service/RBAC_Service")

exports.GetAdmin = async (req,res) => {
    const rbac = new RBAC
    let news1 = []
    let news = []
    let categories = await rbac.category.GetCategories()
    for (let i = 0; i < categories.length; i++) {
        let isMore = false
        news1.push(await rbac.news.GetNewsByCategory(categories[i].id))
        news1[0] = news1[0].reverse()

        if(news1[0].length > 8){
            news1[0]=news1[0].slice(0,8)
            isMore = true
        }
        categories[i].isMore = isMore
        news.push(news1[0])
        news1 = []
    }
    news = [].concat(...news)
    let data = new Date()
    let nowDate = Date.UTC(data.getFullYear(), data.getMonth()+1, data.getDate(), data.getHours(), data.getMinutes())
    res.render('./AdminLTE-3.1.0/index.hbs', {
        nowDate,
        title: 'Админ панель',
        isAdmin: true,
        news: news,
        categories: categories,
        isAdminPanel: true
    })
}