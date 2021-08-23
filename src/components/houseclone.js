

import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

// Components
import Thumbnail from './Thumbnail.js'
import Reviews from './reviews.js'
import Houses from './Houses.js'
// CSS
import '../styles/cards.css'
import '../styles/grid.css'
import '../styles/users.css'
import '../styles/nav.css'
import '../styles/gallery.css'
import '../styles/review.css'

class House extends React.Component {
	constructor(props) {
		super(props)
}
state ={
	url : "https://www.youtube.com/embed"
}
componentWillMount(){
	console.log(this.props);
}
	render() {
		return (
			<>
			<iframe
			width="560"
			height="315"
			src={`https://www.youtube.com/embed/${this.props.match.params.id}`}
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen = True>
			</iframe>
			</>
		)
	}
}

export default House
