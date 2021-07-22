document.getElementById('create_news').addEventListener('click', ()=>{
    let a = ckEditor("tbxQuestion").getData()
    const post_text = JSON.stringify({post_text: a})
    setTimeout(() => {
        let request = new XMLHttpRequest();
        request.open("post", "/news/newPost", true)

        request.setRequestHeader("Content-Type", "application/json");

        request.send(post_text)
    }, 100);
 })
