function DelComment(id){
    console.log(document.getElementById(`DelComm${id}`));
    addEventListener("click", function (e) {
        e.preventDefault();
        let registerForm = document.forms["DeleteComment"+id];
        let commentId = registerForm.elements["commentId"+id].value;

        let like = JSON.stringify({commentId: commentId});
    
        let request = new XMLHttpRequest();
    
        request.open("POST", "/news/deleteComment", true);   
    
        request.setRequestHeader("Content-Type", "application/json");
    
        request.addEventListener("load", function () {
    
            var div = document.getElementById(`comment${id}`);
            div.remove();
               
        });
        request.send(like);
    });
}