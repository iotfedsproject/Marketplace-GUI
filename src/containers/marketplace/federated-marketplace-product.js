
import React, { Fragment } from "react";
import classes from "./Movie.module.css";
import { truncStr } from "./utils";
import { DivNomeCarrinho }  from "./styles/DivNomeCarrinho";
import {Sectionn } from "./styles/Sectionn";
import {DivSacolaVazia } from "./styles/DivSacolaVazia";
import {DivCardCarrinho } from "./styles/DivCardCarrinho";
import {Aside } from "./styles/Aside";






//import { DivCard, DivContainer, DivContainerImg, DivInfo } from "./styles/styleCard";


const imagePath = "/assets/img/product.png";
const imageWidth  = "200px";
const imageHeight = "200px";
const FederatedMarketPlaceProduct = (props) => {
//{ id, name, description,details }

//USE THIS FOR CLICK:https://github.com/Glauco-Lustosa/Movie-Selector/blob/main/movie-selector/src/components/MovieList.js
return (
    <Fragment>
    <div className="tc bg-white dib br3 pa3 ma2 grow bw2 shadow-5" style={{backgroundColor: props.backgroundColor,borderRadius: props.borderSize,border: '2px solid #27ae60',width: props.itemWidth + "px", height: props.itemHeight + "px"}} onClick={() => props.handleFederatedMarketProductClick(props.id,props.name,props.description,props.details,props.price,props.from,props.to,props.streamingAvailability,props.frequency,props.vertical,props.maxNumberOfObservations,props.observedProperties,props.seller,props.boughtByMe)}>
    	<img className="br-100 h4 w4 dib"   src={process.env.PUBLIC_URL + imagePath} />
      	<div>
    	  <p style={{color: "#0000FF"}}><strong>{props.name}</strong></p>
    	  <p style={{color: "#0000FF"}}><strong>{props.boughtByMe}</strong></p>
    	  {props.seller === props.buyer?
    	    <button style={{backgroundColor:"#27ae60", color: "#FFFFFF",borderRadius: "8px",border: '2px solid #27ae60'}} onClick={() => props.handleFederatedMarketProductDeleteClick(props.id)}> Delete Product</button>
    	   :<button style={{cursor:'none',backgroundColor: props.backgroundColor,borderRadius: "1px",border: '0px solid #6495ED'}} onClick={() => props.handleFederatedMarketProductDeleteClick(props.id)}></button>

    	  }
    	</div>
    </div>
    </Fragment>
  );


};

export default FederatedMarketPlaceProduct;