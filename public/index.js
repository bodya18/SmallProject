$(document).ready(function() {
    $('.js-example-basic-multiple').select2();
});

let x = 1;
function addInput() {
	if (x < 6) {

    var profile = document.getElementById('block');
    var div = document.createElement('div');
    div.className = 'block_addition'
    div.id = 'input' + ++x;
    div.innerHTML = `
    <select name="netw" class="form-select add-input">
        <option></option>
        <option {{netw.vk}}>Vk</option>
        <option {{netw.telegram}}>Telegram</option>
        <option {{netw.GitHub}}>Github</option>
        <option {{netw.twitter}}>Twitter</option>
        <option {{netw.instagram}}>Instagram</option>
        <option {{netw.facebook}}>Facebook</option>
    </select>
    <input class="form-control edit-input-link" placeholder="Ссылка"  name="link">
    <button class="btn btn-danger del-input" type="button" onclick="delInput(${x})">-</button>
    <hr class="my-4">
    `;
    profile.appendChild(div);
  } 
}

function delInput(y) {
    var div = document.getElementById(`input${y}`);
    div.remove();
    --x;
}

function sub(e){
    e.preventDefault();

    const form = document.forms['subscribe'];
    const email = form.elements["userEmail"].value

    let request = new XMLHttpRequest();

    request.open("post", "/subscribe", true)

    request.setRequestHeader("Content-Type", "application/json");

    request.addEventListener("load", function () {
        const error = JSON.parse(request.response)
        if(error){
            document.getElementById('goodSub').innerHTML = ''
            document.getElementById('errorSub').innerHTML = error.error
        }else{
            document.getElementById('errorSub').innerHTML = ''
            document.getElementById('goodSub').innerHTML = 'Вы успешно подписались на рассылку'
        }
        form.elements["userEmail"].value = ''
    })

    request.send(JSON.stringify({email: email}))
}