import React from "react";
import { useNavigate } from "react-router-dom";
import lora from "../../assets/lora.svg";
import daniel from "../../assets/daniel.svg";
import threeHearts from "../../assets/threeStars.svg";
import share from "../../assets/shareScore.svg";
import basic from "../../assets/basic.svg";
import emotion from "../../assets/emotion.svg";
import "../../styles/Friendship.scss";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";

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
          <Text style={styles.title}>Friendship</Text>

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
  return (
    <div className="friendship">
      <div className="match">
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
          <img src={share} />
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
