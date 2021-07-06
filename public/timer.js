const interval = setInterval(() => {
    let newsId = document.getElementById('newsId').value; 
    let views = JSON.stringify({newsId: newsId});

    let request = new XMLHttpRequest();

    request.open("POST", "/news/SetViews", true);   

    request.setRequestHeader("Content-Type", "application/json");

    request.addEventListener("load", function () {
        document.querySelector('.timer').innerHTML = `<font color="gray">${request.response} "Просмотров"</font>`
    });
    request.send(views);

    clearInterval(interval);
}, 30000);