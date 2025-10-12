import React from "react"
import NavAdmin from "../../Component/NavbarAdmin";
import {Col,Row, Dropdown, DropdownButton} from "react-bootstrap"

import Moment from "moment"
import useTransactionStore from "../../Store/transactionStore"
import { useEffect } from "react"


export default function Admin() {
    const { transactions, updateTransactionStatus, fetchTransactions } = useTransactionStore();

    useEffect(() => {
        fetchTransactions();
    }, []);

    const handleUpdateStatus = async (id, status) => {
        try {
            await updateTransactionStatus(id, status);
            fetchTransactions(); // Refetch transactions after updating status
        } catch (error) {
            console.error("Failed to update transaction status:", error);
        }
    };

    console.log("data transaksi :", transactions);

    return (
        <div>
            <NavAdmin />
            <div style={{backgroundColor:"white", color:"black", width:"100%", height:"1000px", padding:"30px"}}>
                <div>
                    <h2>Incoming Transaction</h2>
                    <div className="mt-5 rounded" style={{border:"solid 1px", width:"80%", margin:"auto", padding:"10px", background:"#2b3467"}}>
                        <Row>
                           <Col style={{color:"white"}}>No.</Col>
                            <Col style={{color:"white"}}>Users</Col>
                            <Col style={{color:"white"}}>Expired</Col>
                            <Col style={{color:"white"}}>User Status</Col>
                            <Col style={{color:"white"}}>Payment Status</Col>
                            <Col className="mb-3" style={{color:"white"}}>Action</Col>
                            <hr />
                        </Row>
                    <div style={{backgroundColor:"#2b3467"}}>
                        {transactions?.map((data,i) => ( 
                        <Row key={data.id}>
                            <Col style={{color:"white"}}>{i + 1}</Col>
            <Col style={{color:"white"}}>{data?.user?.fullName || "N/A"}</Col>
            <Col style={{color:"white"}}>{Moment(data?.due_date ? new Date(data.due_date[0], data.due_date[1] - 1, data.due_date[2]) : null).format("YYYY-MM-DD")}</Col>
            <Col style={{color:"white"}}>Active</Col>
            <Col style={{color:"white"}}>{data?.status}</Col>
            <Col className="mb-3">
            <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Action
                </Dropdown.Toggle>

                                <Dropdown.Menu style={{ backgroundColor: '#2B3467' }}>
                                    <Dropdown.Item onClick={() => handleUpdateStatus(data.id, "approved")} style={{color:"white"}}>Approve</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleUpdateStatus(data.id, "cancelled")} style={{color:"white"}}>Cancel</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            </Col>
                            <hr />
                        </Row>
                        ))}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
