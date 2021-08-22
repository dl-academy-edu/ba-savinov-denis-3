(function () {
    const profileContainer = document.querySelector('.profile_js');
    const spinner = document.querySelector('.profile-spinner_js');
    const editDataModal = document.querySelector('.edit-data-modal_js');
    const editPasswordModal = document.querySelector('.edit-password-modal_js');
    const modalOverlay = document.querySelector('.modal-overlay_js');
    const editPasswordForm = document.forms.editPasswordForm;
    const editDataForm = document.forms.editDataForm;
    const btnDeleteAccount = document.querySelector('.delete-user-btn_js');

    if (!profileContainer || !spinner || !editPasswordForm || !editDataForm || !editDataModal || !editPasswordModal) return;
    const profileImage = profileContainer.querySelector('.profile-image_js');
    const profileName = profileContainer.querySelector('.profile-name_js');
    const profileSname = profileContainer.querySelector('.profile-sname_js');
    const profileEmail = profileContainer.querySelector('.profile-email_js');
    const profileLocation = profileContainer.querySelector('.profile-location_js');
    const profileAge = profileContainer.querySelector('.profile-age_js');

    let profile = null;

    getUserProfile ();
    profileModalOpen ();
    validateEditProfile ();


    btnDeleteAccount.addEventListener('click', deleteAccount);


    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            renderMenu();
        }
    })

    function validateEditProfile () {
        const fileInputFake = editDataForm.querySelector('.fakeFile-input_js');
        const fileInput = editDataForm.elements.avatar;
        const btnSubmit = editDataForm.querySelector('.edit-data-btn_js');

        fileInput.addEventListener('click', () => {
            fileInput.value = null;
        });

        fileInput.addEventListener('change', () => {
            let strFileName = (fileInput.value).split('\\');
            fileInputFake.innerText = strFileName [strFileName.length-1];
        });

        editDataForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const email = editDataForm.elements.email;
            const name = editDataForm.elements.name;
            const location = editDataForm.elements.location;
            const age = editDataForm.elements.age;
            const surname = editDataForm.elements.surname;
            let textError = '';

            if (email.value.trim().length != 0) {
                if (!emailCheck(email.value)) {
                    textError = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
                    setError(email, textError, undefined, undefined);
                    setBtnError (btnSubmit);
                    return;
                }else {
                    setNoError(email, 'All right');
                    setBtnValid (btnSubmit);
                }
            } else {
                textError = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
                setError(email, textError, undefined, undefined);
                setBtnError (btnSubmit);
                return;
            }
            if (name.value.trim().length != 0) {
                setNoError(name, 'All right');
                setBtnValid (btnSubmit);
            } else {
                textError = 'This field is required';
                setError(name, textError, undefined, undefined);
                setBtnError (btnSubmit);
                return;
            }

            if (surname.value.trim().length != 0) {
                setNoError(surname, 'All right');
                setBtnValid (btnSubmit);
            } else {
                textError = 'This field is required';
                setError(surname, textError, undefined, undefined);
                setBtnError (btnSubmit);
                return;
            }

            if (age.value.trim().length === 0){
                textError = 'This field is required';
                setError(age, textError, undefined, undefined);
                setBtnError (btnSubmit);
                return;
            }else if (+age.value < 18) {
                textError = 'The age must be over 18 years old';
                setError(age, textError, undefined, undefined);
                setBtnError (btnSubmit);
                return;
            } else {
                setNoError(age, 'All right');
                setBtnValid (btnSubmit);
            }
            if (location.value.trim().length != 0) {
                setNoError(location, 'All right');
                setBtnValid (btnSubmit);
            } else {
                textError = 'This field is required';
                setError(location, textError, undefined, undefined);
                setBtnError (btnSubmit);
                return;
            }



            const data = new FormData (editDataForm);
            controlSpinner(editDataModal);
            sendrequest({
                method: 'PUT',
                url: '/api/users/',
                body: data,
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                }
            })
                .then(res => {
                    if (res.status === 401 || res.status === 403) {
                        localStorage.removeItem('token');
                        localStorage.removeItem('userId');
                        window.location.pathname = '/';
                    }
                    return res.json();
                })
                .then(res => {
                    controlSpinner(editDataModal, false);
                    if (res.success) {
                        profile = res.data;
                        renderProfile();
                        clearMessage (editDataModal);
                        visualMessageSendForm(true, editDataModal);
                    }else {
                        throw res;
                    }
                })
                .catch (err => {
                    console.log (err);
                    controlSpinner(editDataModal, false);
                    visualMessageSendForm(false, editDataModal);
                })
        })
    }

    function getUserProfile () {
        spinner.classList.remove('hidden');
        sendrequest({
            method: 'GET',
            url: '/api/users/'+ localStorage.getItem('userId'),
        })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    profile = res.data;
                    renderProfile();
                }else {
                    window.location.pathname = '/';
                }
            })
            .finally(()=> {
                spinner.classList.add('hidden');
            })
    }

    function renderProfile () {
        profileImage.src = SERVER_URL + profile.photoUrl;
        profileName.innerText = profile.name;
        profileSname.innerText = profile.surname;
        profileEmail.innerText = profile.email;
        profileLocation.innerText = profile.location;
        profileAge.innerText = profile.age;
    }

    function profileModalOpen () {
        const btnEditDataOpen = document.querySelector('.change-data-btn_js');
        const btnEditpasswordOpen = document.querySelector('.change-password-btn_js');
        if (!btnEditDataOpen || !btnEditpasswordOpen) {
            return;
        }
        btnEditDataOpen.addEventListener('click', () => {
            editDataForm.email.value = profile.email;
            editDataForm.surname.value = profile.surname;
            editDataForm.name.value = profile.name;
            editDataForm.location.value = profile.location;
            editDataForm.age.value = profile.age;
            profileModalControl (editDataModal);
        });
        btnEditpasswordOpen.addEventListener('click', () =>{

            profileModalControl (editPasswordModal);
        });
    }

    function profileModalControl (modal) {

        const modalBtnClose = modal.querySelector('.modal-btn-close_js');
        modal.classList.remove('hidden');
        modalOverlay.classList.remove('hidden');

        modalBtnClose.addEventListener('click', () =>{
            modal.classList.add('hidden');
            modalOverlay.classList.add('hidden');
        });
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                modal.classList.add('hidden');
                modalOverlay.classList.add('hidden');
            }
        })
    }

    function deleteAccount () {
        sendrequest({
            method: 'DELETE',
            url: '/api/users/' + localStorage.getItem('userId'),
            headers: {
                'x-access-token': localStorage.getItem('token'),
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                    window.location.pathname = '/';
                }
                return res.json();
            })
            .then(res => {
                if (res.success) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                    window.location.pathname = '/';
                    visualMessageSendForm(true);
                }else {
                    throw res;
                }
            })
            .catch (err => {
                console.log (err);
                visualMessageSendForm(false);
            })
    }
})();

