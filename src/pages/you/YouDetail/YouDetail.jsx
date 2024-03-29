import React, { useEffect, useState } from "react";
import "./YouDetail.scss";
import back from "../../../assets/back.svg";
import like from "../../../assets/like.svg";
import dislike from "../../../assets/dislike.svg";
import home from "../../../assets/home.svg";
import sign from "../../../assets/sign.svg";
import mantra from "../../../assets/mantra.svg";
import sun from "../../../assets/sunx.svg";
import moon from "../../../assets/moonx.svg";
import ricingsign from "../../../assets/ricingsign.svg";
import mercury from "../../../assets/mercuryx.svg";
import jupiter from "../../../assets/jupiterx.svg";
import midheaven from "../../../assets/midheavenx.svg";
import strangeFigure from "../../../assets/strangeFigure.svg";
import axios from "axios";
import { Card, CardContent, CardHeader, Skeleton } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";

const YouDetail = ({ user }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { name } = useParams();
  const getTheDescription = async () => {
    setLoading(true);
    const formdata = {
      dateOfBirth: user?.info?.birth_date,
      timeOfBirth: user?.info?.birth_time,
      lat: user?.info?.latitude,
      lon: user?.info?.longitude,
    };
    try {
      const response = await axios.post(
        `https://api.astropulse.app/api/astro/planet_sign_report/${name}`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
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
        {/* <div className="reminder">
          {data.sign_name && (
            <span>
              Your {name === "Venus" ? "Ricing Sign" : name === "Mars" ? "MidHeaven" : name} is{" "}
              {data?.sign_name}
            </span>
          )}
        </div> */}
      </header>
      {/* <h1>{name}</h1> */}
      <div className="title">
        {name === "Sun" && <span>Your identity</span>}
        {name === "Moon" && <span>Your emotions</span>}
        {name === "Venus" && <span>Ricing sign</span>}
        {name === "Mercury" && <span>Your interaction</span>}
        {name === "Jupiter" && <span>Your aspirations</span>}
        {name === "Mars" && <span>Your Fortune</span>}
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
        <>
          <div className={`upper-container ${name}`}>
            <div className="content">
              <div className="upper">
                <div className="like">
                  <section>
                    <img
                      src={
                        name === "Sun"
                          ? sun
                          : name === "Moon"
                          ? moon
                          : name === "Venus"
                          ? ricingsign
                          : name === "Mercury"
                          ? mercury
                          : name === "Jupiter"
                          ? jupiter
                          : name === "Mars"
                          ? midheaven
                          : ""
                      }
                    />
                    <span>
                      Your {name === "Venus" ? "Ricing Sign" : name === "Mars" ? "MidHeaven" : name}{" "}
                      is
                    </span>
                  </section>
                  {data.sign_name && (
                    <p>
                      Your {name === "Venus" ? "Ricing Sign" : name === "Mars" ? "MidHeaven" : name}{" "}
                      is {data?.sign_name}
                    </p>
                  )}
                </div>
                <div className="like">
                  {/* <section>
                  <img src={like} />
                  <span>Like</span>
                </section> */}
                  <p>{data?.report}</p>
                </div>
              </div>
              {/* <hr />
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
            </div> */}
            </div>
            <img className="figure" src={strangeFigure} />
          </div>
          <div className={`upper-container ${name}`}>
            <div className="content">
              <div className="upper">
                <div className="dislike">
                  <section>
                    <img src={home} />
                    <span>Your house is</span>
                  </section>
                  <p>{data?.house_report}</p>
                </div>
              </div>
              {/* <hr />
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
            </div> */}
            </div>
            <img className="figure" src={strangeFigure} />
          </div>
        </>
      )}
      {/* {loading ? (
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
          <p>{data?.house_report}</p>
        </article>
      )} */}
    </div>
  );
};

export default YouDetail;
