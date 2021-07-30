let count = 0
function addComment(newsId, e){
    e.preventDefault();
    let registerForm = document.forms["NewComment"+newsId];
    let userId = registerForm.elements["userId"].value;
    let comment = registerForm.elements["comments"].value;
    let save = JSON.stringify({userId: userId, newsId: newsId, comment: comment});

    let request = new XMLHttpRequest();

    request.open("POST", "/news/newComment", true);   

    request.setRequestHeader("Content-Type", "application/json");

    request.addEventListener("load", function () {

        let receivedUser = JSON.parse(request.response);
        
        if(receivedUser.error){
            let a = document.getElementById('error'+newsId)
            a.innerHTML = receivedUser.error
        }
        else{
            let error = document.getElementById('error'+newsId)
            error.innerHTML = ""
            let a = document.getElementById(`ListComments`+newsId)
            var div = document.createElement('div')
            div.className="commented-section mt-2"
            count++;
            div.id = `comment${countComments}`
            div.innerHTML =  `
                <div class="bg-white p-2">
                    <div class="d-flex flex-row user-info">
                    ${receivedUser.user.avatarURL 
                        ? `<img id="UserAvatar" class="rounded-circle comment-user-img" src="/${receivedUser.user.avatarURL}">` 
                        : `<img id="UserAvatar" class="rounded-circle comment-user-img" src="/images/no_avatar.png">`}
                        
                        <div class="d-flex flex-column justify-content-start ml-2">
                            <span class="d-block font-weight-bold name">${receivedUser.user.name}</span>
                            <span class="date text-black-50">${receivedUser.comment.date}</span>
                        </div>
                        <form></form>
                        <form name="editComment${countComments}">
                            <input type="hidden" id="commentId${countComments}" name="id" value="${receivedUser.comment.id}">
                            <input type="hidden" id="ThisComment${countComments}" name="comment" value="${receivedUser.comment.comment}">
                            <button id='Editcom${countComments}' onclick="editComment(${countComments}, event)" type="submit" class="btn btn-dark Edit-comment">&#9998;</button>
                        </form>
                        <form name="DeleteComment${countComments}">
                            <input id="commentId${countComments}" type="hidden" value="${receivedUser.comment.id}">
                            <button onclick="DelComment(${countComments}, event)" id="DelComm${countComments}" type="submit" class="btn btn-danger"><i class="fas fa-trash"></i></button>
                        </form>
                    </div>
                    <div class="mt-2">
                        <p class="comment-text" >${receivedUser.comment.comment}</p>
                    </div>
                    <hr>
                </div>`
            a.prepend(div)
            let texrow = document.getElementById('texrow'+newsId)
            texrow.value = ''
            countComments++
            if(!receivedUser.user.avatarURL){
                let av = document.getElementById('UserAvatar')
                av.src = "../../images/no_avatar.png"
            }
        }
    });
    request.send(save);
}