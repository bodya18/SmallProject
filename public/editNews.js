addEventListener('load', ()=>{
    let div = document.querySelector('.ck.ck-editor__editable_inline>:last-child')
    let a = document.getElementById('edit_post_text').value
    div.insertAdjacentHTML('beforeend', a)
    // let p = document.createElement('p')
    // p.className = '.ck.ck-editor__editable_inline>:last-child'
    div.insertAdjacentHTML('beforeend', '<p>dfasdsds</p>')
})
