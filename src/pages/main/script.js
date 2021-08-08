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


//Main slider
(function (){
    const slider = document.querySelector('.main-slider_js');
    if (!slider) {
        return;
    }
    const sliderWrapper =slider.querySelector('.slider-wrapper_js');
    const sliderInnerWrapper = sliderWrapper.querySelector('.slider-inner-wrapper_js');
    const slides = [...sliderInnerWrapper.querySelectorAll('.slider-slide_js')];
    const btnPrev = slider.querySelector('.slider-btn-prev_js');
    const btnNext = slider.querySelector('.slider-btn-next_js');
    const pagination = slider.querySelector('.slider-pagination_js');
    const slidesCount = slides.length;
    const animationDuration = 500;


    let slideStorage = 0;
    if (!localStorage.getItem('activeSlide')) {
        slideStorage = 0;
    } else {
        slideStorage = +localStorage.getItem('activeSlide');
    }
    

    let id =null;
    let dots = [];
    let sliderWidth = 0;
    let activeSlide = 0;
    createDots ();
    sliderInitWidth ();
    setActiveSlide (slideStorage);

    window.addEventListener('resize', ()=> {
        sliderInitWidth();
        setActiveSlide(activeSlide);
    });

    btnPrev.addEventListener('click', () => {
        setActiveSlide (activeSlide - 1);
    });
    btnNext.addEventListener('click', () => {
        setActiveSlide (activeSlide + 1);
    });

    function createDots () {
        for(let i=0; i<slidesCount; i++) {
            const li = document.createElement('li');
            const dot = createDot (i);
            dots.push(dot);
            li.appendChild(dot);
            pagination.insertAdjacentElement('beforeend', li);
        }
    }

    function createDot (index) {

        const dot = document.createElement('button');

        if (index === activeSlide) {
            dot.classList.add('main-slider__pagination_active');
        }
        dot.addEventListener('click', ()=>{
           setActiveSlide(index);
        });

        return dot;
    }

    function sliderInitWidth () {
        sliderWidth = sliderWrapper.offsetWidth;
        slides.forEach(slide => {
            slide.style.width = sliderWidth+'px';
        })
    }

    function setActiveSlide (index, withAnimation = true) {
        if (index < 0 || index >= slides.length){
            return;
        }
        if (withAnimation) {
            clearTimeout(id);
            sliderInnerWrapper.style.transition = `transform ${animationDuration}ms`;
            id = setTimeout(()=>{
                sliderInnerWrapper.style.transition = '';
            }, animationDuration);
        }
        if (index === 0) {
            btnPrev.disabled = true;
        }else {
            btnPrev.disabled = false;
        }

        if (index === slides.length-1) {
            btnNext.disabled = true;
        }else {
            btnNext.disabled = false;
        }

        sliderInnerWrapper.style.transform = `translateX(-${sliderWidth * index}px)`;

        dots[activeSlide].classList.remove('main-slider__pagination_active');
        dots[index].classList.add('main-slider__pagination_active');
        localStorage.setItem('activeSlide', index);
        activeSlide = index;
    }

})();



