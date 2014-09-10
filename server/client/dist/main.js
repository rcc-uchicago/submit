//-----------------------------------------------------------------------------
// Host and port configuration
var host = '128.135.17.84'  // midway-login2 is 128.135.112.72
var port = 8001
//-----------------------------------------------------------------------------

function validateFields() { // Validate form fields
  var msg = document.getElementById('msg');
  var first = document.getElementById("firstname").value.match(/^[a-zA-Z]+$/);
  var last = document.getElementById("lastname").value.match(/^[a-zA-Z]+$/);
  if (first && last) {
    return true;
  } else {
    msg.style.color = "red";
    msg.innerHTML = "Form fields must be filled and contain only letters";
    return false;
  }
};

function validateFile(File) { // Validate uploaded file
  var msg = document.getElementById('msg');
  if (File.name.match('\.csv$')) {
    len = rows.length;
    for (var i = 0; i < len; i++) {
      if (!rows[i].match(/[0-9]/) || rows[i].match(/[a-zA-Z]/)) {
        valid = 0;
        return false;
      	
      }
    }
    valid = 1;
    return true;
  }
  msg.style.color = "red";
  msg.innerHTML = "Files must have .csv extension.";
  valid = 0;
  return false;
};

function handleFileSelect(evt) { // Display uploaded file description
  var list = document.getElementById('list');
  var f = evt.target.files[0];
  var output = [];
  output.push('<li class="list-group-item"><strong>', 
    escape(f.name), 
    '</strong> (', 
    f.type || 'n/a', 
    ') - ',
    f.size, 
    ' bytes, last modified: ', 
    f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
    '</li>');
  list.innerHTML = '<ul class="list-group">' + output.join('') + '</ul>';
  list.style.display = 'block';
};

function handleDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
};

function sendForm() { // Send form data to server
  var formData = new FormData();
  var fname = document.getElementById("firstname").value;
  var lname = document.getElementById("lastname").value;
  var upload = document.getElementById("files").files[0];
  formData.append("fname", fname);
  formData.append("lname", lname);
  formData.append("upload", upload);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://"+host+":"+port+"/submit", true);
  xhr.onload = function(e) {
    if (this.status==200) { console.log("Form sent!"); }
  };
  xhr.send(formData);
};

function load() { // When file is uploaded, display file info and validate
  var reader;
  var File = this.files[0];
  var msg = document.getElementById('msg');
  var badfile = document.getElementById('badfile');
  filename.textContent = File.name;
  reader = new FileReader();
  reader.onload = function(file) {
    rows = [];
    this.result.split('\n').map(function(row) {
      var entry = row.split(',')[2];
      if (entry) {
        rows.push(entry);
      }
    });
    document.getElementById('data').innerHTML = rows;
    document.getElementById('badfile').innerHTML = "";
    if (validateFile(File)) {
      msg.style.color = "green";
      msg.innerHTML = "Valid.";
    } else {
      msg.style.color = "red";
      msg.innerHTML = "Third column of files can only contain numbers.";
      badfile.style.color = "red";
      badfile.innerHTML = "Please fix the following file: " + File.name;
      return;
    }
  };
  reader.readAsText(File);
};

function clearFileInput() { // Create new file input element
  var oldInput = document.getElementById("files");
  var newInput = document.createElement("input");
  newInput.type = "file";
  newInput.id = oldInput.id;
  newInput.name = oldInput.name;
  newInput.className = oldInput.className;
  newInput.style.cssText = oldInput.style.cssText;
  newInput.addEventListener('change', handleFileSelect);
  newInput.addEventListener('change', load);
  oldInput.parentNode.replaceChild(newInput, oldInput);
};

function submitFunc() { // Submit button
  var msg = document.getElementById('msg');
  var badfile = document.getElementById('badfile');
  if (validateFields() && valid === 1) {
    sendForm();
    msg.style.color = "green";		
    msg.innerHTML = "Submitted!";
    badfile.innerHTML = "";
    valid = 0;
  } else {
    msg.style.color = "red";		
    msg.innerHTML = "Submission failed!";
    badfile.style.color = "red";
    badfile.innerHTML = "Please make sure name fields are filled in and files are valid.";
  }
};

function resetFunc() { // Reset button
  rows = [];
  valid = 0;
  document.getElementById("submit").innerHTML = "Submit"
  document.getElementById("firstname").value = "";
  document.getElementById("lastname").value = "";
  document.getElementById("list").style.display = 'none';
  document.getElementById('msg').style.color = "#777";
  document.getElementById('msg').innerHTML = "Validation message here";
  document.getElementById('badfile').innerHTML = "";
  document.getElementById("data").innerHTML = "";
  document.getElementById("filename").innerHTML = "";
  clearFileInput();
};

(function () {
  var rows = [];
  var valid = 0;
  files.addEventListener('change', load);
  var dropZone = document.getElementById('drop_zone'); // Setup the drag&drop listeners.
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);
  document.getElementById('files').addEventListener('change', handleFileSelect, false);
}).call(this);
