import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import CircleLoader from "react-spinners/CircleLoader";
import SyncLoader from "react-spinners/SyncLoader";
import GridLoader from "react-spinners/GridLoader";


const override = {
  display: "absolute",
  position:"absolute",
  top:"0",
  bottom:"0",
  left:"0",
  right:"0",
  margin: "auto"
};

export default function Load(){
    
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#191919");

    return (
        <div className="sweetloading">
        
        <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
        
        </div>
        )
}