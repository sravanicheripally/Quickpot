import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
 import { useDispatch } from "react-redux";

// import { useNavigate } from "react-router-dom";
 import { Link } from 'react-router-dom'
import { send } from "../Redux/Actions";
import "../components/Pracel.css";
function Parcel() {
  const [ItemWeight, setItemWeight] = useState("");
  const [ItemName, setItemName] = useState("");
  const [PickUpDate, setPickUpDate] = useState("");
  const [ChooseParcelImage, setChooseParcelImage] = useState("");
  const [ReciversName, setReciversName] = useState("");
  const [ReciverPhonenumber, setReciverPhonenumber] = useState("");
  const [arr, setArr] = useState([]);

  const dispath = useDispatch();
  // const navigate = useNavigate();
  
  const Onlogin = (e) => {
    e.preventDefault();
    let obj = {
      ItemWeight: ItemWeight,
      ItemName: ItemName,
      PickUpDate: PickUpDate,
      ChooseParcelImage: ChooseParcelImage,
      ReciversName: ReciversName,
      ReciverPhonenumber: ReciverPhonenumber,
    };
    let arr1 = [];
    arr1.push(obj);
    dispath(send(arr1))

    let b = [...arr1];
    setArr(b);
    // dispath(send(arr))
    // navigate("/PaymentDetails", { state: { value: b } });
    // navigate("/PaymentDetails");
  };
  console.log(arr, "i am from 42");
  return (
    <div    className="Parcelimage"> 
    <div className="parcel">
      <Form className="forming">
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="4">
            ItemWeight
          </Form.Label>
          <Col sm="6">
            <Form.Control
              type="number"
              placeholder="ItemWeight"
              value={ItemWeight}
              name="ItemWeight"
              onChange={(e) => setItemWeight(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="4">
            ItemName
          </Form.Label>
          <Col sm="6">
            <Form.Control
              type="text"
              name="ItemName"
              placeholder="ItemName"
              value={ItemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="4">
            PickUp Date
          </Form.Label>
          <Col sm="6">
            <Form.Control
              type="Date"
              name="PickUpDate"
              placeholder="PickUpDate"
              value={PickUpDate}
              onChange={(e) => setPickUpDate(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="4">
            ChooseParcelImage
          </Form.Label>
          <Col sm="6">
            <Form.Control
              type="file"
              name="ChooseParcelImage"
              placeholder="ChooseParcelImage"
              value={ChooseParcelImage}
              onChange={(e) => setChooseParcelImage(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="4">
            ReciverName
          </Form.Label>
          <Col sm="6">
            <Form.Control
              type="text"
              placeholder="ReciversName"
              name="ReciversName"
              value={ReciversName}
              onChange={(e) => setReciversName(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="4">
            ReciverPhonenumber
          </Form.Label>
          <Col sm="6">
            <Form.Control
              type="number"
              name="ReciverPhonenumber"
              placeholder="ReciverPhonenumber"
              value={ReciverPhonenumber}
              onChange={(e) => setReciverPhonenumber(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Col sm="12">
          {/* {/* <Link to='/PaymentDetails'>   */}
        <button 
            class="btn btn-primary btn-login text-uppercase fw-bold"
            type="submit"
            onClick={Onlogin}
          >
          <Link to='/PaymentDetails'  className='SignIn' >Proceed</Link> 
          </button>
          
        </Col>
      </Form>
      </div>
    </div>
  );
}

export default Parcel;
