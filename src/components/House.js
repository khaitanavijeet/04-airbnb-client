import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

// Components
import Reviews from './reviews.js'
// CSS
import '../styles/cards.css'
import '../styles/grid.css'
import '../styles/users.css'
import '../styles/nav.css'
import '../styles/gallery.css'
import '../styles/review.css'

class House extends React.Component {
	state = {
		house: {
			images: [],
			type: {
				name: ''
			},
			host: {
				name: '',
				avatar: ''
			},
			amenities: [],
			rating: 0
		},
		reviews: []
	}
	constructor(props) {
		super(props)
		this.star = this.star.bind(this)
		this.guests = this.guests.bind(this)
}
	guests(){
		let op = []

		for(let i = 1; i <= this.state.house.guests ;i++){
			op.push(<option value = {i}> guests {i} </option> )
		}
		return(op)
	}

	componentWillMount() {
		console.log(this.props);
		axios
			//.get(`${process.env.REACT_APP_API}/houses/5e4cd7195cb7b24bb0fd0bec`)
			.get(`${process.env.REACT_APP_API}/houses/${this.props.match.params.id}`)
			.then((res,req) => {
				this.setState({
					house: res.data
				})

			})
		axios
			.get(`${process.env.REACT_APP_API}/reviews/${this.props.match.params.id}`)
				.then((res,req)=>{
					this.setState({
						reviews : res.data
					})
				})
				.catch(err => {console.log(err);})
	}

	star(){
		let stars=[]
		for (let i =0; i < this.state.house.rating ;i++){
			stars.push(<i className ='fas fa-star fa-xs'></i>)
		}
		for (let i =0; i < 5-(this.state.house.rating) ;i++){
			stars.push(<i className ='far fa-star fa-xs'></i>)
		}
		return(stars)
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
				<div className="gallery">
					<div className="image-main" style={{ backgroundImage: `url(${this.state.house.images[0]}) `}}></div>
					<div className="previews">
						{this.state.house.images.map((image, i) => (
							<div style={{ backgroundImage:`url(${image})` }} className="preview" key={i}></div>
						))}
					</div>
				</div>
				<div className="grid medium">
					<div className="grid sidebar-right">
						<div className="content">
							<h1>{this.state.house.title}</h1>
							<small>
								<i className="fas fa-map-marker-alt"></i>
								<span>
									{this.state.house.city}, {this.state.house.region}
								</span>
							</small>
							<div className="user">
								<div className="avatar"></div>
								<div className="name">
									<small>Hosted by</small>
									<span>{this.state.house.host.name}</span>
								</div>
							</div>
							<div className="card specs">
								<div className="content">
									<ul className="grid two">
										<li>
											<i className="fas fa-fw fa-home"></i>
											{this.state.house.type.name}
										</li>
										<li>
											<i className="fas fa-fw fa-user-friends"></i>
											{this.state.house.guests} guests
										</li>
										<li>
											<i className="fas fa-fw fa-bed"></i>
											{this.state.house.bedrooms} bedrooms
										</li>
										<li>
											<i className="fas fa-fw fa-bath"></i>
											{this.state.house.bathrooms} bathrooms
										</li>
									</ul>
								</div>
							</div>
							<p>{this.state.house.description}</p>
							<h3>Amenities</h3>
							<div className="card specs">
								<div className="content">
									<ul className="grid two">
										{this.state.house.amenities.map((a, i) => {
											return (
												<li key={i}>
													<i className={`fas fa-fw fa-${a.icon}`}></i>
													{a.name}
												</li>
											)
										})}
									</ul>
								</div>
							</div>
						<Reviews reviews_length = {this.state.reviews.length} reviews = {this.state.reviews} />
						</div>
						<div className="sidebar">
							<div className="card shadow">
								<div className="content large">
									<h3>
										${this.state.house.price}
										<small>per night</small>
									</h3>
									<small>
									{this.star()}
										<span>{this.state.reviews.length} Reviews</span>
									</small>
									<form className="small">
										<div className="group">
											<label>Guests</label>
											<select>
											{this.guests()}
											</select>
										</div>
										<div className="group">
											<button className="secondary full" type="submit">
												Book this house
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}
}

export default House
