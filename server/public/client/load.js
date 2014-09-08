var $ = function (id) { return document.getElementById(id) };

function load() {
    var File = this.files[0];
    var reader = new FileReader();
    reader.onload = function(file) {
        window.rows = [];
        this.result.split('\n').map(function(row) {
            var line = row.split(',');
            window.rows.push(line);
        });
        reader.readAsText(File);
    };
    inputFile.textContent = File.name;
};

chooser.addEventListener('change', load);
inputFile.addEventListener('click', function (e) {
  chooser.click() 
  e.preventDefault(); // prevent navigation to "#"
}, false);
