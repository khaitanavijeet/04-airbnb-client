import React from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import GoogleMap from 'google-map-react'
import '../styles/cards.css'
import '../styles/grid.css'
import '../styles/maps.css'
import '../styles/nav.css'
import Thumbnail from './Thumbnail.js'
import { withRouter } from 'react-router-dom'

class Houses extends React.Component {
	constructor(props) {
		super(props)
		this.co = 7;
		this.u = this.u.bind(this)
		this.priceMax = this.priceMax.bind(this)
		this.filter = this.filter.bind(this)
		this.keyup = this.keyup.bind(this)
		this.typesFilter = this.typesFilter.bind(this)
		this.filterBr = this.filterBr.bind(this)
}
	state = {
		search:'',
		bed: 1,
		array1: ['1','2','3','4','5','6'],
		type:'All Types',
		types:[],
		priceM : 1000,
		value : 'cc',
		rating:0,
		houses: [],
		map: {
			key: {
				key: 'AIzaSyBKMVj4gaJLU9GTV1zOaWQj7ggKVbXQep0'
			},
			center: {
				lat: -8.652,
				lng: 115.137
			},
			zoom: 14
		}
	}
	u(){
		axios
			.get(`${process.env.REACT_APP_API}/houses`)
			.then(res => {
				this.setState({
					houses : res.data
				})
			})
	}
	filter(){
		this.u()
		let bdf = []
		let val = this.state.bed
		axios
			.get(`${process.env.REACT_APP_API}/houses`)
			.then(res => {
				this.state.houses.map(house=>{
					if(this.state.type === 'All Types'){
						console.log(this.state.type);
						if(house.bedrooms >= val && house.price <= this.state.priceM ){
							bdf.push(house)
						}
				}
				else{
					console.log(this.state.type);
					if(house.bedrooms >= val && house.price <= this.state.priceM && house.type.name === this.state.type){
						bdf.push(house)
					}
				}
				})
				this.setState({
					houses: bdf
				})
			})
			.catch( err => {
					console.log(err);
			})

	}
typesFilter(event){
	console.log(event.target.value);
	this.setState({
		type: event.target.value
	})
}
types(){
	let typesAr =[]
	for(let i =0; i< this.state.types.length; i++){
		let type = this.state.types[i]
		let op = <option> {type} </option>
		typesAr.push(op)
	}
	return(typesAr)
}
priceMax(event){
	if (event.target.value !==""){
		this.setState({
			priceM : event.target.value
		})
	}
	else if( event.target.value === ''){
		this.setState({
			priceM : 1000
		})	}
	event.preventDefault()

}
filterBr(event){
	this.setState({
		bed : event.target.value
	})
}
	keyup(event){
		let arr = []
		let inpu = document.getElementById('inp').value
		axios
			.get(`${process.env.REACT_APP_API}/houses`)
			.then(res => {
				res.data.map(house=>{
					let title = house.title.toLowerCase()
					let city = house.city.toLowerCase()
					let region = house.region.toLowerCase()
					if(title.includes(inpu) || city.includes(inpu) || region.includes(inpu)){
						arr.push(house)
					}
				})
				this.setState({
					houses:arr
				})
			})
			.catch(err=>{
				console.log('error');
			})


			event.preventDefault();

	}
	componentWillMount() {
		axios
			.get(`${process.env.REACT_APP_API}/houses`)
			.then(res => {
				console.log(res.data);
				let p=0 ;
				res.data.map(house=>{
					if (house.price>p){
						p =house.price
					}
				})
				this.setState({
					houses: res.data,
					priceM: p
				})

			})
			.catch(err => {
				console.log({ err })
			})
	}
	componentDidMount(){
		axios
		.get(`${process.env.REACT_APP_API}/types`)
		.then(res=>{
			let typesArray =[]
			res.data.map(type=>{
				typesArray.push(type.name)
			})
			this.setState({
				types: typesArray
			})
		})
	}
	render() {
		return (
			<>
			<div>

			</div>
				<nav>
					<Link to="/" className="logo"></Link>
					<div className="profile">
						<Link to="/plus" className="button">
							<span>Airbnb Plus</span>
						</Link>
					</div>
				</nav>
				<div className="filters" id = 'thisone'>
					<select onChange={this.filterBr}>
				{
					this.state.array1.map((house,index)=>(
						<option value={index+1} >Min Bedrooms: {index+1}</option>
					))
				}
					</select>
					<select onChange ={this.typesFilter}>
						<option value="All Types">All Types</option>
						{this.types()}
					</select>
					<input type="number" onChange = {this.priceMax} placeholder="max price" />
					<select>
						<option value="price">Lowest Price</option>
						<option value="rating">Highest Rating</option>
					</select>
					<button onClick = {this.filter}> Search </button>
					<form onSubmit = {this.keyup}>
						<input type="text" id ='inp' className="search" placeholder="Search..." />
					</form>
				</div>
				<div className="grid map">

					<div className="grid four large">
						{// List of thumbnails
						this.state.houses.map((house,index) => (
							<Thumbnail house_id = {house._id} house_city ={house.city} house_region ={house.region} house_price ={house.price} house_rating ={house.rating} house_image ={house.image} house_bedrooms ={house.bedrooms} house_title ={house.title} />
						))}
					</div>
					<div className="map">
						<GoogleMap
							bootstrapURLKeys={this.state.map.key}
							center={this.state.map.center}
							zoom={this.state.map.zoom}
						>
						</GoogleMap>
					</div>
				</div>
			</>
		)

	}

}

export default withRouter(Houses)
