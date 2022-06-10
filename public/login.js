const formDOM = document.getElementById('form-login');
const alertDOM = document.getElementById('alert-p-login');
const emailInputDOM = document.getElementById('email-input-login');
const passwordInputDOM = document.getElementById('password-input-login');

formDOM.addEventListener('submit', async (e) => {
    e.preventDefault();

    const user = {
        email: emailInputDOM.value,
        password: passwordInputDOM.value
    }

    try {
        const response = await axios.post('api/v1/auth/login', user);
        
        if(!alertDOM.classList.contains('hidden')){
            alertDOM.classList.add('hidden');
        }

        localStorage.setItem('AuthToken', `Bearer ${response.data.token}`);

        window.location.replace('./index.html')
    } catch (error) {
        const message = error.response.data.msg;

        alertDOM.classList.remove('hidden');
        alertDOM.innerHTML = message;
    }
});

function verifyToken(){
    if(localStorage.getItem('AuthToken')){
        window.location.replace('./index.html')
    }
}

verifyToken();