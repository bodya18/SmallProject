// const ckEditorClassicOptions = {
//     toolbar: ['heading', '|', 'bold', 'italic', 'bulletedList', 'numberedList', 'blockQuote', 'link', 'insertTable', 'undo', 'redo'],
//     heading: {
//         options: [
//             { model: 'paragraph', title: 'Параграф' },
//             //{ model: 'heading1', view: 'h1', title: 'Heading 1' },
//             { model: 'heading2', view: 'h2', title: 'Заголовок 2' },
//             { model: 'heading3', view: 'h3', title: 'Заголовок 3' },
//             { model: 'heading4', view: 'h4', title: 'Заголовок 4' },
//             { model: 'heading5', view: 'h5', title: 'Заголовок 5' }
//         ]
//     }
// };

// const ckEditorClassicOptionsMin = {
//     toolbar: ['bold', 'italic']
// };

// var allCkEditors = [];
// $(document).ready(function() {
//     // Initialize All CKEditors
//     allCkEditors = [];

//     var allHtmlElements = document.querySelectorAll('.ck-classic');
//     for (var i = 0; i < allHtmlElements.length; ++i) {
//         ClassicEditor
//             .create(allHtmlElements[i], ckEditorClassicOptions)
//             .then(editor => {
//                 allCkEditors.push(editor);                
//             })
//             .catch(error => {
//                 console.error(error);
//             });
//     }

//     allHtmlElements = document.querySelectorAll('.ck-classic-min');
//     for (var j = 0; j < allHtmlElements.length; ++j) {
//         ClassicEditor
//             .create(allHtmlElements[j], ckEditorClassicOptionsMin)
//             .then(editor => {
//                 allCkEditors.push(editor);
//             })
//             .catch(error => {
//                 console.error(error);
//             });
//     }

// });

// function ckEditor(name) {
//     for (var i = 0; i < allCkEditors.length; i++) {
//         if (allCkEditors[i].sourceElement.name === name) return allCkEditors[i];
//     }
//     return null;
// }

ClassicEditor
    .create( document.querySelector( '#editor' ), {
        toolbar: ['heading', '|', 'bold', 'italic', 'bulletedList', 'numberedList', 'blockQuote', 'link', 'mediaEmbed' , 'insertTable', 'undo', 'redo'],
        // toolbar: ["selectAll", "undo", "redo", "bold", "italic", "blockQuote", "link", "ckfinder", "uploadImage", "imageUpload", "heading", "imageTextAlternative", "toggleImageCaption", "imageStyle:inline", "imageStyle:alignLeft", "imageStyle:alignRight", "imageStyle:alignCenter", "imageStyle:alignBlockLeft", "imageStyle:alignBlockRight", "imageStyle:block", "imageStyle:side", "imageStyle:wrapText", "imageStyle:breakText", "indent", "outdent", "numberedList", "bulletedList", "mediaEmbed", "insertTable", "tableColumn", "tableRow", "mergeTableCells"],
        heading: {
            options: [
                { model: 'paragraph', title: 'Параграф' },
                //{ model: 'heading1', view: 'h1', title: 'Heading 1' },
                { model: 'heading2', view: 'h2', title: 'Заголовок 2' },
                { model: 'heading3', view: 'h3', title: 'Заголовок 3' },
                { model: 'heading4', view: 'h4', title: 'Заголовок 4' },
                { model: 'heading5', view: 'h5', title: 'Заголовок 5' }
            ]
        }
    } )
    .then( editor => {
        window.editor = editor;
        // console.log( Array.from( editor.ui.componentFactory.names() ) );
    } )
    .catch( err => {
        console.error(err.stack);
    } );