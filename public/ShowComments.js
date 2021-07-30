let countComments = 0;
let CommentsLength = 0;
let CountShowComments = 15

addEventListener('load', function (e){
    const div = document.getElementById('in_this_category')

    let request = new XMLHttpRequest();
    let newsId = document.getElementById('newsId').value
    let categoryId = document.getElementById('categoryId').value
    let news = JSON.stringify({newsId: newsId, categoryId: categoryId});

    request.open("post", "/api/news", true)
    
    request.setRequestHeader("Content-Type", "application/json");
    
    request.addEventListener("load", function () {
        let data = JSON.parse(request.response)
        if(data.news.length>5 && (typeof data.news)=='object'){
            const shuffled = data.news.sort(() => 0.5 - Math.random());
            data.news = shuffled.slice(0, 5);
        }
        div.className = 'col-lg-4 in_this_category'
        let a = document.createElement('div')
        a.className = 'news-list'
        const date = new Date()
        const nowDate = Date.UTC(date.getFullYear(), date.getMonth()+1, date.getDate(), date.getHours(), date.getMinutes())
        for (let i = 0; i < data.news.length; i++) {
            if(data.news[i].time<nowDate)
                a.insertAdjacentHTML(
                    'beforeend', 
                    `<div class="nl-item">
                        <div class="nl-img">
                            <img class="img-inTHis-category" src="/${data.news[i].postUrl}" />
                        </div>
                        <div class="nl-title">
                            <a class="none-decloration" href="/news/get/${data.news[i].id}">${data.news[i].title}</a>
                        </div>
                    </div>`
                )
        }
        div.innerHTML = 
        `<div class="sidebar">
            <div class="sidebar-widget">
                <h2 class="sw-title">В этой категории</h2>
                <div id="showInThisCategory">
                    
                </div> 
            </div>
        </div>`
        document.getElementById('showInThisCategory').appendChild(a)

    })
    request.send(news)
    
    addMore(e)  
})

