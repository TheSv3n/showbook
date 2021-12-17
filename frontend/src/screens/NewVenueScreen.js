import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";

const NewVenueScreen = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imageName, setImageName] = useState("No Image");

  return <div>New Venue Screen</div>;
};

export default NewVenueScreen;
