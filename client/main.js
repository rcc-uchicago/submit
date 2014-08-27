
//-----------------------------------------------------------------------------
// Host and port configuration
var host = "127.0.0.1"  // default is localhost; midway-login2 is 128.135.112.72
var port = "8001"
//-----------------------------------------------------------------------------

window.rows = [];

function validateFile() {
	arraylen = window.rows.length;
	for (var i = 0; i < arraylen-1; i++) {
		if (window.rows[i] == "") {
			data.textContent = "OOPS";
			continue;
		}
		if (window.rows[i].match(/[0-9]/)) {
			continue;
		} else {
			return false;
		}
	}
	return true;
};

(function () {
  function load() {
    var Files, File, reader;
    //Files = this.files;
    //for (var i = 0; i < Files.length; i++) {
    	File = this.files; //Files[i];
		  if (!File.name.match('\.csv$')) {
		   	document.getElementById('msg').style.color = "red";
		  	document.getElementById('msg').innerHTML = "Files must be .csv";
		    return;
		  };
		  filename.textContent = File.name; //changed from file
		  reader = new FileReader();
		  reader.onload = function(file) {
		  	window.rows = [];
		    this.result.split('\n').map(function(row) {
		      var line = row.split(',');
		      window.rows.push(line[2]);
		    });
  		document.getElementById('data').innerHTML = window.rows;
		  };
		  reader.readAsText(File);
		//};
  };
  files.addEventListener('change', load);
}).call(this);



function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object
  // files is a FileList of File objects. List some properties.
  var output = [];
  for (var i = 0, f; f = files[i]; i++) {
    output.push('<li class="list-group-item"><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                f.size, ' bytes, last modified: ',
                f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                '</li>');
  }
  document.getElementById('list').innerHTML = '<ul class="list-group">' + output.join('') + '</ul>';
  document.getElementById("list").style.display = 'block';
};

document.getElementById('files').addEventListener('change', handleFileSelect, false);

function handleDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
};

// Setup the dnd listeners.
var dropZone = document.getElementById('drop_zone');
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);

var elem = document.getElementById('files');
elem.value = "Ricardo";

//---------------------------------------------------------------------------------
function sendForm() {
  var formData = new FormData();
  var fname = document.getElementById("firstname").value;
  var lname = document.getElementById("lastname").value;
  var upload0 = document.getElementById("files").files[0];
  var upload1 = document.getElementById("files").files[1];
  var upload2 = document.getElementById("files").files[2];
  var upload3 = document.getElementById("files").files[3];
  var upload4 = document.getElementById("files").files[4];
  
  formData.append("fname", fname);
  formData.append("lname", lname);
  formData.append("upload0", upload0);
  formData.append("upload1", upload1);
  formData.append("upload2", upload2);
  formData.append("upload3", upload3);
  formData.append("upload4", upload4);
  
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://"+host+":"+port+"/submit", true);
  xhr.onload = function(e) {
    if (this.status==200) {
      console.log("Form sent!");
    }
  };
  xhr.send(formData);
};

function clearFileInput() { //creates new file input element
  var oldInput = document.getElementById("files");
  var newInput = document.createElement("input");
  
  newInput.type = "file";
  newInput.id = oldInput.id;
  newInput.name = oldInput.name;
  newInput.className = oldInput.className;
  newInput.style.cssText = oldInput.style.cssText;
  newInput.multiple = oldInput.multiple;
  newInput.addEventListener('change', handleFileSelect, false);
  oldInput.parentNode.replaceChild(newInput, oldInput);
};

function submitFunc() {
  document.getElementById("submit").innerHTML = "Submitted!"
  document.getElementById("submit").disabled = true;
  document.getElementById("reset").disabled = false;
  if (validateFile()) {
   	document.getElementById('msg').style.color = "green";
		document.getElementById('msg').innerHTML = "File(s) is valid";
  	sendForm();
  } else {
  	document.getElementById('msg').style.color = "red";
		document.getElementById('msg').innerHTML = "Third column can only be non-negative integer";
	}
};

function resetFunc() {
  document.getElementById("submit").innerHTML = "Submit"
  document.getElementById("submit").disabled = false;
  document.getElementById("reset").disabled = true;
  document.getElementById("firstname").value = "";
  document.getElementById("lastname").value = "";
  document.getElementById("list").style.display = 'none';
  window.rows = [];
 	document.getElementById('msg').style.color = "#777";
  document.getElementById('msg').innerHTML = "Validation message here";
  document.getElementById("data").innerHTML = "";
  document.getElementById("filename").innerHTML = "";
  clearFileInput();
};

