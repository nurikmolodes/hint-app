import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import lora from "../../assets/lora.svg";
import daniel from "../../assets/daniel.svg";
import threeHearts from "../../assets/threeStars.svg";
import shareImage from "../../assets/shareScore.svg";
import basic from "../../assets/basic.svg";
import emotion from "../../assets/emotion.svg";
import "../../styles/Friendship.scss";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";
import Share from "./share/Share";
import axios from "axios";
import html2canvas from "html2canvas";

const Friendship = ({ match, user }) => {
  const characteristics = [
    {
      id: "basic-friend",
      title: "Basic Identities",
      content: match.friendship_report[0].slice(0, 165) + "..." || "",
      img: basic,
      titleColor: "#E48D21",
    },
    {
      id: "emotion-friend",
      title: "Emotional Styles",
      content: match.friendship_report[4].slice(0, 165) + "..." || "",
      img: emotion,
      titleColor: "#5480F0",
    },
  ];
  const navigate = useNavigate();

  const navigateToAnotherPage = (id) => {
    navigate(`/${id}`);
  };
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      margin: 10,
      padding: 10,
    },
    section: {
      margin: 10,
      padding: 10,
    },
    title: {
      fontSize: 18,
      marginBottom: 10,
    },
    paragraph: {
      fontSize: 12,
      marginBottom: 10,
    },
  });
  const generatePDF = () => {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.title}>Friendship Report:</Text>
          {match.friendship_report.map((paragraph, index) => (
            <View key={index} style={styles.section}>
              <Text style={styles.paragraph}>{`${index + 1}. ${paragraph}`}</Text>
            </View>
          ))}

          <Text style={styles.title}>Compatibility Report:</Text>
          <Text style={styles.paragraph}>{match.compatibility_report}</Text>

          <Text style={styles.title}>Compatibility Percentage:</Text>
          <Text style={styles.paragraph}>{`${match?.compatibility_percentage}%`}</Text>
        </Page>
      </Document>
    );
  };
  const [link, setLink] = useState("");
  console.log(link);
  const [share, setShare] = useState(false);
  const [accessToken, setAccessToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJ0b2tlbklkIjoiMTcxZTk2MTEtNzkwYy00ZjU4LWI5ZmUtMmM2ODAyZDljYjg1IiwiaWF0IjoxNjk1NzkyNjQ2fQ.Xo9EZCWwa7S4iN-O5MupiKmQpMXtuH1JXGZ5kMf6fSE",
  ); // Replace with your actual token
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

  return (
    <div className="friendship">
      <div className="match" ref={componentRef}>
        {/* <input type="file" onChange={(e) => setBlob(e.target.files[0])} /> */}
        <div className="users">
          <div className="user">
            <img src={daniel} />
            <span>{user?.info?.name}</span>
          </div>
          <div
            class="progress-bar"
            style={{
              background: `radial-gradient(closest-side, #fff1f3 79%, transparent 80% 100%), conic-gradient(#ffe447 ${match?.compatibility_percentage}%, #fff1f3 0)`,
            }}>
            {match?.compatibility_percentage}%
            <img src={threeHearts} />
          </div>
          <div className="user">
            <img src={lora} />
            <span>{match?.partnerName}</span>
          </div>
        </div>
        <div className="share">
          <img
            src={shareImage}
            onClick={() => {
              sendPDF();
              setShare(!share);
            }}
          />
          {share && (
            <Share description={"The results of a Friendship report"} match={match} link={link} />
          )}
        </div>
      </div>
      <div className="characteristics">
        {characteristics.map((item, i) => (
          <div key={item.id} className="characteristic" style={{ background: `url(${item.img})` }}>
            <h3 style={{ color: `${item.titleColor}` }}>{item.title}</h3>
            <p>{item.content}</p>
            <span onClick={() => navigateToAnotherPage(item.id)}>Read More</span>
          </div>
        ))}
      </div>
      <div className="button">
        <button>
          <PDFDownloadLink document={generatePDF()} fileName="report.pdf">
            {({ blob, url, loading, error }) => (loading ? "Loading document..." : "Save Report")}
          </PDFDownloadLink>
        </button>
      </div>
    </div>
  );
};

export default Friendship;
