import React, { useEffect, useRef, useState } from "react";
import "./DetailCharacteristic.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import back from "../../../assets/back.svg";
import shareImage from "../../../assets/share.svg";
import html2canvas from "html2canvas";
import Share from "../../../components/compatibility/share/Share";
import axios from "axios";

const DetailCharacteristic = ({ match }) => {
  const { CharacteristicId } = useParams();
  console.log(CharacteristicId);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  ////share
  const [link, setLink] = useState("");
  console.log(link);
  const [share, setShare] = useState(false);
  const [accessToken, setAccessToken] = useState(""); // Replace with your actual token
  const [blob, setBlob] = useState(null);
  console.log(blob);
  const [pdfData, setPdfData] = useState("");

  const base64Decoder = async () => {
    try {
      const response = await fetch(pdfData);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const blobData = await response.blob();
      setBlob(blobData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const componentRef = useRef(null);

  const generate = () => {
    if (componentRef.current) {
      html2canvas(componentRef.current).then((canvas) => {
        // Convert canvas to a data URL
        const image = canvas.toDataURL("image/png");
        setPdfData(image);
      });
    }
  };
  const sendPDF = async () => {
    if (!pdfData) {
      return;
    }

    try {
      const apiEndpoint = "https://api.astropulse.app/api/share";
      const response = await axios.post(
        apiEndpoint,
        { image: blob },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setLink(response.data?.publicUrl);
    } catch (error) {
      console.error("Error sending PDF:", error);
    }
  };
  useEffect(() => {
    base64Decoder(pdfData);
    generate();
    sendPDF();
  }, [pdfData]);
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user"));
    setAccessToken(token?.token);
  }, []);
  /////share
  return (
    <div className="detail-characteristic">
      <header>
        <div className="back">
          <Link onClick={() => navigate(-1)}>
            <img src={back} />
          </Link>
        </div>
      </header>
      <div className="basic-identities" ref={componentRef}>
        <h3 style={CharacteristicId === "emotional-romantic" ? { color: "#5480F0" } : null}>
          {CharacteristicId === "basic-romantic"
            ? "Basic Identities"
            : CharacteristicId === "basic-friend"
            ? "Basic Identities"
            : CharacteristicId === "emotional-romantic"
            ? "Emotional Styles"
            : CharacteristicId === "emotion-friend"
            ? "Emotional Styles"
            : ""}
        </h3>
        <p>
          {CharacteristicId === "basic-romantic" && match?.love_report?.slice(0, 4).map((a) => a)}
          {CharacteristicId === "emotional-romantic" && match?.love_report?.slice(3).map((a) => a)}
          {CharacteristicId === "basic-friend" &&
            match?.friendship_report?.slice(0, 4).map((a) => a)}
          {CharacteristicId === "emotion-friend" &&
            match?.friendship_report?.slice(4).map((a) => a)}
        </p>
        {/* <div className="duo">
          <div className="first">
            <div className="zodiac">
              <h4>Lora</h4>
              <button>Twins</button>
            </div>
            <p>Lorem Ipsum is simply dummy text.</p>
          </div>
          <div className="second">
            <div className="zodiac">
              <h4>Daniel</h4>
              <button>Lion</button>
            </div>
            <p>Lorem Ipsum is simply dummy text.</p>
          </div>
        </div> */}
        <div className="share">
          <img
            src={shareImage}
            onClick={() => {
              sendPDF();
              setShare(!share);
            }}
          />
          {share && (
            <Share description={"The results of a Romantic report"} match={match} link={link} />
          )}
        </div>
      </div>
      <div className="pros">
        <div className="title">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none">
            <path
              d="M10 3C10 7.14213 13.3578 10.5 17.5 10.5C13.3578 10.5 10 13.8578 10 18C10 13.8578 6.64213 10.5 2.5 10.5C6.64213 10.5 10 7.14213 10 3Z"
              fill="#E48D21"
            />
          </svg>
          <h5>Pros</h5>
        </div>
        <ul>
          <li>{match?.compatibility_report}</li>
        </ul>
      </div>
    </div>
  );
};

export default DetailCharacteristic;