// Slider swiper
(function (){
    if (!document.querySelector('.swiper-container'))
    {
        return;
    }


    const swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
    
        navigation: {
            nextEl: '.swiper-btn-next_js',
            prevEl: '.swiper-btn-prev_js',
        },
    
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

        let valideMessage = [];
        valideMessage = errorChecker(email.value,password.value);
        
        
        if (Object.keys(valideMessage[0]).length)
        {
            Object.keys(valideMessage[0]).forEach(key => {
                const textError = valideMessage[0][key];
                const input = formSignIn.elements[key];
                setError(input, textError);
            })
        } 
        if (Object.keys(valideMessage[1]).length) {
            Object.keys(valideMessage[1]).forEach(key => {
                
                const textError = valideMessage[1][key];
                const input = formSignIn.elements[key];
                setNoError(input, textError);
            })
            
        }

        if (!Object.keys(valideMessage[0]).length)
        {
            const data = {
                email: email.value,
                password: password.value,
            }
        }
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

        let valideMessage = [];
        valideMessage = errorChecker(email.value,password.value, undefined, name.value, sname.value, age.value, location.value, repeatPassword.value);
        
        if (Object.keys(valideMessage[0]).length)
        {
            Object.keys(valideMessage[0]).forEach(key => {
                const textError = valideMessage[0][key];
                const input = registerForm.elements[key];
                setError(input, textError, password, registerForm);
            })
            return;
        } 

        if (!Object.keys(valideMessage[0]).length)
        {
            const data = {
                email: email.value,
                password: password.value,
                age: age.value,
                name: name.value,
                sname: sname.value,
                location: location.value,
            };
        }
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

        let valideMessage = [];
        valideMessage = errorChecker(email.value, undefined, phone.value, name.value, undefined, undefined, undefined, undefined, subject.value);
        
        if (Object.keys(valideMessage[0]).length)
        {
            Object.keys(valideMessage[0]).forEach(key => {
                const textError = valideMessage[0][key];
                const input = messageForm.elements[key];
                setError(input, textError);
            })
            return;
        } 
        if (!Object.keys(valideMessage[0]).length)
        {
            const data = {
                email: email.value,
                phone: phone.value,
                name: name.value,
                subject: subject.value,
                message: message.value,
            }
        }
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

        let valideMessage = [];
        valideMessage = errorChecker(undefined, password.value, undefined, undefined, undefined, undefined, undefined, undefined, undefined, newPassword.value, repeatNewPassword.value);

        if (Object.keys(valideMessage[0]).length)
        {
            Object.keys(valideMessage[0]).forEach(key => {
                let textError, input;

                if (key === 'password'){
                    textError = valideMessage[0][key];
                    input = editPasswordForm.elements[nameInputPassword];
                } else {
                    textError = valideMessage[0][key];
                    input = editPasswordForm.elements[key];
                }

                setError(input, textError, newPassword, editPasswordForm);
            })
            return;
        } 

        if (!Object.keys(valideMessage[0]).length)
        {
            const data = {
                password: password.value,
                newPassword: newPassword.value,
            }
        }
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

    if (!customInput.classList.contains('input-invalide') && !customInput.classList.contains('error')) {
        customInput.classList.add('input-invalide');
        customInput.classList.add('error');
        customInput.insertAdjacentElement('afterend', error);
    }

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

function setNoError (input, message) {
   const noError =  noErrorElementCreator(message);

   if (!input.classList.contains('input-valide') && !input.classList.contains('no-error')) {
    input.classList.add('input-valide');
    input.classList.add('no-error');
    input.insertAdjacentElement('afterend', noError);
    }

    input.addEventListener('input', function() {
            noError.remove();
            input.classList.remove('input-valide');
            input.classList.remove('no-error');
    }, {once: true});
}

//Checking data for errors
function errorChecker(email, password, phone, name, sname, age, location, repeatPassword, subject, newPassword, repeatNewPassword) {
    let error = {};
    let noError = {};

    if (email != undefined) {
        if (email.trim().length === 0) {
            error.email = 'This field is required';
        } else if (!emailCheck(email)) {
            error.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
        } else {
            noError.email = 'All right';
        }
    } 

    if (subject != undefined) {
        if (subject.trim().length === 0) {
            error.subject = 'This field is required';
        } else if (!emailCheck(subject)) {
            error.subject = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
        }
        else {
            noError.subject = 'All right';
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
            } else {
                    noError.repeatPassword = 'All right';
                    noError.password = 'All right';
            }
        }else {
            noError.password = 'All right';
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
            }else {
                noError.repeatNewPassword = 'All right';
                noError.newPassword = 'All right';
            }
        }
    }

    if (phone != undefined) {
        if (phone.trim().length === 0){
            error.phone = 'This field is required';
        } else if (!phoneCheck(phone)) {
            error.phone = 'Please enter a valid phone (your entry is not in the format "+79999999999")';
        } else {
            noError.phone = 'All right';
        }
    }

    if (name != undefined) {
        if (name.trim().length === 0){
            error.name = 'This field is required';
        }else {
            noError.name = 'All right';
        }
    }
    if (sname != undefined) {
        if (sname.trim().length === 0){
            error.sname = 'This field is required';
        }else {
            noError.sname = 'All right';
        }
    }
    if (age != undefined) {
        if (age.trim().length === 0){
            error.age = 'This field is required';
        }else {
            noError.age = 'All right';
        }
    }
    if (location != undefined) {
        if (location.trim().length === 0){
            error.location = 'This field is required';
        }else {
            noError.location = 'All right';
        }
    }

    return [error, noError];
}

//Создание эллемента с текстом ошибки
function errorCreator(message) {
    let messageError = document.createElement('div');
    messageError.classList.add('message-error');
    messageError.innerText = message;
    return messageError;
}

function noErrorElementCreator(message) {
    let messageError = document.createElement('div');
    messageError.classList.add('message-noError');
    messageError.innerText = message;
    return messageError;
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
