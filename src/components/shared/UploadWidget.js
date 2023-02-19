import { useEffect,useRef } from "react"
import { Button } from "react-bootstrap"

const UploadWidget = (props) => {
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
        <Button className="m-2" onClick={()=> widgetRef.current.open()}>Upload Picture</Button>
    )
}

export default UploadWidget