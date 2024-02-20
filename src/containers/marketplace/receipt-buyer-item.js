
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
const ReceiptBuyerItem = (props) => {
//{ id, name, description,details }

//USE THIS FOR CLICK:https://github.com/Glauco-Lustosa/Movie-Selector/blob/main/movie-selector/src/components/MovieList.js
return (
    <Fragment>
    <div className="tc bg-white dib br3 pa3 ma2 grow bw2 shadow-5" style={{backgroundColor:props.backgroundColor,borderRadius: props.borderSize,border: '2px solid #27ae60', width: "700px", height: "130px"}}>
    	{/*<img className="br-100 h4 w4 dib"   src={process.env.PUBLIC_URL + imagePath} />*/}
      	<div>
    	  <h5 style={{color: "#0000FF",marginTop:"-4px",textAlign:"left"}}><strong>Transaction ID </strong> {props.transactionId}</h5>
    	  <h5 style={{color: "#000000",marginTop:"-4px",textAlign:"left"}}><strong>Product id: </strong>{props.productId}</h5>
    	  <h5 style={{color: "#000000",marginTop:"-4px",textAlign:"left"}}><strong>Seller: </strong> {props.seller}</h5>
    	  <h5 style={{color: "#000000",marginTop:"-4px",textAlign:"left"}}><strong>Buyer: </strong> {props.buyer}</h5>
    	  <h5 style={{color: "#000000",marginTop:"-4px",textAlign:"left"}}><strong>Date Bought:</strong> {props.dateBought}</h5>
    	  <button style={{backgroundColor:"#27ae60",marginTop:"-15px", color: "#FFFFFF",borderRadius: "4px",border: '2px solid #27ae60',float:"right"}} onClick={() => props.handleVerifyButtonPressed(props)}> Verify </button>

    	</div>
    </div>
    </Fragment>
  );


};

export default ReceiptBuyerItem;