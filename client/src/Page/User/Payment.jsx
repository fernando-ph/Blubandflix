import React, { useEffect } from "react";
import NavUser from "../../Component/NavbarUser";
import { Button } from "react-bootstrap";
import {useMutation, useQuery} from "react-query"
import { API } from "../../Config/Api"
import { useNavigate } from "react-router-dom";


export default function Payment() {

    let navigate = useNavigate()
    let {data : user } = useQuery("userCache", async () => {
        const response = await API.get('/user')
        return response.data.data
    })

    console.log("data user", user)

    useEffect( () => {
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;
    
        let scriptTag = document.createElement("script");
        scriptTag.src = midtransScriptUrl;
        scriptTag.setAttribute("data-client-key", myMidtransClientKey);

        document.body.appendChild(scriptTag);
        return () => {
        document.body.removeChild(scriptTag);
        }
    }, [])

    const handleBuy = useMutation(async (e) => {
        try {
            e.preventDefault()

            const config = {
                headers: {
                    'Content-type' : 'application/json'
                }
            }

            const response = await API.post('/transaction', config)
            console.log("transaction success : ", response)

            const token = response.data.data.token;
            window.snap.pay(token, {
            onSuccess: function (result) {
            console.log(result);
            navigate("/profile");
                },
            onPending: function (result) {
            console.log(result);
            navigate("/profile");
            },
            onError: function (result) {
            console.log(result);
            navigate("/profile");
            },
            onClose: function () {
            alert("you closed the popup without finishing the payment");
            },
            });

        } catch (error) {
            console.log("transaction failed : ", error)
        }
    })


    return (
        <>
            <div style={{backgroundColor:"black", height:"1300px"}}>
                <NavUser />
                <div className="mt-5" style={{width:"40%", margin:"auto", color:"white", textAlign:"center"}}>
                    <h2>Premium</h2>
                    Only with one super click you can enjoy the latest movie streaming from DUMBFLIX.
                    <br />
                    Special Offer :  Rp.150.000/month
                    <div className="mt-3">
                        <Button style={{width:"100%", backgroundColor:"red", border:"none"}} onClick={(e) => handleBuy.mutate(e)}> Pay </Button>
                    </div>
                </div>
            </div>
        </>
    )
}