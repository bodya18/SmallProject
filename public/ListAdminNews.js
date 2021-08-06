function AddAdminInCategory(e, categoryId, AddNewsInAdmin, nowIndexShowNewsInAdmin){
    e.preventDefault()
     
    let ThisCategory = JSON.stringify({categoryId})
    let request = new XMLHttpRequest
    request.open("POST", "/api/GetNewsByCategoryId", true);   

    request.setRequestHeader("Content-Type", "application/json");

    request.addEventListener("load", function () {
        let data = JSON.parse(request.response)
        let thisNews = data.slice(nowIndexShowNewsInAdmin, AddNewsInAdmin + nowIndexShowNewsInAdmin)
        nowIndexShowNewsInAdmin+=AddNewsInAdmin

        document.getElementById('btn-addNews-'+categoryId).remove()
        let div = document.getElementById('AddAdminInCategory-'+categoryId)
        for (let i = 0; i < thisNews.length; i++) {
            div.insertAdjacentHTML(
                'beforeend', 
                `<div class="col-md-3">
                    <div class="cn-img">
                        <img class="show-Posts" src="/${thisNews[i].postUrl}" />
                        <div class="cn-title">
                            <a class="none-decloration" href="/news/get/${thisNews[i].id}">${thisNews[i].title}</a>
                        </div>
                    </div>
                </div>`
            )
        }
        if(data.length > nowIndexShowNewsInAdmin){
            var btn = document.createElement("button");
            btn.id = 'btn-addNews-'+categoryId
            btn.setAttribute("onclick",`AddAdminInCategory(event, ${categoryId}, ${AddNewsInAdmin}, ${nowIndexShowNewsInAdmin})`);
            btn.className = 'btn btn-secondary'
            var t = document.createTextNode("Загрузить еще");
            btn.appendChild(t)
            div.after(btn)
        }
        
        
    })
    request.send(ThisCategory)
}