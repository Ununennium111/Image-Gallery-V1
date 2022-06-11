const formDOM = document.getElementById('form-upload');
const alertDOM = document.getElementById('alert-p-upload');
const imageInputDOM = document.getElementById('dropzone-image-upload');

formDOM.addEventListener('submit', async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('AuthToken');
    const file = imageInputDOM.files[0];

    let formdata = new FormData();

    formdata.append('image', file);

    try {
        if(!alertDOM.classList.contains('hidden')){
            alertDOM.classList.add('hidden');
        }

        const response = await axios.post('api/v1/image/upload', formdata, {
            headers: {
                'Authorization': token
            }
        });

        imageInputDOM.value = null;

        const imageURL = response.data.image.src;

        await axios.post('api/v1/image', { 'image': imageURL }, {
            headers: {
                'Authorization': token
            }
        });
    } catch (error) {
        const message = error.response.data.msg;
        
        alertDOM.classList.remove('hidden');
        alertDOM.innerHTML = message;
    }
});

function verifyToken() {
    if (!localStorage.getItem('AuthToken') || !localStorage.getItem('AuthToken').startsWith('Bearer')) {
        window.location.replace('./index.html');
    }
}

verifyToken();