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
    <select name="netw" class="form-select" style="width: 187px; max-height: 30px; padding-top: 1px;">
        <option></option>
        <option {{netw.vk}}>Vk</option>
        <option {{netw.telegram}}>Telegram</option>
        <option {{netw.GitHub}}>Github</option>
        <option {{netw.twitter}}>Twitter</option>
        <option {{netw.instagram}}>Instagram</option>
        <option {{netw.facebook}}>Facebook</option>
    </select>
    <input class="form-control" placeholder="Ссылка" style="width:200px; height: 30px; margin-left: 30px" name="link">
    <button class="btn btn-danger" type="button" style="height: 30px; width:35px; margin-left: 40px" onclick="delInput(${x})">-</button>
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