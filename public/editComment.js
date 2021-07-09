let x1 = 0

function editComment(id, e){
    e.preventDefault();
    if(x1 === 0){
        let registerForm = document.forms["editComment"+id];
        let commentId = registerForm.elements["commentId"+id].value;
        let comment = registerForm.elements["ThisComment"+id].value;
        let commentDiv = document.getElementById(`comment${id}`);
        let request = new XMLHttpRequest();

        request.open("post", "/api/UserSession", true)

        request.setRequestHeader("Content-Type", "application/json");

        request.addEventListener("load", function () {
            let user = JSON.parse(request.response)
            if(!user.user.avatarURL)
                user.user.avatarURL='images/no_avatar.png'
            commentDiv.innerHTML = `
            <font id="errorEdit" color="red"></font>
            <form name="editThisComm">
                <div class="d-flex flex-row add-comment-section mt-4 mb-4">
                    <img class="img-fluid img-responsive rounded-circle mr-2" src="../../${user.user.avatarURL}" style="width: 50px; height: 50px;">
                    <textarea id="texrow${commentId}" name="comment" type="text" class="form-control mr-3" placeholder="Редактировать комментарий" rows="4" maxlength="1000" minlength="1">${comment}</textarea>   
                    <button id="EditComentThis" onclick="editThisComment(${commentId}, ${id}, event)" class="btn btn-primary" type="submit" style="width: auto; height: 50px;">
                        Редактировать
                    </button>
                </div>
            </form>
            <hr>
        `;
        id = undefined
        })
        request.send()
        x1++
    }
}

function editThisComment(id, idd, e){
    e.preventDefault();
    let comment = document.getElementById(`texrow${id}`).value;
    
    let commentDiv = document.getElementById(`comment${idd}`);
    let request = new XMLHttpRequest();

    request.open("post", `/news/EditComment/${id}`, true)
    let data = JSON.stringify({comment: comment})
    request.setRequestHeader("Content-Type", "application/json");

    request.addEventListener("load", function () {
        let receivedUser = JSON.parse(request.response);
        if(receivedUser.error){
            let a = document.getElementById('errorEdit')
            a.innerHTML = receivedUser.error
        }
        else{
            x1--
            console.log(receivedUser);
            let error = document.getElementById('error'+receivedUser.comment.newsId)
            error.innerHTML = ""
            commentDiv.innerHTML = `
            <div id="ListComments${newsId}"></div>
            <div class="commented-section mt-2" id="comment${countComments}">
                <div class="bg-white p-2">
                    <div class="d-flex flex-row user-info">
                        <img id="UserAvatar" class="rounded-circle" src="/${receivedUser.user.avatarURL}" style="width: 50px; height: 50px;">
                        <div class="d-flex flex-column justify-content-start ml-2">
                            <span class="d-block font-weight-bold name">${receivedUser.user.name}</span>
                            <span class="date text-black-50">${receivedUser.comment.date}</span>
                        </div>
                        <form></form>
                        <form name="editComment${countComments}">
                            <input type="hidden" id="commentId${countComments}" name="id" value="${receivedUser.comment.id}">
                            <input type="hidden" id="ThisComment${countComments}" name="comment" value="${receivedUser.comment.comment}">
                            <button id='Editcom${countComments}' onclick="editComment(${countComments}, event)" style="margin-left:154px; margin-right: 20px;" type="submit" class="btn btn-dark">Редактировать</button>
                        </form>
                        <form name="DeleteComment${countComments}">
                            <input id="commentId${countComments}" type="hidden" value="${receivedUser.comment.id}">
                            <button onclick="DelComment(${countComments}, event)" id="DelComm${countComments}" type="submit" class="btn btn-danger">Удалить</button>
                        </form>
                    </div>
                    <div class="mt-2">
                        <p class="comment-text">${receivedUser.comment.comment}</p>
                    </div>
                    <hr>
                </div>
            </div>`
            countComments++
            id = idd = undefined
        }
    })
    request.send(data)
}