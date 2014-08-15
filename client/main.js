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
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);

function handleDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

// Setup the dnd listeners.
var dropZone = document.getElementById('drop_zone');
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);

var elem = document.getElementById('files');
elem.value = "Ricardo";

//---------------------------------------------------------------------

function sendForm() {
  var formData = new FormData();
  var fname = document.getElementById("firstname").value;
  var lname = document.getElementById("lastname").value;
  var upload0 = document.getElementById("files").files[0];
  var upload1 = document.getElementById("files").files[1];
  var upload2 = document.getElementById("files").files[2];

  formData.append("fname", fname);
  formData.append("lname", lname);
  formData.append("upload0", upload0);
  formData.append("upload1", upload1);
  formData.append("upload2", upload2);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8000/api/post", true);
  xhr.onload = function(e) {
    if (this.status==200) {
      console.log("Form sent!");
    }
  };
  xhr.send(formData);
};


function submitFunc() {
  document.getElementById("submit").innerHTML = "Submitted!"
  document.getElementById("submit").disabled = true;
  sendForm();
};

function resetFunc() {
  document.getElementById("file").innerHTML = "Click here to upload";
  document.getElementById("submit").innerHTML = "Submit"
  document.getElementById("submit").disabled = false;
  document.getElementById("firstname").value = "";
  document.getElementById("lastname").value = "";
};
