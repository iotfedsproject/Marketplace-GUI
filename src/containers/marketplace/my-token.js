
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
const MyToken = (props) => {
//{ id, name, description,details }

//USE THIS FOR CLICK:https://github.com/Glauco-Lustosa/Movie-Selector/blob/main/movie-selector/src/components/MovieList.js
return (
    <Fragment>
    <div className="tc bg-white dib br3 pa3 ma2 grow bw2 shadow-5" style={{backgroundColor:props.backgroundColor,borderRadius: props.borderSize,border: '2px solid #27ae60', width: "330px", height: "145px"}}>
    	{/*<img className="br-100 h4 w4 dib"   src={process.env.PUBLIC_URL + imagePath} />*/}
      	<div>
    	  {/*<h5 style={{color: "#0000FF",marginTop:"-4px"}}><strong>Owner: </strong>{props.owner}</h5>*/}
    	  <h5 style={{color: "#0000FF",marginTop:"-4px"}}><strong>Product id: </strong>{props.product}</h5>
    	  <h5 style={{color: "#000000",marginTop:"-4px",textAlign:'left'}}><strong>Marketplace:</strong> {props.marketplace}</h5>
    	  <h5 style={{color: "#000000",marginTop:"-4px",textAlign:'left'}}><strong>Available from : </strong>{props.from}</h5>
    	  <h5 style={{color: "#000000",marginTop:"-4px",textAlign:'left'}}><strong>Available till: </strong>{props.to}</h5>
    	  <h5 style={{color: "#000000",marginTop:"-4px",textAlign:'left'}}><strong>Access times:</strong> {props.accessTimes}</h5>
    	  {props.toBeExchanged === true?
    	  <div>
    	  {
    	   <button style={{backgroundColor:"#FF4500", color: "#FFFFFF",borderRadius: "8px",border: '2px solid #27ae60', marginLeft: '5px'}} onClick={() => props.handleRemoveTokenFromExchangeButtonPressed(props)}> Make it non Exchangeable </button>
    	   }
          </div>
    	  :<button style={{backgroundColor:"#3C565B", color: "#FFFFFF",borderRadius: "8px",border: '2px solid #27ae60'}} onClick={() => props.handleMakeExchangeTokenButtonPressed(props)}> Make it Exchangeable </button>
          }
    	</div>
    </div>
    </Fragment>
  );


};

export default MyToken;