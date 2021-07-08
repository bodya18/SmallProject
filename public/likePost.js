// document.getElementById("submitLike").addEventListener("click", function (e) {
    function likePost(newsId, e){
        e.preventDefault();
        let registerForm = document.forms["registerForm"+newsId];
        let userId = registerForm.elements["userId"].value;
        // let newsId = registerForm.elements["newsId"].value;
    
        let like = JSON.stringify({userId: userId, newsId: newsId});
    
        let request = new XMLHttpRequest();
    
        request.open("POST", "/news/like", true);   
    
        request.setRequestHeader("Content-Type", "application/json");
    
        request.addEventListener("load", function () {
    
            let receivedUser = JSON.parse(request.response);
    
            let a = document.getElementById('submitLike'+newsId)
            if(receivedUser.isLike){
                a.innerHTML = `Нравится&nbsp;&nbsp; ${receivedUser.likes}`
                a.classList.remove('btn-danger')
                a.classList.add('btn-success')
            }
            else{
                a.innerHTML = `Нравится&nbsp;&nbsp; ${receivedUser.likes}`
                a.classList.remove('btn-success')
                a.classList.add('btn-danger')
            }
               
        });
        request.send(like);
    }
// });