<!DOCTYPE html>
<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
<style>

</style>

<head>
  <link href="mystyle.css" rel="stylesheet">
  <title>File Upload</title>
</head>

<body>
  <h1>File Uploading Web App</h1>

  <h2>Upload file</h2>
  <form id="frm1" name="myForm" action="http://localhost:8000/api/post" enctype="multipart/form-data" method="post">
    First name: <input type="text" name="fname" id="firstname"><br>
    Last name: <input type="text" name="lname" id="lastname"><br>


    <div id="file">Click here to upload</div>
    <input type="file" id="chooser" name="uploadedfile">
  </form>  

  <div id="data">
    <p>(File Contents)</p>
  </div>

  <div id="submitbutton">Submit</div>
  <button id="submit" onclick="submitFunc()">Submit</button>
  <button id="reset" onclick="resetFunc()">Reset</button><br>


  <div id="explain">
    <p>Click on the Submit button to change text.</p>
    <p>Click on the Reset button to change it back.</p>
  </div>


  <p id="foo"></p>

  <script src="main.js"></script>

</body>
</html>
