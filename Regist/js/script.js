// Pseudo data base
let userData = 
{   "user1" : {
        "name" : "ButchBet",
        "email" : "k.salazar@utp.edu.co",
        "pass" : "helloWorld"
    },

    "user2" : {
        "name" : "camiloRex",
        "email" : "ariasSoto.10@gmail.com",
        "pass" : "12345Hello"
    }
};


// Function that get on3 html elemnt, a type (Error, Success) and mis = message to 
// change the .formMessage div color 
function formMessageSetting(element, type, mis = "Hello World"){
    const message = element.querySelector(".formMessage");

    message.textContent = mis;

    message.classList.remove("formMessageSuccess", "formMessageError");
    message.classList.add(`formMessage${type}`);
}

// funtion to remove the message
function formMessageDelete(element) {
    setTimeout(() => {
        const formMessage = element.querySelector(".formMessage")

        formMessage.textContent = "";

        formMessage.classList.remove("formMessageSuccess", "formMessageError");
    }, 3000)
}


// General loaded event to create the individual events
document.addEventListener("DOMContentLoaded", () =>{
    // Get the tow forms id and create and object for each one
    const loginForm = document.getElementById("login");

    const createAccount = document.getElementById("createAccount");

    const createEvent = document.getElementById("linkCreateAccount");

    const loginEvent = document.getElementById("linkLogin");


    // When the user push the linkLogin or the linkCreateAccount hidde the actual frame and show the hidden frame
    loginEvent.addEventListener("click", e =>{
        e.preventDefault(); //
    
        loginForm.classList.add("formHidden"); 
        createAccount.classList.remove("formHidden");
    });

    createEvent.addEventListener("click", e =>{
        e.preventDefault(); //

        loginForm.classList.remove("formHidden");

        createAccount.classList.add("formHidden");
    });


    // Login Form and create account error message to when the user submit the button and the data would be incorrect
    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        // Get data inputs 
        const name = document.getElementById("loginName");

        const pass = document.getElementById("loginPass");

        const counter = dataCheck(name.value, pass.value, 0);

        if(counter) {
            formMessageSetting(loginForm, "Success", "Usuario y contraseña correcta");

            setTimeout(() => {
                location.assign("//www.platzi.com");
            }, 1000);
        } else {
            formMessageSetting(loginForm, "Error", "Usuario o contraseña incorrecta");

            formMessageDelete(loginForm);
        }

        name.value = "";

        pass.value = "";
    });

    createAccount.addEventListener("submit", e => {
        e.preventDefault();

        // Get data inputs 
        const name = document.getElementById("createName");

        const email = document.getElementById("createEmail");

        const pass = document.getElementById("createPass");

        const passRep = document.getElementById("createRepeatPass");

        console.log(passRep.value + " " + pass.value)

        const counter = dataCheck(name.value, pass.value, 1, email.value, passRep.value);

        if(counter === 0) {
            formMessageSetting(createAccount, "Success", "Valid data")

            setTimeout(() => {
                location.assign("//www.facebook.com");
            }, 2000);
        } else if(counter === 1) {
            formMessageSetting(createAccount, "Error", "The user name alrady exists");

            formMessageDelete(createAccount);
        } else if(counter === 2) {
            formMessageSetting(createAccount, "Error", "The email alrady exists")

            formMessageDelete(createAccount);
        } else if(counter === 3) {
            formMessageSetting(createAccount, "Error", "The user name and email alrady exist")

            formMessageDelete(createAccount);
        } else if(counter === 4) {
            formMessageSetting(createAccount, "Error", "The passwords dont match")

            formMessageDelete(createAccount);
        } else if(counter === 5) {
            formMessageSetting(createAccount, "Error", "The passwords don't match and the user name already exists")

            formMessageDelete(createAccount);
        } else if(counter === 6) {
            formMessageSetting(createAccount, "Error", "The passwords don't match and the email already exists")

            formMessageDelete(createAccount);
        } else if (counter === 7) {
            formMessageSetting(createAccount, "Error", "The passwords don't match, the user name and email alrady exist")

            formMessageDelete(createAccount);
        }

        name.value = "";

        email.value = "";

        // pass.value = "";
        // passRep.value = "";
        // formMessageSetting(createAccount, "Error", "Datos no validos para el registro.");
    });
});


// function to check data user 
function dataCheck(name, pass, condition, email, rep) {
    let cont = 0;

    if(condition === 0) {
        // Here for the login form
        for(key in userData) {
            if(userData[key].name === name && userData[key].pass === pass) {
                return true;
            } else if(userData[key].email === name && userData[key].pass === pass) {
                return true;
            } 
        }
    } else {
        // Here for the create form
        for(key in userData) {
            if(userData[key].email === email && userData[key].name === name) {
                cont += 3;
            } else if(userData[key].email === email) {
                cont += 2;
            } else if(userData[key].name === name){
                cont += 1;
            }
        }

        if(pass != rep) {
            cont += 4;
        }

        return cont;
    }

    return false;
}