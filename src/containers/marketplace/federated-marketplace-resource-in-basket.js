
import React, { Fragment } from "react";
import classes from "./Movie.module.css";
import { truncStr } from "./utils";
import { DivNomeCarrinho }  from "./styles/DivNomeCarrinho";
import {Sectionn } from "./styles/Sectionn";
import {DivSacolaVazia } from "./styles/DivSacolaVazia";
import {DivCardCarrinho } from "./styles/DivCardCarrinho";
import {Aside } from "./styles/Aside";


//import { DivCard, DivContainer, DivContainerImg, DivInfo } from "./styles/styleCard";


const imagePath = "/assets/img/federated-product.png";
const imageWidth  = "144px";
const imageHeight = "70px";
const FederatedMarketResourceInBasket = (props) => {
//{ id, name, description,details }

//USE THIS FOR CLICK:https://github.com/Glauco-Lustosa/Movie-Selector/blob/main/movie-selector/src/components/MovieList.js
return (
    <Fragment>
    <div className="tc bg-white dib br3 pa3 ma2 grow bw2 shadow-5" style={{width: props.itemWidth + "px", height: props.itemHeight + "px"}} >
      	<div>
      	  {/*<p style={{color: "#000000"}}><strong>{props.id}</strong></p>*/}
    	  <p style={{color: "#000000"}}><strong>{props.name}</strong></p>
    	 {/*REMOVED <p style={{color: "#0000FF"}} ><strong>{props.price} FedCoins</strong></p>*/}
    	  <button style={{backgroundColor:"#FF0000", color: "#FFFFFF",borderRadius: "8px",border: '2px solid #FF0000'}} onClick={() => props.handleFederatedMarketResourceRemoveFromBasketClick(props.id,props)}> Remove  </button>
    	</div>
    </div>
    </Fragment>
  );


};

export default FederatedMarketResourceInBasket;