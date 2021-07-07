addEventListener("load", ()=>{
    const ThiscategoryId = document.getElementById("ListNews").getAttribute('value')
    const newsId = document.getElementById("newsId").value

    let request = new XMLHttpRequest();

    let categoryId = JSON.stringify({categoryId: ThiscategoryId, newsId: newsId});

    request.open("post", "/api/news", true)
    
    request.setRequestHeader("Content-Type", "application/json");

    let listValue = 0

    request.addEventListener("load", function () {

        let news = JSON.parse(request.response);
        let a = document.getElementById(`ListNews`)
        console.log(news);
        for (let i = 0; i < news.news.length; i++) {

            let newsId = JSON.stringify({newsId: news.news[i].id})

            let request1 = new XMLHttpRequest();
            request1.open("post", "/api/ThisNews", true)
            request1.setRequestHeader("Content-Type", "application/json");
            request1.addEventListener("load", function () {
                var div = document.createElement('div')
                let ThisNews = JSON.parse(request1.response);
                console.log(ThisNews);
                let isPerm=false
                for (let i = 0; i < news.permissionsList.length; i++) {
                    if (news.permissionsList[i] === 'GIVE')
                        isPerm=true
                }
                div.id ="news"+ listValue
                div.className="row"
                div.innerHTML = `
                <hr>
                <div class="col-lg-7">
                    <div class="sn-container">
                        <div class="single-img">
                            <img class="single-img"  src="/${news.news[i].postUrl}">
                        </div>
                        <div class="sn-content">
                            <h1 class="sn-title">
                                ${news.news[i].title}
                                ${isPerm 
                                    ? `<a style="text-decoration: none;" href="/news/edit/${news.news[i].id}">
                                        <button type="button" class="btn btn-dark">&#9998;</button>
                                    </a>` 
                                    : ``
                                }
                            </h1>
                            <pre>${news.news[i].post_text}</pre>
                            <div class="block_addition">
                                ${news.isAuth 
                                    ? `<form name="registerForm">
                                        <input type="hidden" name="userId" value="${news.user.id}">
                                        <input type="hidden" name="newsId" value="${news.news[i].id}">
                                        ${ThisNews.isLike 
                                            ? `<button id="submitLike" class="btn btn-success" type="submit">Нравится&nbsp;&nbsp; ${news.news[i].likes}</button>` 
                                            : `<button id="submitLike" class="btn btn-danger" type="submit">Нравится&nbsp;&nbsp; ${news.news[i].likes}</button>`
                                        }
                                    </form>
                                    <form name="Watch" style="margin-left: 500px;">
                                        <input type="hidden" name="userId" value="${news.user.id}">
                                        <input type="hidden" name="newsId" value="${news.news[i].id}">
                                        ${
                                            ThisNews.isSave 
                                            ? `<button id="WatchLater" class="btn btn-warning" type="submit">Убрать из избранного</button>` 
                                            : `<button id="WatchLater" class="btn btn-info" type="submit">Добавить в избранное</button>`}
                                    </form>`
                                    : `<h4><font color="green">${news.news[i].likes} "Нравится"</font></h4>`
                                }
                            </div><br>
                            <input type="hidden" id="views" value="${ThisNews.views}">
                            <h4 class="timer"><font color="gray">${ThisNews.views} "Просмотров"</font></h4>
                            <input type="hidden" id="newsId" value="${news.news[i].id}">
                            <br>
                        </div>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="sidebar">
                        <div class="sidebar-widget">    
                            <div class="coment-bottom bg-white p-2 px-4 comment_list_1">
                                <h3>Комментарии</h3>
                                ${news.isAuth 
                                    ? `<font color='red' id="error"></font>
                                    <form name="NewComment">
                                        <input type="hidden" name="userId" value="${news.user.id}">
                                        <input type="hidden" name="newsId" value="${news.news[i].id}">
                                        <div class="d-flex flex-row add-comment-section mt-4 mb-4">
                                        ${
                                            news.user.avatarURL 
                                            ? `<img class="img-fluid img-responsive rounded-circle mr-2" src="/${news.user.avatarURL}" style="width: 50px; height: 50px;">` 
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
                                
                                <div id="EditComment"></div>
                                <div id="ListComments0"></div>
                                <div id="ShowComments" value="${news.news[i].id}"></div>
                                
                            </div>
                        </div>
                        
                    </div>
                    
                </div>`
                listValue++;
                a.appendChild(div)
            })
            request1.send(newsId);
        }
    });
    
    request.send(categoryId);
})