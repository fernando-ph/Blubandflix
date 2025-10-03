import React, { useState } from "react";
import NavAdmin from "../../Component/NavbarAdmin";
import { Nav} from "react-bootstrap"
import AddTV from "../../Component/Add FIlm/Add-TV"
import AddMovie from "../../Component/Add FIlm/Add-Movies"

export default function AddFilm() {
    const [showComponentA, setShowComponentA] = useState(true);


    return (
        <>
        <NavAdmin />
        <div className="pt-3 ps-3" style={{backgroundColor:"black"}}>
        <button className="ps-5 pe-5 pt-2 pb-2 rounded fw-bold" onClick={() => setShowComponentA(!showComponentA)} style={{backgroundColor:"red", border:"none", color:"white"}}>
                Change Type Film
        </button>
        </div>
             
            {showComponentA && <AddTV />}
            {!showComponentA && <AddMovie />}

        
        </>
    )
}

