var $ = function (id) { return document.getElementById(id) };

function send() {
    var data = new FormData();
    data.append("file", $('chooser').files[0]);
    data.append("firstName", firstName.value);
    data.append("lastName", lastName.value);
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/submit', true);
    xhr.onload = function (e) {
        if (this.status == 200) {
            console.log("Form sent!");
        }
    };
    xhr.send(data);
};

$('submit').addEventListener('click', send);
