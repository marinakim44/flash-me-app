import React from "react";
import { Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  addFirestoreDoc,
  readFirestore,
} from "../common/functions/firestoreCrud";
import CreatableSelect from "react-select/creatable";

export default function AddNewCard({ cb }) {
  const [tags, setTags] = useState([]);

  const [newCard, setNewCard] = useState({
    title: "",
    description: "",
    tags: [],
  });

  useEffect(() => {
    readFirestore("tags")
      .then((res) => {
        setTags(res.map((r) => r.data));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewCard((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleChangeSelect = (e) => {
    console.log();

    setNewCard((prev) => {
      return {
        ...prev,
        tags: e.map((t) => {
          return {
            label: t.label,
            value: t.value,
          };
        }),
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    newCard.tags.map((t) => {
      if (tags.filter((x) => x.label === t.label).length === 0) {
        addFirestoreDoc("tags", t);
        readFirestore("tags")
          .then((res) => {
            setTags(res.map((r) => r.data));
          })
          .catch((err) => console.log(err));
      } else {
        console.log(`tag already exists: ${t.label}`);
      }
    });

    const id = await addFirestoreDoc("cards", newCard);
    console.log("New card created with ID: ", id);

    setNewCard({
      title: "",
      description: "",
      tags: [],
    });
    return cb();
  };

  return (
    <div
      style={{
        backgroundColor: "black",
        textAlign: "center",
        padding: 30,
      }}
    >
      <Form style={{ maxWidth: 500, margin: "auto auto" }}>
        <p
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Add new card
        </p>
        {/* <Button onClick={addTag}>ADD TAG</Button> */}
        <Form.Group>
          <Form.Control
            placeholder="title"
            name="title"
            value={newCard.title}
            onChange={handleChange}
            style={{ marginBottom: 5 }}
          />
          <Form.Control
            placeholder="description"
            name="description"
            as="textarea"
            rows={3}
            value={newCard.description}
            onChange={handleChange}
            style={{ marginBottom: 5 }}
          />
          <CreatableSelect
            allowCreateWhileLoading={true}
            isMulti
            options={tags}
            onChange={handleChangeSelect}
            value={newCard.tags}
          />
        </Form.Group>

        <Button
          onClick={handleSubmit}
          variant="outline-success"
          style={{ marginTop: 10, width: 100 }}
        >
          Add
        </Button>
      </Form>
    </div>
  );
}
