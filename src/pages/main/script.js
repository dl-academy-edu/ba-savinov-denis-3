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
    modalControll ('.sign-in-btn_js', '.sing-in-modal_js');
    modalControll ('.message-btn_js', '.message-modal_js');
    modalControll ('.register-btn_js', '.sing-up-modal_js');
    modalControll ('.change-password-btn_js', '.edit-password-modal_js');
    modalControll ('.change-data-btn_js', '.edit-data-modal_js');

})();

(function () {
    const formSignIn = document.forms.signInform;
    const email = formSignIn.elements.email;
    const password = formSignIn.elements.password;
    formSignIn.addEventListener('submit', function (event) {
        event.preventDefault()
        const data = {
            email: email.value,
            password: password.value,
        };
    })
})










function modalControll (classBtnOpen, classModal) {
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
