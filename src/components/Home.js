import CourtsIndex from "./courts/CourtsIndex"

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
			<CourtsIndex msgAlert= { props.msgAlert }/>
			
		</> 
	)
}

export default Home
