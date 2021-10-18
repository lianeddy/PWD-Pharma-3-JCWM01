import React, { useState, useEffect } from "react";
import { StatusHandler } from "./type";

const StatusWrapper = ({ status_id, order_id, total, payment_proof }) => {
  console.log(status_id, "ada");
  const CurrStatus = StatusHandler[status_id - 1] ? (
    StatusHandler[status_id - 1]
  ) : (
    <h2>None</h2>
  );
  return (
    <>
      <CurrStatus id={order_id} payment_proof={payment_proof} />
      <div style={{ float: "right" }}>
        <h2>
          Total: Rp.{" "}
          <span style={{ color: "green", fontWeight: "bold" }}>{total}</span>
        </h2>
        <h4>*Harga total bisa berubah</h4>
      </div>
    </>
  );
};

export default StatusWrapper;
