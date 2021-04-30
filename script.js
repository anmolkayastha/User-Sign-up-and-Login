// console.log('Script working');

// DOM Elements
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');



// Check all fields are valid
function checkRequired(inputArr)
{
    inputArr.forEach(function(input)
    {
        if (input.value.trim() === ''){
            showError(input, `${getFieldName(input)} is required`);     
        }
        else{
            showSuccess(input);
        }
    });
}

// Check email is valid
function checkEmail(input)
{
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // return re.test(String(input).toLowerCase());
    if(re.test(input.value.trim())){
      showSuccess(input);
    }else{
      showError(input, 'Email is not valid');
    }
}


// Check input length
function checkLength(input, min, max)
{  
    if (input.value.length < min){
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    }
    else if (input.value.input > max){
        showError(input, `${getFieldName(input)} length must be less than ${max} characters`);
    }
    else{
        showSuccess(input);
    }
}


// Check passwords match
function checkPasswordsMatch(input1, input2)
{
    if (input1.value !== input2.value){
        showError(input2, "Passwords do not match");
    }
}


function getFieldName(input)
// Gets ID, turns first letter of ID to capital and concatenates with the rest of the string
// Returns the string to displayed under the input fields
{
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);        
}


// Show success message and change CSS when input fields are alright
function showSuccess(input){
  const formGroup = input.parentElement;      // div element with class="form-group"
  formGroup.className = 'form-group success';     // adds class="form-group" to change CSS

}

// Show error message 
// and change CSS when there's error in input fields
function showError(input, message)
{
  const formGroup = input.parentElement;      // div element with class="form-group"
  formGroup.className = 'form-group error';     // adds class="form-control error" to change CSS
  const small = formGroup.querySelector('small');
  small.innerText = message;
}


// Event listener
form.addEventListener('submit', function(e){
    e.preventDefault();

    console.log('SUBMIT');

    // Check all required fields
    checkRequired([username, email, password, password2]);
    checkLength(username,4,12);
    checkLength(password, 6, 15);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
    
    storeLoginInfo([username, email, password]);
});
