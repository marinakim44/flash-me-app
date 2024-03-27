import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import AddNewCard from "../sections/AddNewCard";
import { readFirestore } from "../common/functions/firestoreCrud";
import Header from "../components/Header";
import Search from "../components/Search";

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
    <div style={{ background: "linear-gradient(to right, #D4E2D4, #FFCACC)" }}>
      <div style={{ position: "fixed", top: 0, width: "100%" }}>
        <Header />
        <AddNewCard cb={getUpdatedCards} />
        <Search />
      </div>
      <div style={{ paddingTop: "450px" }}>
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
      <footer
        style={{
          textAlign: "center",
          marginTop: "20px",
          paddingBottom: "20px",
        }}
      >
        2024 by Marina Kim
      </footer>
    </div>
  );
}
