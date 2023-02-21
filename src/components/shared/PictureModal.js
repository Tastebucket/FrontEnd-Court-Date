import { Carousel, Modal } from "react-bootstrap"


const PictureModal = (props) => {
    const { show, pictures, handleClose } = props
    const pictureCarousel = pictures.map(picture =>{
        return(
            <Carousel.Item>
                <img 
                className="d-block w-100"
                src={picture}/>
            </Carousel.Item>
        )
    }

    )
    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Carousel>
                {pictureCarousel}
            </Carousel>
        </Modal>
    )
}

export default PictureModalg