import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Thumbnail from './Thumbnail.js'
class Favorites extends React.Component {
	state = {
		houses: []
	}
	componentWillMount() {
		axios
			.get(`${process.env.REACT_APP_API}/houses?plus=true`)
			.then(res => {
				this.setState({ houses: res.data })
			})
			.catch(err => {
				console.log(err)
			})
	}
	render() {
		return (
			<>
				<nav>
					<Link to="/" className="logo"></Link>
					<div className="profile">
						<Link to="/plus" className="button">
							<span>Airbnb Plus</span>
						</Link>
					</div>
				</nav>
				<div className="narrow">
					<div className="grid four large">
						{// List of thumbnails
						this.state.houses.map(house => (
							<Thumbnail house_id = {house._id} house_city ={house.city} house_region ={house.region} house_price ={house.price} house_rating ={house.rating} house_image ={house.image} house_bedrooms ={house.Bedrooms} house_title ={house.title} house_type_name ={house.type.name} />

						))}
					</div>
				</div>
			</>
		)
	}
}

export default Favorites
