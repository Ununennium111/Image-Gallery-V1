const alertsContainerDOM = document.getElementById('alerts-container-div');
const signUpAlertDOM = document.getElementById('sign-up-alert-div');
const uploadAlertDOM = document.getElementById('upload-alert-div');

function verifyToken(){
    if(!localStorage.getItem('AuthToken') || !localStorage.getItem('AuthToken').startsWith('Bearer')){
        alertsContainerDOM.classList.remove('hidden');  
        signUpAlertDOM.classList.remove('hidden');  
    }
}

verifyToken();