function addMore(e){
    if (document.getElementById('button_more')) {
        document.getElementById('button_more').remove()
    }
    const id = document.getElementById("ShowComments").getAttribute('value')
    e.preventDefault()
    let request = new XMLHttpRequest();
    let newsId = JSON.stringify({id: id});
    
    request.open("post", "/api/comments", true)
    
    request.setRequestHeader("Content-Type", "application/json");
    
    request.addEventListener("load", function () {
        let session = JSON.parse(request.response);
        let a = document.getElementById(`ShowComments`)
        if(session.comments.length > CommentsLength){
            let step = CommentsLength + CountShowComments
            if(session.comments.length - CommentsLength < CountShowComments){
                step = session.comments.length
            }
            for (let i = CommentsLength; i < step; i++) {
                var div = document.createElement('div')
                div.className = "commented-section mt-2"
                div.id ="comment"+ countComments
                for (let j = 0; j < session.users.length; j++) {
                    if(session.users[j].id === session.comments[i].userId){
                        if(!session.users[j].avatarURL)
                            session.users[j].avatarURL='images/no_avatar.png'
                        if(session.user){
                            if(session.user.id === session.comments[i].userId){
                                div.innerHTML =`
                                <div class="bg-white p-2">
                                    <div class="d-flex flex-row user-info">   
                                        <img id="UserAvatar" class="rounded-circle comment-user-img" src="../../${session.users[j].avatarURL}">
                                        <div class="d-flex flex-column justify-content-start ml-2">
                                            <span class="d-block font-weight-bold name">${session.users[j].name}</span>
                                            <span class="date text-black-50">${session.comments[i].date}</span>
                                        </div>
                                            <form name="editComment${countComments}">
                                                <input type="hidden" id="commentId${countComments}" name="id" value="${session.comments[i].id}">
                                                <input type="hidden" id="ThisComment${countComments}" name="comment" value="${session.comments[i].comment}">
                                                <button id='Editcom${countComments}' onclick="editComment(${countComments}, event)" type="submit" class="btn btn-dark Edit-comment">&#9998;</button>
                                            </form>
                                            <form name="DeleteComment${countComments}">
                                                <input id="commentId${countComments}" type="hidden" value="${session.comments[i].id}">
                                                <button onclick="DelComment(${countComments}, event)" id="DelComm${countComments}" type="submit" class="btn btn-danger"><i class="fas fa-trash"></i></button>
                                            </form>
                                        </div>
                                    </div>
                                    <div class="mt-2">
                                        <pre>${session.comments[i].comment}</pre>
                                    </div>
                                </div><hr>`
                            }
                            else{
                                let permis = true
                                        for (let k = 0; k < session.permissionsList.length; k++) {
                                            if(session.permissionsList[k] === 'GIVE'){
                                                div.innerHTML =`
                                                <div class="bg-white p-2">
                                                    <div class="d-flex flex-row user-info">   
                                                        <img id="UserAvatar" class="rounded-circle comment-user-img" src="../../${session.users[j].avatarURL}">
                                                        <div class="d-flex flex-column justify-content-start ml-2">
                                                            <span class="d-block font-weight-bold name">${session.users[j].name}</span>
                                                            <span class="date text-black-50">${session.comments[i].date}</span>
                                                        </div>
                                                            <form name="DeleteComment${countComments}">
                                                                <input id="commentId${countComments}" type="hidden" value="${session.comments[i].id}">
                                                                <button onclick="DelComment(${countComments}, event)" id="DelComm${countComments}" type="submit" class="btn btn-danger delComment"><i class="fas fa-trash"></i></button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                    <div class="mt-2">
                                                        <p class="comment-text">${session.comments[i].comment}</p>
                                                    </div>
                                                </div><hr>`
                                                permis = false
                                            }   
                                        }
                                        if(permis)
                                            div.innerHTML =`
                                                <div class="bg-white p-2">
                                                    <div class="d-flex flex-row user-info">   
                                                        <img id="UserAvatar" class="rounded-circle comment-user-img" src="../../${session.users[j].avatarURL}">
                                                        <div class="d-flex flex-column justify-content-start ml-2">
                                                            <span class="d-block font-weight-bold name">${session.users[j].name}</span>
                                                            <span class="date text-black-50">${session.comments[i].date}</span>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    <div class="mt-2">
                                                        <p class="comment-text">${session.comments[i].comment}</p>
                                                    </div>
                                                </div><hr>`
                            }
                        }
                        else{
                            div.innerHTML =`
                                <div class="bg-white p-2">
                                    <div class="d-flex flex-row user-info">   
                                        <img id="UserAvatar" class="rounded-circle comment-user-img" src="../../${session.users[j].avatarURL}">
                                        <div class="d-flex flex-column justify-content-start ml-2">
                                            <span class="d-block font-weight-bold name">${session.users[j].name}</span>
                                            <span class="date text-black-50">${session.comments[i].date}</span>
                                        </div>
                                        </div>
                                    </div>
                                    <div class="mt-2">
                                        <p class="comment-text">${session.comments[i].comment}</p>
                                    </div>
                                </div><hr>`
                        }
                    }
                }
                a.appendChild(div)
                countComments++;
            }
            CommentsLength += CountShowComments;
            if(CommentsLength < session.comments.length){
                var btn = document.createElement("button");
                btn.type = 'submit';
                btn.id = 'button_more'
                btn.setAttribute("onclick","addMore(event)");
                btn.className = 'btn btn-info'
                var t = document.createTextNode("Загрузить еще");
                btn.appendChild(t)
                a.after(btn)
            }
        }
        

    });
    
    request.send(newsId);    
}

addEventListener('load', ()=>{
    const pre = document.getElementById('show_post_text')

    let request = new XMLHttpRequest();
    let newsId = document.getElementById('newsId').value
    let news = JSON.stringify({newsId: newsId});

    request.open("post", "/api/GetNewsById", true)
    
    request.setRequestHeader("Content-Type", "application/json");
    
    request.addEventListener("load", function () {
        let data = JSON.parse(request.response)
        pre.insertAdjacentHTML('beforeend' , data.post_text)
    })
    request.send(news)
})