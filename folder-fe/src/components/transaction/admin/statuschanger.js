import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";

const StatusChanger = ({
  order_id,
  status,
  status_options,
  hdnChangeStatus,
  prescription,
  total,
  payment_proof,
}) => {
  const [totals, setTotal] = useState(0);
  useEffect(() => {
    setTotal(total);
  }, []);
  return (
    <div>
      <h2>{status}</h2>
      {status_options ? (
        <select id="status_id">
          {status_options.map((val) => {
            return (
              <option
                value={val.STATUS_ID}
                disabled={val.STATUS_NAME == status ? true : false}
              >
                {val.STATUS_NAME}
              </option>
            );
          })}
        </select>
      ) : null}
      <Button
        onClick={() => {
          console.log({
            order_id,
            test: document.getElementById("status_id").value,
          });
          return window.confirm(
            `Are sure you want to change this order status?`
          )
            ? hdnChangeStatus(
                order_id,
                Number(document.getElementById("status_id").value)
              )
            : null;
        }}
      >
        Change Status
      </Button>
      {prescription ? (
        <img src={prescription} style={{ width: "200px" }} />
      ) : (
        <h4>Order has no prescription</h4>
      )}
      <div style={{ float: "right" }}>
        <h2>
          Total: Rp.{" "}
          <input
            type="text"
            style={{ color: "green", fontWeight: "bold", fontSize: "24px" }}
            value={totals}
            onChange={(e) => setTotal(e.target.value)}
          />
        </h2>
      </div>
    </div>
  );
};
export default StatusChanger;
