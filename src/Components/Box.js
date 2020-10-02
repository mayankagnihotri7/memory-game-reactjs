import React from "react";

function Box({ id, isClicked, name, icon, click }) {
  return (
    <div>
      {/* <li onClick={() => click(id, name)} className="card">
        {!isClicked ? <span></span> : <div className="card">{icon}</div>}
      </li> */}
      
    </div>
  );
}

export default Box;
