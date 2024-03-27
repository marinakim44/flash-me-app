import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import AddNewCard from "../sections/AddNewCard";
import { readFirestore } from "../common/functions/firestoreCrud";

export default function HomePage() {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    readFirestore("cards")
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const getUpdatedCards = () => {
    readFirestore("cards")
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "#EE4266",
            alignItems: "center",
            padding: "5px 30px",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              color: "white",
              margin: 0,
            }}
          >
            Flash Me App
          </h1>
          <div style={{ color: "white" }}>
            <p style={{ margin: 0, textAlign: "left" }}>FREE</p>
            <p style={{ margin: 0, textAlign: "left" }}>until 31 May 2024</p>
          </div>
        </div>
        <AddNewCard cb={getUpdatedCards} />
      </div>

      {cards &&
        cards
          .sort((a, b) =>
            a.data.title.toLowerCase() > b.data.title.toLowerCase() ? 1 : -1
          )
          .map((c) => {
            return (
              <div key={c.id}>
                <Card
                  title={c.data.title}
                  description={c.data.description}
                  tags={c.data.tags}
                  id={c.id}
                  cb={getUpdatedCards}
                />
              </div>
            );
          })}
    </div>
  );
}
