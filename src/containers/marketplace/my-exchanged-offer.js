
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
const MyExchangeOffer = (props) => {
//{ id, name, description,details }

//USE THIS FOR CLICK:https://github.com/Glauco-Lustosa/Movie-Selector/blob/main/movie-selector/src/components/MovieList.js
return (
    <Fragment>
    <div className="tc bg-white dib br3 pa3 ma2 grow bw2 shadow-5" style={{border: '2px solid #27ae60', width: "500px", height: "305px"}}>
    	{/*<img className="br-100 h4 w4 dib"   src={process.env.PUBLIC_URL + imagePath} />*/}
      	<div>
      	 {props.myToken.owner === props.userId?
      	   <h4 style={{color: "#0000FF",marginTop:"-4px"}}><strong>My Proposal</strong></h4>:
      	   <h4 style={{color: "#0000FF",marginTop:"-4px"}}><strong>Foreign Proposal</strong></h4>
      	 }
    	  <h5 style={{color: "#0000FF",marginTop:"-4px"}}><strong>Date submitted: </strong>{props.dateSubmitted}</h5>
    	  <h5 style={{color: "#000000",marginTop:"-4px"}}><strong>Exchange offer id: </strong>{props.id} <strong>&nbsp;&nbsp;&nbsp; Status: </strong>{props.status}</h5>

    	  <div  style={{backgroundColor: "#9FE2BF",marginTop:"-4px",borderRadius: "8px",paddingBottom:"1px",paddingTop:"1px"}}>
    	  {props.targetToken.owner === props.userId?
    	   <h5 style={{color: "#000000",marginTop:"4px"}}><strong>My Token </strong></h5>:
    	   <h5 style={{color: "#000000",marginTop:"4px"}}><strong>Foreign Token</strong></h5>
    	   }
           <h5 style={{color: "#000000",marginTop:"-4px",textAlign:"left",marginLeft:"2px"}}><strong>Valid From:    </strong>{props.targetToken.dataAvailableFrom} <strong>to:</strong> {props.targetToken.dataAvailableUntil}</h5>
    	   <h5 style={{color: "#000000",marginTop:"-4px",textAlign:"left",marginLeft:"2px"}}><strong>Product id:    </strong>{props.targetToken.productId}<strong> &nbsp;&nbsp;&nbsp;&nbsp;Marketplace:  </strong>{props.targetToken.marketplaceId}</h5>
    	   <h5 style={{color: "#000000",marginTop:"-4px",textAlign:"left",marginLeft:"2px"}}><strong>Access Times:  </strong>{props.targetToken.accessTimes} <strong>&nbsp;&nbsp;&nbsp;&nbsp;Owner:  </strong>{props.targetToken.owner}</h5>
    	  </div>
          <div  style={{backgroundColor: "#6495ED",marginTop:"4px",borderRadius: "8px",paddingBottom:"1px",paddingTop:"1px"}}>
          {props.myToken.owner === props.userId?
       	   <h5 style={{color: "#000000",marginTop:"2px"}}><strong>My Token</strong></h5>:
       	   <h5 style={{color: "#000000",marginTop:"2px"}}><strong>Foreign Token</strong></h5>
       	   }
           <h5 style={{color: "#000000",marginTop:"-4px",textAlign:"left",marginLeft:"2px",}}><strong>Valid From:   </strong>{props.myToken.dataAvailableFrom} <strong>to:</strong> {props.myToken.dataAvailableUntil}</h5>
           <h5 style={{color: "#000000",marginTop:"-4px",textAlign:"left",marginLeft:"2px"}}><strong>Product id:    </strong>{props.myToken.productId}<strong> &nbsp;&nbsp;&nbsp;&nbsp;Marketplace:  </strong>{props.myToken.marketplaceId}</h5>
           <h5 style={{color: "#000000",marginTop:"-4px",textAlign:"left",marginLeft:"2px"}}><strong>Access Times:  </strong>{props.myToken.accessTimes} <strong>&nbsp;&nbsp;&nbsp;&nbsp;Owner:  </strong>{props.myToken.owner}</h5>
          </div>


    {/*//////////////////////////////////////////////////////*/}


    {props.myToken.owner === props.userId?
     <div>
      {/*My Proposal*/}
      {props.status==="pending"?
        <div>
      	  <button style={{backgroundColor:"#27ae60", color: "#FFFFFF",borderRadius: "8px",border: '2px solid #27ae60',marginLeft:"10px",marginTop:"5px"}} onClick={() => props.handleCancelButtonPressed(props)}> Cancel </button>
        </div>:
        <div>
       	  <button style={{cursor:'none',backgroundColor:"#FFFFFF", color: "#FFFFFF",border: '2px solid #FFFFFF',marginTop:"5px"}} onClick={() => props.handleAcceptButtonPressed(props)}> Accept </button>
      	  <button style={{cursor:'none',backgroundColor:"#FFFFFF", color: "#FFFFFF",border: '2px solid #FFFFFF',marginLeft:"10px",marginTop:"5px"}} onClick={() => props.handleCancelButtonPressed(props)}> Cancel </button>
       	  <button style={{cursor:'none',backgroundColor:"#FFFFFF", color: "#FFFFFF",border: '2px solid #FFFFFF',marginLeft:"10px",marginTop:"5px"}} onClick={() => props.handleDeclineButtonPressed(props)}> Decline </button>
        </div>
       }{/*props.status===pending*/}
       </div>:
       <div>{/*Foreign proposal*/}
         {props.status==="pending"?
          <div>
            <button style={{backgroundColor:"#0000ff", color: "#FFFFFF",borderRadius: "8px",border: '2px solid #0000ff',marginTop:"8px"}} onClick={() => props.handleAcceptButtonPressed(props)}> Accept </button>
            <button style={{backgroundColor:"#ff0000", color: "#FFFFFF",borderRadius: "8px",border: '2px solid #ff0000',marginLeft:"10px",marginTop:"8px"}} onClick={() => props.handleDeclineButtonPressed(props)}> Reject </button>
          </div>:
          <div>
            <button style={{cursor:'none',backgroundColor:"#FFFFFF", color: "#FFFFFF",border: '2px solid #FFFFFF',marginTop:"5px"}} onClick={() => props.handleAcceptButtonPressed(props)}> Accept </button>
            <button style={{cursor:'none',backgroundColor:"#FFFFFF", color: "#FFFFFF",border: '2px solid #FFFFFF',marginLeft:"10px",marginTop:"5px"}} onClick={() => props.handleCancelButtonPressed(props)}> Cancel </button>
            <button style={{cursor:'none',backgroundColor:"#FFFFFF", color: "#FFFFFF",border: '2px solid #FFFFFF',marginLeft:"10px",marginTop:"5px"}} onClick={() => props.handleDeclineButtonPressed(props)}> Decline </button>
          </div>
         }

       {/**/}
      </div>

    }{/*props.myToken.owner === props.userId*/}


 </div>
    	</div>
    </Fragment>
  );


};

export default MyExchangeOffer;