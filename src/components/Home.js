import CourtsIndex from "./courts/CourtsIndex"
import IndexMap from './maps/IndexMap.js'
import '../index.css'

const Home = (props) => {
	const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
			
			<CourtsIndex className='background' msgAlert= { props.msgAlert } user={user}/>
			
		</> 
	)
}

export default Home
