//button to top pages
(function () {
const buttonUp = document.querySelector('.to-up-btn_js');

if (!buttonUp)
    return;

buttonUp.addEventListener('click', () => {
    window.scrollTo({
        top:0,
        behavior:'smooth',
    })
});

window.addEventListener('scroll', ()=> {
    if (window.pageYOffset > 1500) {
        buttonUp.classList.remove('hidden');
    }
    if (window.pageYOffset < 1500) {
        buttonUp.classList.add('hidden');
    }
});
})();


//Open-Close modal window
(function () {
    modalControl ('.sign-in-btn_js', '.sing-in-modal_js');
    modalControl ('.message-btn_js', '.message-modal_js');
    modalControl ('.register-btn_js', '.sing-up-modal_js');
    modalControl ('.change-password-btn_js', '.edit-password-modal_js');
    modalControl ('.change-data-btn_js', '.edit-data-modal_js');

})();


//Validate form singin --------------------------------------------------------------------------------------------------------------------------------------------------------------
(function () {
    const formSignIn = document.forms.signInform;
    if (!formSignIn){
        return;
    }

    const email = formSignIn.elements.email;
    const password = formSignIn.elements.password;
    

    formSignIn.addEventListener('submit', function (event) {
        event.preventDefault();

        let error = {};
        error = errorChecker(email.value,password.value);
        
        if (Object.keys(error).length)
        {
            Object.keys(error).forEach(key => {
                const textError = error[key];
                const input = formSignIn.elements[key];
                setError(input, textError);
            })
            return;
        } 

        const data = {
            email: email.value,
            password: password.value,
        };
    })
})();
//End Validate form singin --------------------------------------------------------------------------------------------------------------------------------------------------------------


//Validate form register --------------------------------------------------------------------------------------------------------------------------------------------------------------
(function () {
    const registerForm = document.forms.registerForm;
    if (!registerForm)
    {
        return;
    }
    const email = registerForm.elements.email;
    const password = registerForm.elements.password;
    const repeatPassword = registerForm.elements.repeatPassword;
    const name = registerForm.elements.name;
    const sname = registerForm.elements.sname;
    const location = registerForm.elements.location;
    const age = registerForm.elements.age;

    const agreement = registerForm.elements.agreement;
    const btnSubmit = registerForm.querySelector('.submit-btn_js');

    disableButtonAgree (btnSubmit, agreement);

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();

        let error = {};
        error = errorChecker(email.value,password.value, undefined, name.value, sname.value, age.value, location.value, repeatPassword.value);
        
        if (Object.keys(error).length)
        {
            Object.keys(error).forEach(key => {
                const textError = error[key];
                const input = registerForm.elements[key];
                setError(input, textError, password, registerForm);
            })
            return;
        } 

        const data = {
            email: email.value,
            password: password.value,
            age: age.value,
            name: name.value,
            sname: sname.value,
            location: location.value,
        };
    })
})();
//End Validate form register --------------------------------------------------------------------------------------------------------------------------------------------------------------


//Validate form message --------------------------------------------------------------------------------------------------------------------------------------------------------------

(function () {
    const messageForm = document.forms.messageForm;

    if (!messageForm)
    {
        return;
    }

    const email = messageForm.elements.email;
    const subject = messageForm.elements.subject;
    const name = messageForm.elements.name;
    const phone = messageForm.elements.phone;
    const message = messageForm.elements.message;

    const agreement = messageForm.elements.agreement;
    const btnSubmit = messageForm.querySelector('.submit-btn_js');



    disableButtonAgree (btnSubmit, agreement);

    messageForm.addEventListener('submit', function (event) {
        event.preventDefault();

        let error = {};
        error = errorChecker(email.value, undefined, phone.value, name.value, undefined, undefined, undefined, undefined, subject.value);
        
        if (Object.keys(error).length)
        {
            Object.keys(error).forEach(key => {
                const textError = error[key];
                const input = messageForm.elements[key];
                setError(input, textError);
            })
            return;
        } 

        const data = {
            email: email.value,
            phone: phone.value,
            name: name.value,
            subject: subject.value,
            message: message.value,
        };
        console.log(data);
    })
})();

