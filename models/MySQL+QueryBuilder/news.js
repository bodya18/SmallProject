const pool = require('../../middleware/pool')

class News{
    async isSave(userId, newsId){
        const qb = await pool.get_connection();
        const response = await qb.select('*')
            .where({'userId': userId, 'newsId': newsId})
            .get('WatchLater')
        qb.release();
        return response[0]
    }

    async DelWatchLater(id){
        const qb = await pool.get_connection();
        await qb.delete('WatchLater', {'id': id})
        qb.release();
    }

    async SaveWatchLater(userId, newsId){
        const qb = await pool.get_connection();
        await qb.insert('WatchLater', {newsId: newsId, userId: userId})
        qb.release();
    }

    async GetWatchLater(userId){
        const qb = await pool.get_connection();
        const response = await qb.select('*')
            .where({'userId': userId})
            .get('WatchLater')
        qb.release();
        return response
    }
    async edit(h1, meta_description, post_text, postUrl, categoryId, title, id) {
        const qb = await pool.get_connection();
        
        if(postUrl){
            await qb.update('news', {h1, meta_description, post_text, categoryId, title, postUrl: postUrl.path}, {id})
        }
        else{
            await qb.update('news', {h1, meta_description, post_text, categoryId, title}, {id})
        }
        qb.release();
    }

    async create(h1, meta_description, timepost, post_text, postUrl, categoryId, title) {
        const qb = await pool.get_connection();
        await qb.insert('news', {h1, meta_description, time, post_text, postUrl, categoryId, title}, (err, res)=>{
            qb.release();
            console.log(res);
            return res.insert_id
        })
    }
    async setText(newsId, post_text){
        const qb = await pool.get_connection();
        await qb.update('news', {post_text}, {id: newsId})
        qb.release();
    }
    async DeleteNews(id){
        const qb = await pool.get_connection();
        await qb.delete('news', {'id': id})
        qb.release();
    }

    async getById(id){
        const qb = await pool.get_connection();
        const response = await qb.select('*')
            .where({id: id})
            .get('news');
        qb.release();
        return response[0]
    }

    async Subscribe(email){
        const qb = await pool.get_connection();
        const data = new Date
        await qb.insert('Subscribers', {_data: data, email})
        qb.release();
    }

    async getSubscribers(){
        const qb = await pool.get_connection();
        const response = await qb.select('email')
            .get('Subscribers');
        qb.release();
        return response
    }
    async isSub(email){
        const qb = await pool.get_connection();
        const response = await qb
            .select('*')
            .where({email})
            .get('Subscribers');
        qb.release();
        return response[0]
    }

    async getByTitle(title){
        const qb = await pool.get_connection();
        const response = await qb
            .select('*')
            .where({title})
            .get('news');
        qb.release();
        if (response.length > 1)
            return response
        else
            return response[0]
    }
    async SelectOrderBy(what, desc = ''){
        const qb = await pool.get_connection();
        const response = await qb.order_by(what, desc).get('news');
        qb.release();
        return response
    }
    
    async SelectWhere(what, how){
        const qb = await pool.get_connection();
        const response = await qb
            .select('*')
            .where({what, how})
            .get('news');
        qb.release();
        return response[0]
    }

    async GetNews(){
        const qb = await pool.get_connection();
        const response = await qb
            .select('*')
            .get('news');
        qb.release();
        return response[0]
    }

    async GetNewsByCategory(categoryId){
        const qb = await pool.get_connection();
        const response = await qb
            .select('*')
            .where({categoryId})
            .get('news');
        qb.release();
        return response
    }

    async GetOneNewsByCategory(categoryId){
        function randomInteger(min, max) {
            let rand = min + Math.random() * (max + 1 - min);
            return Math.floor(rand);
        }
        const qb = await pool.get_connection();
        const response = await qb
            .select('*')
            .where({categoryId})
            .get('news');
        qb.release();
        return response[randomInteger(0, response.length)]        
    }

    async GetNewsByCategoryNoThisPost(categoryId, newsId){
        const qb = await pool.get_connection();
        const response = await qb
            .select('*')
            .where({categoryId, 'id !=': newsId})
            .get('news');
        qb.release();
        return response
    }
    
    async CreateSettings(key, label, value){
        const qb = await pool.get_connection();
        await qb.insert('news', {_key: key, label, value})
        qb.release();
    }

    async GetSettingsByKey(key){
        const qb = await pool.get_connection();
        const response = await qb
            .select('*')
            .where({'_key': key})
            .get('settings');
        qb.release();
        return response[0]
    }

