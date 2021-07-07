const id = document.getElementById("ShowComments").getAttribute('value')

let countComments = 0;

let request = new XMLHttpRequest();
let newsId = JSON.stringify({id: id});

request.open("post", "/api/comments", true)

request.setRequestHeader("Content-Type", "application/json");

request.addEventListener("load", function () {
    let session = JSON.parse(request.response);
    let a = document.getElementById(`ShowComments`)
    
    // if(!session.comments.length<100){

    // }
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
                        for (let k = 0; k < session.permissionsList.length; k++) {
                            if(session.permissionsList[k] === 'GIVE')
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
                        }
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
        a.appendChild(div)
        countComments++;
    }
});

request.send(newsId);