//End Validate form message --------------------------------------------------------------------------------------------------------------------------------------------------------------

//Validate form editpassword --------------------------------------------------------------------------------------------------------------------------------------------------------------
(function () {
    const editPasswordForm = document.forms.editPasswordForm;
    if (!editPasswordForm)
    {
        return;
    }
    const password = editPasswordForm.elements.oldPassword;
    const newPassword = editPasswordForm.elements.newPassword;
    const repeatNewPassword = editPasswordForm.elements.repeatNewPassword;
    let nameInputPassword = 'oldPassword';


    editPasswordForm.addEventListener('submit', function (event) {
        event.preventDefault();

        let error = {};
        error = errorChecker(undefined, password.value, undefined, undefined, undefined, undefined, undefined, undefined, undefined, newPassword.value, repeatNewPassword.value);

        if (Object.keys(error).length)
        {
            Object.keys(error).forEach(key => {
                let textError, input;

                if (key === 'password'){
                    textError = error[key];
                    input = editPasswordForm.elements[nameInputPassword];
                } else {
                    textError = error[key];
                    input = editPasswordForm.elements[key];
                }

                setError(input, textError, newPassword, editPasswordForm);
            })
            return;
        } 

        const data = {
            password: password.value,
            newPassword: newPassword.value,
        };
    })
})();
//End Validate form editpassword --------------------------------------------------------------------------------------------------------------------------------------------------------------

//Validate form editdata --------------------------------------------------------------------------------------------------------------------------------------------------------------
(function () {
    const editDataForm = document.forms.editDataForm;
    if (!editDataForm)
    {
        return;
    }
    const email = editDataForm.elements.email;
    const name = editDataForm.elements.name;
    const sname = editDataForm.elements.sname;
    const location = editDataForm.elements.location;
    const age = editDataForm.elements.age;
    const fileInputFake = editDataForm.querySelector('.fakeFile-input_js');
    const fileInput = editDataForm.elements.file;
    
    fileInput.addEventListener('click', () => {
            fileInput.value = null; 
    });

    fileInput.addEventListener('change', () => {
        let strFileName = (fileInput.value).split('\\');
        fileInputFake.innerText = strFileName [strFileName.length-1];
    });

    editDataForm.addEventListener('submit', function (event) {
        event.preventDefault();

        

        if (email) {
            if (!emailCheck(email.value) && email.value.trim().length > 0) {
                const textError = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
                setError(email, textError, undefined, undefined);
            }
        } 

        const data = {
            email: email.value,
            name: name.value,
            sname: sname.value,
            age: age.value,
            location: location.value,
            file: fileInput.value,
        };
    })
})();
//End Validate form editdata --------------------------------------------------------------------------------------------------------------------------------------------------------------


//Добавление и удаление ошибок в форме
function setError(input, errorMessage, password, form){
    const error = errorCreator(errorMessage);
    const customInput = input;

    customInput.classList.add('input-invalide');
    customInput.classList.add('error');
    customInput.insertAdjacentElement('afterend', error);

    customInput.addEventListener('input', function() {

        //Если пишем в поле repeatPassword то удаляем ошибку у поля password тоже
        if (customInput.name === "repeatPassword") {
            const errorPasswordMessage = form.querySelector('input[name="password"]~.message-error');
            if (errorPasswordMessage) {
                errorPasswordMessage.remove();
                password.classList.remove('input-invalide');
                password.classList.remove('error');
            }
        }
        if (customInput.name === "repeatNewPassword") {
            const errorPasswordMessage = form.querySelector('input[name="newPassword"]~.message-error');
            if (errorPasswordMessage) {
                errorPasswordMessage.remove();
                password.classList.remove('input-invalide');
                password.classList.remove('error');
            }
        }
            error.remove();
            customInput.classList.remove('input-invalide');
            customInput.classList.remove('error');
    }, {once: true});
}

