
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

////////////////////////////////////
const date = new Date(props.dateSubmitted * 1000); // JavaScript Date object works with milliseconds, so multiply by 1000
console.log("dateParts = " + props.dateSubmitted);
  // Extract date components
  const year    = date.getFullYear();
  const month   = date.getMonth() + 1; // Months are zero-based, so add 1
  const day     = date.getDate();
  const hours   = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Format the date
  const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

///////////////////////////////////

//USE THIS FOR CLICK:https://github.com/Glauco-Lustosa/Movie-Selector/blob/main/movie-selector/src/components/MovieList.js
return (
    <Fragment>
    <div className="tc bg-white dib br3 pa3 ma2 grow bw2 shadow-5" style={{border: '2px solid #27ae60', width: "500px", height: "300px"}}>
    	{/*<img className="br-100 h4 w4 dib"   src={process.env.PUBLIC_URL + imagePath} />*/}
      	<div>
      	 {props.userId === props.userName?
      	   <h4 style={{color: "#0000FF",marginTop:"-4px"}}><strong>My Proposal</strong></h4>:
      	   <h4 style={{color: "#0000FF",marginTop:"-4px"}}><strong>Foreign Proposal</strong></h4>
      	 }
    	  <h5 style={{color: "#0000FF",marginTop:"-4px"}}><strong>Date submitted: </strong>{formattedDate} {formattedTime}</h5>
    	  <h5 style={{color: "#000000",marginTop:"-4px"}}><strong>Exchange offer id: </strong>{props.id} <strong>&nbsp;&nbsp;&nbsp; Status: </strong>{props.status}</h5>
    	  {props.accepted === true?
    	   <h5 style={{color: "#000000",marginTop:"-4px"}}><strong>Accepted: YES</strong>{props.accepted}</h5>:
    	   <h5 style={{color: "#000000",marginTop:"-4px"}}><strong>Accepted: NO</strong>{props.accepted}</h5>
    	  }

    	  <div  style={{backgroundColor: "#9FE2BF",marginTop:"-4px",borderRadius: "8px",paddingBottom:"1px",paddingTop:"1px"}}>
    	  {props.targetUserId === props.userName?
    	   <h5 style={{color: "#000000",marginTop:"4px"}}><strong>My Token </strong></h5>:
    	   <h5 style={{color: "#000000",marginTop:"4px"}}><strong>Foreign Token</strong></h5>
    	   }
    	   <h5 style={{color: "#000000",marginTop:"-4px",textAlign:"left",marginLeft:"2px"}}><strong>Product id:    </strong>{props.targetProductId} </h5>
    	   <h5 style={{color: "#000000",marginTop:"-4px",textAlign:"left",marginLeft:"2px"}}><strong>User :  </strong>{props.targetUserId} </h5>
    	  </div>
          <div  style={{backgroundColor: "#6495ED",marginTop:"4px",borderRadius: "8px",paddingBottom:"1px",paddingTop:"1px"}}>
          {props.userId === props.userName?
       	   <h5 style={{color: "#000000",marginTop:"2px"}}><strong>My Token</strong></h5>:
       	   <h5 style={{color: "#000000",marginTop:"2px"}}><strong>Foreign Token</strong></h5>
       	   }
           <h5 style={{color: "#000000",marginTop:"-4px",textAlign:"left",marginLeft:"2px"}}><strong>Product id:    </strong>{props.myProductId}</h5>
           <h5 style={{color: "#000000",marginTop:"-4px",textAlign:"left",marginLeft:"2px"}}><strong>User:  </strong>{props.userId} </h5>
          </div>


    {/*//////////////////////////////////////////////////////*/}


    {props.userId === props.userName?
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