var $ = function (id) { return document.getElementById(id) };

function send() {
    var data = new FormData();
    var meta = {
        first: firstName.value,
        last:  lastName.value
    };
    // data.append("meta", meta);
    data.append("first", firstName.value);
    data.append("last", lastName.value);
    data.append("file", chooser.files[0]);
    console.log(chooser.files[0]);
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/submit', true);
    xhr.onload = function (e) {
        if (this.status == 200) {
            console.log("Form sent!");
        }
    };
    xhr.send(data);
};


$("submit").addEventListener('click', send);
