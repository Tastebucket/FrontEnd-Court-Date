import CourtsIndex from "./courts/CourtsIndex"
import Mapping from '../api/map.js'

const Home = (props) => {
	const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
			<Mapping />
			<CourtsIndex msgAlert= { props.msgAlert }/>
		</>
	)
}

export default Home
