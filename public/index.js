const alertsContainerDOM = document.getElementById('alerts-container-div');
const signUpAlertDOM = document.getElementById('sign-up-alert-div');
const uploadAlertDOM = document.getElementById('upload-alert-div');
const imagesContainerDOM = document.getElementById('images-container-div');

function verifyToken() {
    if (!localStorage.getItem('AuthToken') || !localStorage.getItem('AuthToken').startsWith('Bearer')) {
        alertsContainerDOM.classList.remove('hidden');
        signUpAlertDOM.classList.remove('hidden');
    }
}

const getImages = async () => {
    const token = localStorage.getItem('AuthToken');

    try {
        const { data: { images } } = await axios.get('api/v1/image', {
            headers: {
                'Authorization': token
            }
        });

        if (images.length === 0) {
            alertsContainerDOM.classList.remove('hidden');
            uploadAlertDOM.classList.remove('hidden');
        }

        const allImages = images.map((singleImage) => {
            const { image } = singleImage;

            return `<div class="w-fit h-fit border rounded-lg overflow-hidden shadow-xl"><img class="w-full" src="${image}"></div>`;
        }).join('');

        //console.log(allImages)

        imagesContainerDOM.innerHTML = allImages;        

    } catch (error) {
        console.log(error)
    }
}

verifyToken();
getImages();