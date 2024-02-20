
import React, { Fragment } from "react";
import classes from "./Movie.module.css";
import { truncStr } from "./utils";



const imagePath = "/assets/img/federated-marketplace-item.png";
const imageWidth  = "144px";
const imageHeight = "70px";
const FederationMarketPlaceItem = (props) => {
//{ id, name, description,details }
//USE THIS FOR CLICK:https://github.com/Glauco-Lustosa/Movie-Selector/blob/main/movie-selector/src/components/MovieList.js
return (
    <Fragment>
    <div className="tc bg-white dib br3 pa3 ma2 grow bw2 shadow-5" style={{width: props.itemWidth + "px"}} onClick={() => props.handleFederatedMarketPlaceClick(props.id,props.name)}>
    	<img className="br-100 h4 w4 dib"   src={process.env.PUBLIC_URL + imagePath} />
      	<div>
    	  <p><strong>{props.name}</strong></p>
    	</div>
    </div>
    </Fragment>
  );


};

export default FederationMarketPlaceItem;