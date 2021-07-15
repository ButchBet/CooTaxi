// 1*------------------------------------------------------------------------
function formMessageSetting(element, type, mis = "Hello World"){
    const message = element.querySelector(".formMessage");

    message.textContent = mis;

    message.classList.remove("formMessageSuccess", "formMessageError");
    message.classList.add(`formMessage${type}`);
}

// 3*----------------------------------------------------------------------
function formInputSettingE(inputE, mis){
    inputE.classList.add("formInputError");
    document.querySelector(".formInputErrorMessage").textContent = mis;
}

function formInputSettingN(inputE){
    inputE.classList.remove("formInputError");
    document.querySelector(".formInputErrorMessage").textContent = "";
}

// 2*---------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () =>{
    // 2.1*
    const loginForm = document.querySelector("#login");
    const createAccount = document.querySelector("#createAccount");

    // 2.2*
    document.querySelector("#linkLogin").addEventListener("click", e =>{
        e.preventDefault(); //
        
        // 2.2.1*
        loginForm.classList.add("formHidden"); 
        createAccount.classList.remove("formHidden");
    });

    2.3*
    document.querySelector("#linkCreateAccount").addEventListener("click", e =>{
        e.preventDefault(); //

        // 2.3.1*
        createAccount.classList.add("formHidden");
        loginForm.classList.remove("formHidden");
    });


    // 2.4*
    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        // Ajax/fetch login performing 

        formMessageSetting(loginForm, "Error", "Nombre de usuario o contraseña incorrecto.");
    });

    // 2.5*
    createAccount.addEventListener("submit", e => {
        e.preventDefault();

        // Ajax/fetch login performing 

        formMessageSetting(createAccount, "Success", "Nombre de usuario o contraseña incorrecto.");
    });

    // 2.6*
    document.querySelectorAll(".formInput").forEach(inputE =>{
        inputE.addEventListener("blur", e =>{
            if (e.target.id === "SingUpUserName" && e.target.value.length > 0 && e.target.value.length < 10){
                formInputSettingE(inputE, "El nombre de usuario debe ser de por lo menos 10 caracteres.");
            }
        });

        inputE.addEventListener("input", e =>{
            formInputSettingN(inputE);
        });
    });
});

