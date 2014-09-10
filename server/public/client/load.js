var $ = function (id) { return document.getElementById(id) };

function load() {
    var File = this.files[0];
    /*
    var reader = new FileReader();
    reader.onload = function(file) {
        reader.readAsText(File);
    };
    */
    $('inputFile').textContent = File.name;
};

$('chooser').addEventListener('change', load);
$('inputFile').addEventListener('click', function (e) {
  chooser.click();
  e.preventDefault(); // prevent navigation to "#"
}, false);
