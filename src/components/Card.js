import React from "react";
import { Button } from "react-bootstrap";
import { deleteFirestoreDoc } from "../common/functions/firestoreCrud";

export default function Card({ title, description, tags, id, cb }) {
  const deleteCard = async () => {
    const res = await deleteFirestoreDoc("cards", id);
    console.log("response delete: ", res);

    return cb();
  };
  return (
    <div
      style={{
        backgroundColor: "#F6F193",
        padding: 30,
        maxWidth: 500,
        margin: "10px auto",
      }}
    >
      <h3>{title}</h3>
      <p>{description}</p>
      {tags && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          {tags.map((t, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "white",
                marginRight: 5,
                padding: "0px 5px",
                borderRadius: 5,
              }}
            >
              <p style={{ margin: 5 }}>{t.label}</p>
            </div>
          ))}
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "5px" }}>
        <Button variant="outline-secondary" onClick={deleteCard}>
          Update
        </Button>
        <Button variant="outline-danger" onClick={deleteCard}>
          Delete
        </Button>
      </div>
    </div>
  );
}
