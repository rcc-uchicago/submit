var host = "localhost";
var port = "8001";
var url = "https://" + host + ":" + port + "/submit"
var $ = function (id) { return document.getElementById(id) };

function formData() {
    var data = new FormData();
    var meta = {
        first: firstName.value,
        last:  lastName.value
    };
    // data.append("meta", meta);
    data.append("first", firstName.value);
    data.append("file", chooser.files[0]);
    return data;
};
    
function send(data) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.onload = function (e) {
        if (this.status==200) {
            console.log("Form sent!");
        }
    };
    xhr.send(data);
};

function submit() { 
    send(formData());
}

$("submit").addEventListener('click', submit);

