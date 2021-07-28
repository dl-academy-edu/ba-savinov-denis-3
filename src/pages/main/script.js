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


//Validate form singin
(function () {
    const formSignIn = document.forms.signInform;
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
})()

function setError(input, errorMessage){
    const error = errorCreator(errorMessage);
    const customInput = input[0] ? input[0] : input;

    customInput.classList.add('input-invalide');
    customInput.classList.add('error');
    customInput.insertAdjacentElement('afterend', error);
    
    customInput.addEventListener('input', function() {
        error.remove();
        customInput.classList.remove('input-invalide');
        customInput.classList.remove('error');
    }, {once: true});
}

function errorCreator(message) {
    let messageError = document.createElement('div');
    messageError.classList.add('message-error');
    messageError.innerText = message;
    return messageError;
}

//Checking data for errors
function errorChecker(email, password, phone) {
    let error = {};
    if (email != undefined) {
        if (!emailCheck(email)) {
            error.email = 'Ошибка, email введен не верно';
        }
    }
    if (password != undefined) {
        if (password.length < 6) {
            error.password = 'Пароль должен быть более 6 символов!';
        }
    }
    if (phone != undefined) {
        console.log ("phone");
        if (!emailCheck(phone)) {
            error.phone = 'Телефон указан не верно!';
        }
    }
    return error;
}


function emailCheck(email) {
    return (email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i));
}

function phoneCheck(phone) {
    return phone.match(/^(\s*)?(\+)?([-_():=+]?\d[- _():=+]?){10,14}(\s*)?$/);
}

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