//Validate form editpassword --------------------------------------------------------------------------------------------------------------------------------------------------------------
(function () {
    const editPasswordForm = document.forms.editPasswordForm;
    const editPasswordModal = document.querySelector('.edit-password-modal_js');
    if (!editPasswordForm || !editPasswordModal)
    {
        return;
    }
    const password = editPasswordForm.elements.oldPassword;
    const newPassword = editPasswordForm.elements.newPassword;
    const repeatNewPassword = editPasswordForm.elements.repeatNewPassword;
    const btnSubmit = editPasswordForm.querySelector('.edit-password-btn_js');
    let nameInputPassword = 'oldPassword';


    editPasswordForm.addEventListener('submit', function (event) {
        event.preventDefault();

        let valideMessage = [];
        valideMessage = errorChecker(undefined, password.value, undefined, undefined, undefined, undefined, undefined, undefined, undefined, newPassword.value, repeatNewPassword.value);

        if (Object.keys(valideMessage[0]).length)
        {
            setBtnError (btnSubmit);
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
        } else {
            setBtnValid (btnSubmit);
        }
        if (Object.keys(valideMessage[1]).length) {
            Object.keys(valideMessage[1]).forEach(key => {
                let textMessage, inputValid;

                if (key === 'password'){
                    textMessage = valideMessage[1][key];
                    inputValid = editPasswordForm.elements[nameInputPassword];
                } else {
                    textMessage = valideMessage[1][key];
                    inputValid = editPasswordForm.elements[key];
                }
                setNoError(inputValid, textMessage);
            })
        }

        if (!Object.keys(valideMessage[0]).length)
        {
            const data = {
                oldPassword: password.value,
                newPassword: newPassword.value,
            }

            controlSpinner(editPasswordModal);
            sendrequest({
                method: 'PUT',
                url: '/api/users',
                body: JSON.stringify(data),
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    if (res.status === 401 || res.status === 403) {
                        localStorage.removeItem('token');
                        localStorage.removeItem('userId');
                        window.location.pathname = '/';
                    }
                    return res.json();
                })
                .then(res => {
                    console.log (res);
                    controlSpinner(editPasswordModal, false);
                    if (res.success) {
                        clearMessage (editPasswordModal);
                        visualMessageSendForm(true, editPasswordModal);
                    }else {
                        throw res;
                    }
                })
                .catch(err => {
                    controlSpinner(editPasswordModal, false);
                    event.target.reset();
                    clearMessage (editPasswordModal);
                    visualMessageSendForm(false, editPasswordModal);
                })

        }
    })
})();
//End Validate form editpassword --------------------------------------------------------------------------------------------------------------------------------------------------------------




