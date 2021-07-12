let AllNews
addEventListener('load', ()=>{
    const ThiscategoryId = document.getElementById("ListNews").getAttribute('value')
        const newsId = document.getElementById("newsId").value
        let request = new XMLHttpRequest();
        let categoryId = JSON.stringify({categoryId: ThiscategoryId, newsId: newsId});
        request.open("post", "/api/news", true)
        request.setRequestHeader("Content-Type", "application/json");

        request.addEventListener("load", function () {
            AllNews = JSON.parse(request.response);
        })
        request.send(categoryId);
})
let listValue = 0
let isNews = true   
window.addEventListener('scroll', ()=>{
    let pix = document.body.scrollHeight - window.innerHeight - $(this).scrollTop()
    
    if(pix < 500 && isNews === true && listValue<AllNews.news.length){
        setTimeout(() => {
            isNews = true
        }, 500);
        let a = document.getElementById(`ListNews`)
        let i = listValue
        listValue++;    
        let newsId = JSON.stringify({newsId: AllNews.news[i].id})

        let request1 = new XMLHttpRequest();
        request1.open("post", "/api/ThisNews", true)
        request1.setRequestHeader("Content-Type", "application/json");
        
        request1.addEventListener("load", function () {
            
            var div = document.createElement('div')
            let ThisNews = JSON.parse(request1.response);
            
            let isPerm=false
            if(AllNews.permissionsList)
                for (let j = 0; j < AllNews.permissionsList.length; j++)
                    if (AllNews.permissionsList[j] === 'GIVE')
                        isPerm=true
            div.id ="news"+ listValue
            div.className="row"
            div.innerHTML = `
                <hr>
                <div class="col-lg-7">
                    <div class="sn-container">
                        <div class="single-img">
                            <img class="single-img"  src="/${AllNews.news[i].postUrl}">
                        </div>
                        <div class="sn-content">
                            <h1 class="sn-title">
                                ${AllNews.news[i].title}
                                ${isPerm 
                                    ? `<a style="text-decoration: none;" href="/news/edit/${AllNews.news[i].id}">
                                        <button type="button" class="btn btn-dark">&#9998;</button>
                                    </a>` 
                                    : ``
                                }
                            </h1>
                            <pre>${AllNews.news[i].post_text}</pre>
                            <div class="block_addition">
                                ${AllNews.isAuth 
                                    ? `<form name="registerForm${AllNews.news[i].id}">
                                        <input type="hidden" name="userId" value="${AllNews.user.id}">
                                        <input type="hidden" name="newsId" value="${AllNews.news[i].id}">
                                        ${ThisNews.isLike 
                                            ? `<button id="submitLike${AllNews.news[i].id}" onclick="likePost(${AllNews.news[i].id}, event)" class="btn btn-success" type="submit">Нравится&nbsp;&nbsp; ${AllNews.news[i].likes}</button>` 
                                            : `<button id="submitLike${AllNews.news[i].id}" onclick="likePost(${AllNews.news[i].id}, event)" class="btn btn-danger" type="submit">Нравится&nbsp;&nbsp; ${AllNews.news[i].likes}</button>`
                                        }
                                    </form>
                                    <form name="Watch${AllNews.news[i].id}" style="margin-left: 500px;">
                                        <input type="hidden" name="userId" value="${AllNews.user.id}">
                                        <input type="hidden" name="newsId" value="${AllNews.news[i].id}">
                                        ${ThisNews.isSave 
                                            ? `<button id="WatchLater${AllNews.news[i].id}" onclick="WatchLater(${AllNews.news[i].id}, event)" class="btn btn-warning" type="submit">Убрать из избранного</button>` 
                                            : `<button id="WatchLater${AllNews.news[i].id}" onclick="WatchLater(${AllNews.news[i].id}, event)" class="btn btn-info" type="submit">Добавить в избранное</button>`
                                        }
                                    </form>`
                                    : `<h4><font color="green">${AllNews.news[i].likes} "Нравится"</font></h4>`
                                }
                            </div><br>
                            <input type="hidden" id="views" value="${ThisNews.views}">
                            <h4 id="waypoint" class="timer"><font color="gray">${ThisNews.views} "Просмотров"</font></h4>
                            <input type="hidden" id="newsId" value="${AllNews.news[i].id}">
                            <br>
                        </div>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="sidebar">
                        <div class="sidebar-widget">    
                            <div class="coment-bottom bg-white p-2 px-4 comment_list_1">
                                <h3>Комментарии</h3>
                                ${AllNews.isAuth 
                                    ? `<font color='red' id="error${AllNews.news[i].id}"></font>
                                    <form name="NewComment${AllNews.news[i].id}">
                                        <input type="hidden" name="userId" value="${AllNews.user.id}">
                                        <input type="hidden" name="newsId" value="${AllNews.news[i].id}">
                                        <div class="d-flex flex-row add-comment-section mt-4 mb-4">
                                        ${
                                            AllNews.user.avatarURL 
                                            ? `<img class="img-fluid img-responsive rounded-circle mr-2" src="/${AllNews.user.avatarURL}" style="width: 50px; height: 50px;">` 
                                            : `<img class="img-fluid img-responsive rounded-circle mr-2" src="../../images/no_avatar.png" style="width: 50px; height: 50px;">`
                                        }
                                            <textarea id="texrow${AllNews.news[i].id}" name="comments" type="text" class="form-control mr-3" placeholder="Добавить комментарий" rows="4" maxlength="1000" minlength="1"></textarea>   
                                            <button id="comment${AllNews.news[i].id}" onclick="addComment(${AllNews.news[i].id}, event)" class="btn btn-primary" type="submit" style="width: auto; height: 50px;">
                                                Комментировать
                                            </button>
                                        </div>
                                    </form>`
                                    : ``
                                }
                                <form name="AddComment${AllNews.news[i].id}">
                                    <div id="ListComments${AllNews.news[i].id}"></div>
                                </form>
                                <div id="ShowComments${AllNews.news[i].id}" value="${AllNews.news[i].id}"></div>                                    
                            </div>
                        </div>
                        
                    </div>
                    
                </div>`
            
            
            a.appendChild(div)

            
        })
        request1.send(newsId);
        
        setTimeout(() => {
            ThisNewsId = JSON.parse(newsId).newsId
            
            
            let request2 = new XMLHttpRequest();
            let newsId1 = JSON.stringify({id: ThisNewsId});
            
            request2.open("post", "/api/comments", true)
            
            request2.setRequestHeader("Content-Type", "application/json");
            
            request2.addEventListener("load", function () {
                let session = JSON.parse(request2.response);
                let b = document.getElementById(`ShowComments`+ThisNewsId)
            
                for (let i = 0; i < session.comments.length; i++) {
                    
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
                                            <img id="UserAvatar" class="rounded-circle" src="../../${session.users[j].avatarURL}" style="width: 50px; height: 50px;">
                                            <div class="d-flex flex-column justify-content-start ml-2">
                                                <span class="d-block font-weight-bold name">${session.users[j].name}</span>
                                                <span class="date text-black-50">${session.comments[i].date}</span>
                                            </div>
                                                <form name="editComment${countComments}">
                                                    <input type="hidden" id="commentId${countComments}" name="id" value="${session.comments[i].id}">
                                                    <input type="hidden" id="ThisComment${countComments}" name="comment" value="${session.comments[i].comment}">
                                                    <button id='Editcom${countComments}' onclick="editComment(${countComments}, event)" style="margin-left:154px; margin-right: 20px;" type="submit" class="btn btn-dark">Редактировать</button>
                                                </form>
                                                <form name="DeleteComment${countComments}">
                                                    <input id="commentId${countComments}" type="hidden" value="${session.comments[i].id}">
                                                    <button onclick="DelComment(${countComments}, event)" id="DelComm${countComments}" type="submit" class="btn btn-danger">Удалить</button>
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
                                                    <img id="UserAvatar" class="rounded-circle" src="../../${session.users[j].avatarURL}" style="width: 50px; height: 50px;">
                                                    <div class="d-flex flex-column justify-content-start ml-2">
                                                        <span class="d-block font-weight-bold name">${session.users[j].name}</span>
                                                        <span class="date text-black-50">${session.comments[i].date}</span>
                                                    </div>
                                                        <form name="DeleteComment${countComments}">
                                                            <input id="commentId${countComments}" type="hidden" value="${session.comments[i].id}">
                                                            <button onclick="DelComment(${countComments}, event)" id="DelComm${countComments}" type="submit" style="margin-left:300px;" class="btn btn-danger">Удалить</button>
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
                                                    <img id="UserAvatar" class="rounded-circle" src="../../${session.users[j].avatarURL}" style="width: 50px; height: 50px;">
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
                                            <img id="UserAvatar" class="rounded-circle" src="../../${session.users[j].avatarURL}" style="width: 50px; height: 50px;">
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
                    b.appendChild(div)
                    countComments++;
                }
            });
            
            request2.send(newsId1);    
        }, 100);
        
                
        isNews = false
    }	
})
