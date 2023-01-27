// import { useState, useEffect } from 'react'
// import { fbStorage, fbFirestore, timeStamp } from '../../Servicios/firebase'

// const useStorage = (file) => {
// 	const [progress, setProgress] = useState(0)
// 	const [error, setError] = useState(null)
// 	const [url, setUrl] = useState(null)

// 	// useEffect se ejecutara cada vez que file cambie de valor
// 	useEffect(() => {
// 		// references
// 		const storageRef = fbStorage.ref(file.name)
// 		const collectionRef = fbFirestore.collection('images')

// 		// subimos la imagen, suceden ciertas cosas
// 		storageRef.put(file).on(
// 			'state_changed',
// 			(snap) => {
// 				let percentage = (snap.bytesTransferred / snap.totalBytes) * 100
// 				setProgress(percentage)
// 			},
// 			(err) => {
// 				setError(err)
// 			},
// 			async () => {
// 				const url = await storageRef.getDownloadURL()
// 				const createdAt = timeStamp()
// 				collectionRef.add({ url, createdAt })
// 				setUrl(url)
// 			}
// 		)
// 	}, [file])

// 	return { progress, url, error }
// }

// export default useStorage


import { useState, useEffect } from 'react'
import { imagesRef } from '../../Servicios/firebase'
import { ref } from "firebase/storage";

export const useStorage = imgArticulo => {
	const [url, setUrl] = useState(null)

	useEffect(() => {
		// references
		// const storageRef = fbStorage.ref(file.name)
		// const collectionRef = fbFirestore.collection('images')

		const fileName = imgArticulo.name;
		const spaceRef = ref(imagesRef, fileName);

		// File path is 'images/space.jpg'
		const url = spaceRef.fullPath;
		setUrl(url)
		
		// File name is 'space.jpg'
		const name = spaceRef.name;

		// Points to 'images'
		const imagesRefAgain = spaceRef.parent
	}, [imgArticulo])

	return { url }
};

//export default useStorage