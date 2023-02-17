import { useEffect,useRef } from "react"

const UploadWidget = () => {
    const cloudinaryRef = useRef()
    const widgetRef = useRef()
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD,
            uploadPreset: process.env.REACT_APP_UPLOAD_PRESET
        }, function(error, result) {
            console.log('this is result', result)
            console.log('env stuff', process.env)
            if (result.event === 'success'){
                console.log('this is result url', result.info.secure_url)
            }
        })
    }, [])
    return (
        <button onClick={()=> widgetRef.current.open()}>Upload</button>
    )
}

export default UploadWidget