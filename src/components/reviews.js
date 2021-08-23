import React from 'react'
import '../styles/review.css'
class Reviews extends React.Component {
  render(){
    return(
      <div className="reviews">
        <h2>
          {`${this.props.reviews_length} `}
          Reviews
        </h2>
        {this.props.reviews.map((review, i) => {
          return (
            <div className="card review" key={i}>
              <div className="content">
                <div className="user">
                  <div className="avatar"></div>
                  <div className="name">
                    <span>{review.author.name}</span>
                    <small>{review.author.location}</small>
                  </div>
                </div>
                <div className="rating">
                {function (){
                  let stars=[]
                  for (let i =0; i < review.rating ;i++){
                    stars.push(<i className ='fas fa-star fa-xs'></i>)
                  }
                  for (let i =0; i < 5-(review.rating) ;i++){
                    stars.push(<i className ='far fa-star fa-xs'></i>)
                  }
                  return(stars)
                }()}
                </div>
                <p>{review.content}</p>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Reviews
