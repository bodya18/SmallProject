
// const Del = document.getElementById("DelComm")
// Del.addEventListener("click", function (e) {
//     e.preventDefault();

//     let registerForm = document.forms["DeleteComment"];
//     let commentId = registerForm.elements["commentId"].value;

//     let like = JSON.stringify({commentId: commentId});

//     let request = new XMLHttpRequest();

//     request.open("POST", "/news/deleteComment", true);   

//     request.setRequestHeader("Content-Type", "application/json");

//     request.addEventListener("load", function () {

//         let receivedUser = JSON.parse(request.response);
//         console.log(receivedUser);
           
//     });
//     request.send(like);
// });