
// var waypoint = new Waypoint({
//     element: document.getElementById('waypoint'),
//     handler: function() {
//       notify('Basic waypoint triggered')
//     }
//   })
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
window.addEventListener('scroll', ()=>{
    if((document.body.scrollHeight - window.innerHeight - $(this).scrollTop()) <500 && listValue<AllNews.news.length){
        let a = document.getElementById(`ListNews`)
        console.log(listValue);
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
                                    ? `<font color='red' id="error"></font>
                                    <form name="NewComment">
                                        <input type="hidden" name="userId" value="${AllNews.user.id}">
                                        <input type="hidden" name="newsId" value="${AllNews.news[i].id}">
                                        <div class="d-flex flex-row add-comment-section mt-4 mb-4">
                                        ${
                                            AllNews.user.avatarURL 
                                            ? `<img class="img-fluid img-responsive rounded-circle mr-2" src="/${AllNews.user.avatarURL}" style="width: 50px; height: 50px;">` 
                                            : `<img class="img-fluid img-responsive rounded-circle mr-2" src="../../images/no_avatar.png" style="width: 50px; height: 50px;">`
                                        }
                                            <textarea id="texrow" name="comments" type="text" class="form-control mr-3" placeholder="Добавить комментарий" rows="4" maxlength="1000" minlength="1"></textarea>   
                                            <button id="comment" class="btn btn-primary" type="submit" style="width: auto; height: 50px;">
                                                Комментировать
                                            </button>
                                        </div>
                                    </form>`
                                    : ``
                                }
                                <form name="AddComment${AllNews.news[i].id}">
                                    <div id="ListComments0"></div>
                                </form>
                                <div id="ShowComments${AllNews.news[i].id}" value="${AllNews.news[i].id}"></div>                                    
                            </div>
                        </div>
                        
                    </div>
                    
                </div>`
            
            
            a.appendChild(div)
            
                
        })
        request1.send(newsId);
    }	
})
