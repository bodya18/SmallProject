ClassicEditor
    .create( document.querySelector( '#editor' ), {
        toolbar: ['heading', '|', 'bold', 'italic', 'bulletedList', 'numberedList', 'blockQuote', 'link', 'mediaEmbed' , 'insertTable', 'undo', 'redo'],
        heading: {
            options: [
                { model: 'paragraph', title: 'Параграф' },
                { model: 'heading2', view: 'h2', title: 'Заголовок 2' },
                { model: 'heading3', view: 'h3', title: 'Заголовок 3' },
                { model: 'heading4', view: 'h4', title: 'Заголовок 4' },
                { model: 'heading5', view: 'h5', title: 'Заголовок 5' }
            ]
        }
    } )
    .then( editor => {
        window.editor = editor;
    } )
    .catch( err => {
        console.error(err.stack);
    } );