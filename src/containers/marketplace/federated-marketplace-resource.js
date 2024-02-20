
import React, { Fragment } from "react";
import classes from "./Movie.module.css";
import { truncStr } from "./utils";
import { DivNomeCarrinho }  from "./styles/DivNomeCarrinho";
import {Sectionn } from "./styles/Sectionn";
import {DivSacolaVazia } from "./styles/DivSacolaVazia";
import {DivCardCarrinho } from "./styles/DivCardCarrinho";
import {Aside } from "./styles/Aside";






//import { DivCard, DivContainer, DivContainerImg, DivInfo } from "./styles/styleCard";


const imagePath = "/assets/img/resources.png";
const imageWidth  = "200px";
const imageHeight = "100px";
const FederatedMarketPlaceResource = (props) => {
//{ id, name, description,details }

//USE THIS FOR CLICK:https://github.com/Glauco-Lustosa/Movie-Selector/blob/main/movie-selector/src/components/MovieList.js
return (
    <Fragment>
    <div className="tc bg-white dib br3 pa3 ma2 grow bw2 shadow-5" style={{backgroundColor: props.backgroundColor,borderRadius: props.borderSize,border: '2px solid #27ae60', width: "280px", height: "220px"}} onClick={() => props.handleFederatedMarketResourceSelectClick(props.id,props.name,props.observations,props.description,props.details,props.price,props.from,props.to,props.streamingAvailability,props.location,props.frequency,props.numberOfObservations)}>
    	<img className="br-100 h4 w4 dib"   src={process.env.PUBLIC_URL + imagePath} />
      	<div>
    	  <p style={{color: "#000000"}}><strong>{props.name}</strong></p>
    	 {/* REMOVED <p style={{color: "#0000FF"}}><strong>{props.price} FedCoins</strong></p>*/}
    	  <button style={{backgroundColor:"#27ae60", color: "#FFFFFF",borderRadius: "8px",border: '2px solid #27ae60'}} onClick={() => props.handleFederatedMarketResourceAddToProductClick(props)}> Add to product </button>
    	</div>
    </div>
    </Fragment>
  );


};

export default FederatedMarketPlaceResource;