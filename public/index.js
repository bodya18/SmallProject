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
    <select class="js-example-basic-multiple" style="width: 200px; max-height: 30px;" data-placeholder="Выберите соцсеть">
        <option></option>
        <option>Vk</option>
        <option>Telegram</option>
        <option>Github</option>
        <option>Twitter</option>
        <option>Instagram</option>
        <option>Facebook</option>
    </select>
    <input class="form-control" placeholder="Ссылка" style="width:200px; height: 30px; margin-left: 30px">
    <button class="btn btn-danger" type="button" style="max-height: 30px; margin-left: 40px" onclick="delInput(${x})">-</button>
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