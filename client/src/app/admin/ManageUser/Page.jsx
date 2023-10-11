import React from "react";
import Image from "../../../util/Avater";
function Manage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height:'90vh',
        width:'100%'
      }}
    >
      <img style={{width:'500px',height:'500px'}} src={Image.coomingSoon} alt="" />
    </div>
  );
}

export default Manage;
