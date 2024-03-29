import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { faPinterestSquare } from '@fortawesome/free-brands-svg-icons';

import quarterStar from '../../../../pix/svgs/starquarter.svg';
import threeQuarterStar from '../../../../pix/svgs/star3quarters.svg';
import star from '../../../../pix/svgs/star.svg';
import starEmpty from '../../../../pix/svgs/star-o.svg';
import starHalf from '../../../../pix/svgs/star-half-empty.svg';

class ProductInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ratingAvg: 0,
      ratingTotal: 0,
    };
  }

  componentDidMount() {
    this.getRatings();
  }

  componentDidUpdate(prevProps) {
    if (this.props.ratings !== prevProps.ratings) {

      if (Object.keys(this.props.ratings).length === 0) {
        this.setState({
          ratingAvg: 0,
          ratingTotal: 0,
        })
      } else {
        this.getRatings();
      }
    }
  }

  renderStars() {
    let stars = [];
    let avg = this.state.ratingAvg;
    let whole = Math.floor(avg);
    let float = avg % 1;

    while (stars.length < whole) {
      stars.push(<img src={ star }/>)
    }

    if (float > 0 && float <= 0.33) {
      stars.push(<img src={ quarterStar }/>)
    } else if (float > 0.33 && float <= 0.67) {
      stars.push(<img src={ starHalf }/>)
    } else if (float > 0.67 && float < 1) {
      stars.push(<img src={ threeQuarterStar }/>)
    }

    while (stars.length < 5) {
      stars.push(<img src={ starEmpty }/>)
    }

    return stars;
  }

  getRatings() {
    const keys = Object.keys(this.props.ratings);
    if (keys.length === 0) return 'No reviews yet';
    let total = 0;
    let count = 0;
    keys.map((key) => {
      total += Number(key) * Number(this.props.ratings[key]);
      count += Number(this.props.ratings[key]);
    })
    let avg = (total / count).toFixed(1);
    this.setState({
      ratingAvg: avg,
      ratingTotal: count,
    })
  }

  render() {
    return(
      <div id="product-info">
         { this.state.ratingAvg !== 0 ? <p className="avg-rating">Average rating: { this.state.ratingAvg }</p> : <p className="avg-rating">Average rating: No reviews yet</p>}
         { this.state.ratingTotal !== 0 && <a className="reviews-link" href="#reviews" onClick={ this.props.interact } >See all { this.state.ratingTotal } reviews</a>}
         { this.renderStars() }
        <p className="category">{ this.props.product.category }</p>
        <h3 className="product-name">{ this.props.product.name }</h3>

        { this.props.styles[this.props.currentStyle].sale_price ?
        <>
        <p className="original-price">{ '$' + this.props.styles[this.props.currentStyle].original_price }</p>
        <p className="sale-price" >{ '$' + this.props.styles[this.props.currentStyle].sale_price }</p>
        </> :
        <p className="regular-price">{ '$' + this.props.styles[this.props.currentStyle].original_price }</p> }
        <div>
          <a href="/" className="brand"><FontAwesomeIcon icon={faFacebookSquare} onClick={ this.props.interact } /></a>
          <a href="/" className="brand"><FontAwesomeIcon icon={faTwitterSquare} onClick={ this.props.interact } /></a>
          <a href="/" className="brand"><FontAwesomeIcon icon={faPinterestSquare} onClick={ this.props.interact } /></a>
        </div>
        <p><strong>Style > </strong>{ this.props.styles[this.props.currentStyle].name }</p>
      </div>
    )
  }
}

export default ProductInfo;
