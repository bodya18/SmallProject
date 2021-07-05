let x1 = 0
function editComment(id){
    addEventListener("click", function (e) {
        e.preventDefault();
        if(x1 === 0){
            let registerForm = document.forms["editComment"+id];
            let commentId = registerForm.elements["commentId"+id].value;
            let comment = registerForm.elements["ThisComment"+id].value;
            var commentDiv = document.getElementById(`comment${id}`);

            commentDiv.innerHTML = `
                <form action="/news/EditComment/${commentId}" method="POST">
                    <div class="d-flex flex-row add-comment-section mt-4 mb-4">
                        <img class="img-fluid img-responsive rounded-circle mr-2" src="../../images/no_avatar.png" style="width: 50px; height: 50px;">
                        <textarea id="texrow" name="comment" type="text" class="form-control mr-3" placeholder="Добавить комментарий" rows="4" maxlength="1000" minlength="1">${comment}</textarea>   
                        <button class="btn btn-primary" type="submit" style="width: auto; height: 50px;">
                            Редактировать
                        </button>
                    </div>
                </form>
            `;
            x1++
        }
    });
}