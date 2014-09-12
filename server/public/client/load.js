var $ = function (id) { return document.getElementById(id) };

function load(files) {
    var File = files[0];
    $('inputFile').textContent = File.name;

    /* OPTIONALLY READ AND VALIDATE FILE CONTENT
    var reader = new FileReader();
    reader.onload = function(file) {
        text = this.result     // FILE CONTENT (UTF-8 STRING)
        validate(text)
    };
    reader.readAsText(File);
    */
};


// Set `inputFile` as button triggering file chooser
$('inputFile').addEventListener('click', function (e) {
    chooser.click();
    e.preventDefault(); // prevent navigation to "#"
}, false);


// Set `window` as drag-n-drop zone
window.addEventListener('dragover', dragover, false);
window.addEventListener('drop', drop, false);

function dragover(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
}

function drop(e) {
    e.stopPropagation();
    e.preventDefault();
    load(e.dataTransfer.files);
}
