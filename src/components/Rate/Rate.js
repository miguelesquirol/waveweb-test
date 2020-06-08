import React from "react";
import "./Rate.scss";
import Star from "../../assets/star.svg";
import StarHover from "../../assets/star-hover.svg";



  class Rate extends React.Component {

    

  state = {
    open: true
  }
  sendVote = () => {
    this.setState(state => ({ open: !state.open }))
    console.log("Vote Sent")
  }

  getImageName = () => this.state.open ? Star : StarHover

  render() {
    const imageName = this.getImageName();

  return (

   <div className="Rate">
       <img  src={imageName} onClick={this.sendVote} />

   </div>

  )}
};

export default Rate;
