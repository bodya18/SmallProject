document.getElementById("WatchLater").addEventListener("click", function (e) {
    e.preventDefault();
    let registerForm = document.forms["Watch"];
    let userId = registerForm.elements["userId"].value;
    let newsId = registerForm.elements["newsId"].value;

    let save = JSON.stringify({userId: userId, newsId: newsId});

    let request = new XMLHttpRequest();

    request.open("POST", "/news/watchLater", true);   

    request.setRequestHeader("Content-Type", "application/json");

    request.addEventListener("load", function () {

        let receivedUser = JSON.parse(request.response);

        let a = document.getElementById('WatchLater')
        if(receivedUser.isSave){
            a.innerHTML = `Добавить в избранное`
            a.classList.remove('btn-warning')
            a.classList.add('btn-info')
        }
        else{
            a.innerHTML = `Убрать из избранного`
            a.classList.remove('btn-info')
            a.classList.add('btn-warning')
        }
           
    });
    request.send(save);
});