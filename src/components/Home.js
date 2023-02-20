import CourtsIndex from "./courts/CourtsIndex"
import Mapping from '../api/map.js'
import '../index.css'

const Home = (props) => {
	const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
			
			<CourtsIndex className='background' msgAlert= { props.msgAlert }/>
			
		</> 
	)
}

export default Home
