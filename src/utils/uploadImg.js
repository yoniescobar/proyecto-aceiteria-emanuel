import { storage } from '../Servicios/firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const subirImagen = async (imgArticulo) => {
    let url = "";
    try {
        const storageRef = ref(storage, 'files/' + imgArticulo.name);
        const uploadTask = uploadBytesResumable(storageRef, imgArticulo);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                console.log(error);
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;
                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    url = downloadURL;
                });
            }
        );

        return url;
    } catch (error) {
        console.log(error)
        return '';
    }
};