    async GetSettings(){
        const qb = await pool.get_connection();
        const response = await qb
            .select('*')
            .get('settings');
        qb.release();
        return response
    }

    async newComment(comment, newsId, userId){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = mm + '.' + dd + '.' + yyyy;

        const qb = await pool.get_connection();
        await qb.insert('Comments', {comment, newsId, userId, date: today})
        qb.release();
    }

    async SetViews(newsId, count){
        const qb = await pool.get_connection();
        await qb.update('All_Views', {count}, {newsId})
        qb.release();
    }

    async GetViews(id){
        const qb = await pool.get_connection();
        const response = await qb
            .select('*')
            .where({'newsId': id})
            .get('All_Views')
        qb.release();
        return response[0]
    }

    async CreateViews(id){
        const qb = await pool.get_connection();
        await qb.insert('All_Views', {newsId: id})
        qb.release();
    }

    async GetComments(newsId){
        const qb = await pool.get_connection();
        const response = await qb.order_by('date', 'desc').where({newsId}).get('Comments');
        qb.release();
        return response
    }

    async GetCommentByAll(comment, newsId, userId){
        const qb = await pool.get_connection();
        const response = await qb
            .select('*')
            .where({comment, newsId, userId})
            .get('Comments')
        qb.release();
        return response[0]
    }
    async GetCommentById(id){
        const qb = await pool.get_connection();
        const response = await qb
            .select('*')
            .where({id})
            .get('Comments')
        qb.release();
        return response[0]
    }

    async EditThisComment(comment, id) {
        const qb = await pool.get_connection();
        await qb.update('Comments',{comment},{id})
        qb.release();
    }

    async DeleteComment (id) {
        const qb = await pool.get_connection();
        await qb.delete('Comments', {'id': id})
        qb.release();
    }

    async isLike(userId, newsId){
        const qb = await pool.get_connection();
        const response = await qb
            .select('*')
            .where({'userId': userId, 'newsId': newsId})
            .get('LikeNews')
        qb.release();
        return response[0]
    }

    async GetLikes(newsId){
        const qb = await pool.get_connection();
        const response = await qb
            .select('likes')
            .where({'id': newsId})
            .get('news')
        qb.release();
        return response[0].likes
    }

    async DeleteLike(newsId, userId){
        const qb = await pool.get_connection()
        await qb.delete('LikeNews', {newsId, userId})
        qb.release()
    }

    async GiveLike(newsId, userId){
        const qb = await pool.get_connection()
        await qb.insert('LikeNews', {newsId, userId})
        qb.release()
    }

    async updateLike(newsId, likes){
        const qb = await pool.get_connection()
        await qb.update('news', {likes}, {id: newsId})
        qb.release()
    }

    async search(search){
        const qb = await pool.get_connection()        
        const response = await qb
            .select('*')
            .like('title', search)
            .like('post_text', search)
            .like('h1', search)
            .like('meta_description', search)
            .get('news');
        qb.release()
        return response
    }

    async SearchTag(search){
        const qb = await pool.get_connection()        
        const response = await qb
            .select('*')
            .like('tag', search)
            .get('tag_news');
        qb.release()
        return response
    }

    async isTag(tag){
        const qb = await pool.get_connection()        
        const response = await qb
            .select('*')
            .where('tag', tag)
            .get('tags');
        qb.release()
        return response[0]
    }

    async createTag(tag){
        const qb = await pool.get_connection()
        await qb.insert('tags', {tag})
        qb.release()
    }

    async getTags(){
        const qb = await pool.get_connection()        
        const response = await qb
            .select('*')
            .get('tags');
        qb.release()
        return response
    }
    async getSelectTags(id){
        const qb = await pool.get_connection()        
        const response = await qb
            .select('*')
            .where('newsId', id)
            .get('tag_news');
        qb.release()
        return response
    }

    // async LAST_INSERT_ID(){
    //     var temp
    //     await pool.query(`SELECT LAST_INSERT_ID();`)
    //         .then(data => {
    //             temp = data[0][0]['LAST_INSERT_ID()']
    //         })
    //         .catch(e =>{
    //             return console.log(e);
    //         })
    //     return temp
    // }

    async addTag(tag, newsId){
        const qb = await pool.get_connection()
        await qb.insert('tag_news', {tag, newsId})
        qb.release()
    }
    async deleteTagsByNewsId(newsId){
        const qb = await pool.get_connection()
        await qb.delete('tag_news', {newsId})
        qb.release()
    }
}

module.exports = News