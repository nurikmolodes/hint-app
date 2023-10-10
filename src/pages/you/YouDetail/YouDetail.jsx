import React, { useEffect, useState } from "react";
import "./YouDetail.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import back from "../../../assets/back.svg";
import like from "../../../assets/like.svg";
import dislike from "../../../assets/dislike.svg";
import sign from "../../../assets/sign.svg";
import mantra from "../../../assets/mantra.svg";
import strangeFigure from "../../../assets/strangeFigure.svg";
import axios from "axios";
import { Card, CardContent, CardHeader, Skeleton } from "@mui/material";

const YouDetail = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { name } = useParams();
  const getTheDescription = async () => {
    setLoading(true);
    const formdata = {
      dateOfBirth: "1990-02-10",
      timeOfBirth: "10:20",
      lat: "7.57944",
      lon: "-8.53778",
    };
    try {
      const response = await axios.post(
        `https://api.astropulse.app/api/astro/planet_sign_report/${name}`,
        formdata,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJ0b2tlbklkIjoiMTcxZTk2MTEtNzkwYy00ZjU4LWI5ZmUtMmM2ODAyZDljYjg1IiwiaWF0IjoxNjk1NzkyNjQ2fQ.Xo9EZCWwa7S4iN-O5MupiKmQpMXtuH1JXGZ5kMf6fSE",
          },
        },
      );
      setData(response.data);
      setLoading(false);
      // Handle the successful response here
      console.log("Successfully", response.data);
    } catch (error) {
      // Handle errors here
      console.error("Failed", error);
    }
  };
  useEffect(() => {
    getTheDescription();
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="you-detail">
      <header>
        <div className="back">
          <Link onClick={() => navigate(-1)}>
            <img src={back} />
          </Link>
        </div>
      </header>
      {/* <h1>{name}</h1> */}
      <div className="title">
        <span>How you see yourself</span>
      </div>
      {loading ? (
        <div className="loading-content">
          <Card width="100%" sx={{ boxShadow: "none" }}>
            <CardContent width="100%">
              <Skeleton animation="wave" height={10} style={{ marginBottom: 10 }} width="100%" />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 10 }} width="100%" />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 10 }} width="100%" />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 10 }} width="100%" />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 10 }} width="100%" />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 10 }} width="100%" />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 10 }} width="100%" />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 10 }} width="100%" />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 10 }} width="100%" />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 10 }} width="100%" />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 10 }} width="100%" />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 10 }} width="100%" />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 10 }} width="100%" />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 10 }} width="100%" />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 10 }} width="100%" />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 10 }} width="100%" />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 10 }} width="100%" />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 10 }} width="100%" />
              <Skeleton animation="wave" height={10} width="100%" />
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className={`upper-container ${name}`}>
          <div className="content">
            <div className="upper">
              <div className="like">
                <section>
                  <img src={like} />
                  <span>Like</span>
                </section>
                <p>{data?.report}</p>
              </div>
              <div className="dislike">
                <section>
                  <img src={dislike} />
                  <span>Dislike</span>
                </section>
                <p>{data?.report}</p>
              </div>
            </div>
            <hr />
            <div className="below">
              <div className="sign">
                <section>
                  <img src={sign} />
                  <span>Сelebrities under the sign</span>
                </section>
                <p>{data?.report}</p>
              </div>
              <div className="mantra">
                <section>
                  <img src={mantra} />
                  <span>Your mantra</span>
                </section>
                <p>{data?.report}</p>
              </div>
            </div>
          </div>
          <img className="figure" src={strangeFigure} />
        </div>
      )}
      {loading ? (
        <div className="loading-content">
          <Card width="100%" sx={{ boxShadow: "none" }}>
            <CardContent width="100%">
              <Skeleton animation="wave" height={10} style={{ marginBottom: 10 }} width="100%" />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 10 }} width="100%" />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 10 }} width="100%" />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 10 }} width="100%" />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 10 }} width="100%" />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 10 }} width="100%" />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 10 }} width="100%" />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 10 }} width="100%" />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 10 }} width="100%" />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 10 }} width="100%" />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 10 }} width="100%" />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 10 }} width="100%" />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 10 }} width="100%" />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 10 }} width="100%" />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 10 }} width="100%" />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 10 }} width="100%" />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 10 }} width="100%" />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 10 }} width="100%" />
              <Skeleton animation="wave" height={10} width="100%" />
            </CardContent>
          </Card>
        </div>
      ) : (
        <article>
          <p>{data?.report}</p>
        </article>
      )}
    </div>
  );
};

export default YouDetail;