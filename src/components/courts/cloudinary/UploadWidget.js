import { useEffect, useRef } from "react"
import { v2 as cloudinary} from 'cloudinary'



const UploadWidget = () => {
    const cloudinaryRef = useRef()
    const widgetRef = useRef()
    useEffect(()=> {
        cloudinaryRef.current = window.cloudinary
        console.log(window)
        console.log(cloudinary)
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'dcsbdscrq',
            uploadPreset: 'k83dfv5v'
        }, function(error, result) {
            console.log(result)
        })
    }, [])
    return (
        <button onClick={()=> {widgetRef.current.open()}}>
            Upload
        </button>
    )
}

export default UploadWidget

// const UploadPicture = () => {
//     console.log(cloudinary.uploader.upload)
// }

// export default UploadPicture