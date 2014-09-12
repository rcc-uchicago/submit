# A Submit Tutorial

Provide a step-by-step walkthrough of forking, customizing, running, and
testing.

In particular, it would be great if you could show how to ...

* add a few form fields (e.g., day, month, and year fields for indicating
  date-of-birth)
* validate the new fields as appropriate
* set up the server in your home dir on midway
* have the server write out submissions to a log (e.g., `birthdays.csv`)

## Adding a New Form Field

[Here](https://github.com/rcc-uchicago/submit/blob/master/client/index.html#L40-L45) is the block of code for the form field for first name in index.html. Simply copy and paste within the form tags and modify [these lines](https://github.com/rcc-uchicago/submit/blob/master/client/index.html#L42-L43) to create a new form field.

For example, to add a form field for phone number, you might paste this after the first and last name form fields in index.html: 
```
<div class="row">
  <div class="form-group col-md-6">
    <label for="phone">Phone Number</label>
    <input type="text" class="form-control input-medium" id="phone" placeholder="Phone">
  </div>
</div>
```
Notice attributes that have been modified. The id in the input line must match the for attribute in the label line. Here, they have been set to "phone". The innerHTML for label and placeholder attribute for input can be set to whatever you wish.

Now in main.js in the sendForm function, get the input text as done for firstname [here](https://github.com/rcc-uchicago/submit/blob/master/client/main.js#L88) and add it to the form data as shown [here](https://github.com/rcc-uchicago/submit/blob/master/client/index.html#L96). Also, add a line in the resetFunc function to make the form field blank when the reset button is clicked as done [here](https://github.com/rcc-uchicago/submit/blob/master/client/index.html#L146). Here is an example below for a phone number form field: 
```
function sendForm() {
...
  var phone = document.getElementById("phone").value;
  formData.append("phone", phone);
...
};

function resetFunc() {
...
  document.getElementById("phone").value = "";
...
};
```
## Validating a New Form Field

Validation of form fields are done client-side in [main.js](https://github.com/rcc-uchicago/submit/blob/master/client/main.js). Continuing our example with the phone number form field, you can either add lines to [this block of code](https://github.com/rcc-uchicago/submit/blob/master/client/main.js#L10-21) or follow the structure to create a separate validation process for the phone number in addition to the one for the name fields. An example for creating a new separate validation could look like the following: 

