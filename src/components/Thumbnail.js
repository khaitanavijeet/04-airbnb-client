import React from 'react';
import { Link } from 'react-router-dom'
/*
house_image
id
typename
Bedrooms
title
city
region
price
rating
*/
class Thumbnail extends React.Component {
  constructor(props) {
		super(props)
    this.star = this.star.bind(this)
  }
 state :{
   rating : 4
 }

 star (rate){
   let stars=[]
   for (let i =0; i < rate ;i++){
     stars.push(<i className ='fas fa-star fa-xs'></i>)
   }
   for (let i =0; i < 5-(rate) ;i++){
     stars.push(<i className ='far fa-star fa-xs'></i>)
   }
   return(stars)
 }
  render() {

    return (
      <>
      <Link
        className="card link"
        to={`/houses/${this.props.house_id}`}
        key={this.props.house_id}
      >
        <div className="image">
          <img id ='img' src ={this.props.house_image}  alt= 'of house'/>
        </div>
        <div className="content">
          <small className="meta">
            {this.props.house_type_name} • {this.props.house_bedrooms} Bedrooms
          </small>
          <h2>{this.props.house_title}</h2>
          <small className="location">
            <i className="fas fa-map-marker-alt"></i>
            <span>
              {this.props.house_city}, {this.props.house_region}
            </span>
          </small>
          <span className="price">${this.props.house_price}/night</span>
          {this.star(this.props.house_rating)}
        </div>
      </Link>
      </>
    )
  }

}
export default Thumbnail
