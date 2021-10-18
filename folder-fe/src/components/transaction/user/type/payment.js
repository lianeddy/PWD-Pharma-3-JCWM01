import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL_API } from "helper/helper";
import { Button } from "@material-ui/core";
import { maxHeight } from "@mui/system";

const Payment = ({ id, payment_proof }) => {
  const [payment, setPayment] = useState(payment_proof);
  const hdnUploadPayment = () => {
    let form = new FormData();
    form.append("file", payment);

    axios
      .patch(`${URL_API}/users/payment/${id}`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        alert("Upload Complete!");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div>
      <h2>Payment</h2>
      <p>Please upload your payment</p>
      <img
        style={{ width: "400px", maxHeight: "600px", display: "block" }}
        id="payment_proof_img"
        src={payment ? URL_API + payment : null}
      />
      <input
        type="file"
        onChange={(e) => {
          setPayment(e.target.files[0]);
          document.getElementById("payment_proof_img").src =
            URL.createObjectURL(e.target.files[0]);
        }}
      />
      {payment ? (
        <Button onClick={hdnUploadPayment}>Upload Proof</Button>
      ) : null}
    </div>
  );
};

export default Payment;
