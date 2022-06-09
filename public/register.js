const formDOM = document.getElementById('form-register');
const alertDOM = document.getElementById('alert-p-register');
const usernameInputDOM = document.getElementById('username-input-register');
const emailInputDOM = document.getElementById('email-input-register');
const passwordInputDOM = document.getElementById('password-input-register');

formDOM.addEventListener('submit', async (e) => {
    e.preventDefault();

    const user = {
        username: usernameInputDOM.value,
        email: emailInputDOM.value,
        password: passwordInputDOM.value
    }

    try {
        await axios.post('api/v1/auth/register', user);

        usernameInputDOM.value = '';
        emailInputDOM.value = '';
        passwordInputDOM.value = '';

        if(!alertDOM.classList.contains('hidden')){
            alertDOM.classList.add('hidden');
        }

        window.location.replace('./login.html')
    } catch (error) {
        const message = error.response.data.msg;

        alertDOM.classList.remove('hidden');
        alertDOM.innerHTML = message;
    }
});