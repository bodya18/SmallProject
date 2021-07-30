const countShowNews = 10;
let nowIndexShowNews = countShowNews;
function AddMoreSearch(e){
    e.preventDefault()
    let search = document.getElementById('search_request').value
    let request = new XMLHttpRequest();
    search = JSON.stringify({search: search})
    request.open("POST", "/api/search", true);   

    request.setRequestHeader("Content-Type", "application/json");

    request.addEventListener("load", function () {
        let data = JSON.parse(request.response)
        let thisNews = data.news.slice(nowIndexShowNews, countShowNews + nowIndexShowNews)

        nowIndexShowNews+=countShowNews

        document.getElementById('btn_more_search').remove()
        let div = document.getElementById('showPosts')
        for (let i = 0; i < thisNews.length; i++) {
            thisNews[i].post_text = thisNews[i].post_text.replace(/<.*?>/g, "").replace(/&.*?;/g, "")
            if(thisNews[i].time<data.nowDate)
                div.insertAdjacentHTML(
                    'beforeend', 
                    `<div class="block_addition">
                        <div class="col-md-3">
                            <div class="cn-img">
                                <img class="show-Posts" src="/${thisNews[i].postUrl}">
                                <div class="cn-title">
                                    <a class="none-decloration" href="/news/get/${thisNews[i].id}">${thisNews[i].title}</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 show_search phone-right-news">
                        ${thisNews[i].meta_description 
                            ?`${thisNews[i].meta_description}`
                            :`<div class="truncate">
                                ${thisNews[i].post_text}
                              </div>`
                        }
                        </div>
                    </div>`
                )
        }
        if(data.news.length > nowIndexShowNews){
            var btn = document.createElement("button");
            btn.id = 'btn_more_search'
            btn.setAttribute("onclick","AddMoreSearch(event)");
            btn.className = 'btn btn-info btn-list-request'
            var t = document.createTextNode("Загрузить еще");
            btn.appendChild(t)
            div.after(btn)
            console.log(div);
        }
        
        
    })
    request.send(search)
}