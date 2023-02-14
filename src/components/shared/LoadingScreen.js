import Spinner from 'react-bootstrap/Spinner'

const LoadingScreen = () => (
    <div className="container-sm" style={{ textAlign: 'center'}}>
        <Spinner role="status" animation="border"/>
    </div>
)

export default LoadingScreen