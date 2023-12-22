import "./searchItem.css";

const SearchItem = (props) => {
  return (
    <div className="row col-lg-4">
    <div className="searchItem">
      <img
        src={props.image}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{props.name}</h1>
        <span className="siDistance">{props.location}</span>
        
        <span className="siSubtitle">
          {props.gsports}
        </span>
        <span className="siTime">opens at 9.00 AM</span>
        <span className="siCancelOp">Arranges at your Time  </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>Excellent</span>
          <button>{props.Ratings} ⭐</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">Rs. {props.price}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="siCheckButton">See availability</button>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default SearchItem;