let count = 0
document.getElementById("comment").addEventListener("click", function (e) {
    e.preventDefault();
    let registerForm = document.forms["NewComment"];
    let userId = registerForm.elements["userId"].value;
    let newsId = registerForm.elements["newsId"].value;
    let comment = registerForm.elements["comments"].value;
    let save = JSON.stringify({userId: userId, newsId: newsId, comment: comment});

    let request = new XMLHttpRequest();

    request.open("POST", "/news/newComment", true);   

    request.setRequestHeader("Content-Type", "application/json");

    request.addEventListener("load", function () {

        let receivedUser = JSON.parse(request.response);
        
        if(receivedUser.error){
            let a = document.getElementById('error')
            a.innerHTML = receivedUser.error
        }
        else{
            let error = document.getElementById('error')
            error.innerHTML = ""
            let a = document.getElementById('ListComments'+count)
            count++;
            a.innerHTML = `
            <div id="ListComments${count}"></div>
            <div class="commented-section mt-2">
                <div class="bg-white p-2">
                    <div class="d-flex flex-row user-info">
                        <img id="UserAvatar" class="rounded-circle" src="/${receivedUser.user.avatarURL}" style="width: 50px; height: 50px;">
                        <div class="d-flex flex-column justify-content-start ml-2">
                            <span class="d-block font-weight-bold name">${receivedUser.user.name}</span>
                            <span class="date text-black-50">${receivedUser.comment.date}</span>
                        </div>
                        <form action="/news/EditComment" method="POST">
                            <input type="hidden" name="id" value="${receivedUser.comment.id}">
                            <input type="hidden" name="comment" value="${receivedUser.comment.comment}">
                            <button style="margin-left:400px; margin-right: 20px;" type="submit" class="btn btn-dark">Редактировать</button>
                        </form>
                        <form name="DeleteComment">
                            <input type="hidden" name="commentId" value="${receivedUser.comment.id}">
                            <button id="DelComm" type="submit" class="btn btn-danger">Удалить</button>
                        </form>
                    </div>
                    <div class="mt-2">
                        <p class="comment-text">${receivedUser.comment.comment}</p>
                    </div>
                </div>
            </div><hr>`
            let texrow = document.getElementById('texrow')
            texrow.value = ''
            if(!receivedUser.user.avatarURL){
                let av = document.getElementById('UserAvatar')
                av.src = "../../images/no_avatar.png"
            }
        }
    });
    request.send(save);
});