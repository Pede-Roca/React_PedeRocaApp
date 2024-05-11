import React, { useState } from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '../../firebase/config'

const ImgUpload = () => {
    const [imgURL, setImgURL] = useState("")
    const [progress, setProgress] = useState(0)

    const handleUpload = e => {
        e.preventDefault()
        const file = e.target.files && e.target.files[0]?.files[0]
        if (!file) return;

        const storageRef = ref(storage, `images/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setProgress(progress)
        }, error => {
            alert(error)
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(url => {
                setImgURL(url)
            })
        })
    }
  return (
    <>
        <form onSubmit={handleUpload}>
            <input type="file" />
            <button type='submit'>Enviar</button>
        </form>
        <br />
        {!imgURL && <progress value={progress} max='100' />}
        {imgURL && <img src={imgURL} alt='Uploaded' />}
    </>


  )
}

export default ImgUpload