//Создание эллемента с текстом ошибки
function errorCreator(message) {
    let messageError = document.createElement('div');
    messageError.classList.add('message-error');
    messageError.innerText = message;
    return messageError;
}

//Checking data for errors
function errorChecker(email, password, phone, name, sname, age, location, repeatPassword, subject, newPassword, repeatNewPassword) {
    let error = {};

    if (email != undefined) {
        if (email.trim().length === 0) {
            error.email = 'This field is required';
        } else if (!emailCheck(email)) {
            error.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
        }
    } 

    if (subject != undefined) {
        if (subject.trim().length === 0) {
            error.subject = 'This field is required';
        } else if (!emailCheck(subject)) {
            error.subject = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
        }
    } 

    if (password != undefined) {
        if (password.trim().length === 0) {
            error.password = 'This field is required';
        } else if (password.trim().length < 6) {
            error.password = 'The password must be longer than 6 characters!';
        } else if (repeatPassword != undefined) {
            if (repeatPassword.trim().length === 0){
                error.repeatPassword = 'This field is required';
            }
            else if (!(repeatPassword === password)) {
                error.password = 'Passwords must match!';
                error.repeatPassword = 'Passwords must match!';
            }
        }
    }

    if (newPassword != undefined) {
        if (newPassword.trim().length === 0) {
            error.newPassword = 'This field is required';
        } else if (newPassword.trim().length < 6) {
            error.newPassword = 'The password must be longer than 6 characters!';
        } else if (repeatNewPassword != undefined) {
            if (repeatNewPassword.trim().length === 0){
                error.repeatNewPassword = 'This field is required';
            }
            else if (!(repeatNewPassword === newPassword)) {
                error.newPassword = 'Passwords must match!';
                error.repeatNewPassword = 'Passwords must match!';
            }
        }
    }

    if (phone != undefined) {
        if (phone.trim().length === 0){
            error.phone = 'This field is required';
        } else if (!phoneCheck(phone)) {
            error.phone = 'Please enter a valid phone (your entry is not in the format "+79999999999")';
        }
    }

    if (name != undefined) {
        if (name.trim().length === 0){
            error.name = 'This field is required';
        }
    }
    if (sname != undefined) {
        if (sname.trim().length === 0){
            error.sname = 'This field is required';
        }
    }
    if (age != undefined) {
        if (age.trim().length === 0){
            error.age = 'This field is required';
        }
    }
    if (location != undefined) {
        if (location.trim().length === 0){
            error.location = 'This field is required';
        }
    }
    return error;
}



// Lock && Unlock button submit
function disableButtonAgree (button, checkbox) {
    button.disabled = true;
    checkbox.addEventListener('change', () => {

    if (checkbox.checked) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
})
}

function emailCheck(email) {
    return (email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i));
}

function phoneCheck(phone) {
    return phone.match(/^(\s*)?(\+)?([-_():=+]?\d[- _():=+]?){10,14}(\s*)?$/);
}


//Управление модальными окнами
function modalControl (classBtnOpen, classModal) {
    if (!(document.querySelector(classModal))) {
        return;
    }
    const modalWindow = document.querySelector(classModal);
    const modalOverlay = document.querySelector('.modal-overlay_js');
    const btnOpen = document.querySelector(classBtnOpen);
    const btnClose = modalWindow.querySelector(".modal-btn-close_js");


    if (modalWindow || btnClose || btnOpen)
    {
        btnOpen.addEventListener('click', () => {
            modalWindow.classList.remove('hidden');
            modalOverlay.classList.remove('hidden');
        });
        btnClose.addEventListener('click', () => {
            modalWindow.classList.add('hidden');
            modalOverlay.classList.add('hidden');
        });
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                modalWindow.classList.add('hidden');
                modalOverlay.classList.add('hidden');
            }
        })
    }
}
