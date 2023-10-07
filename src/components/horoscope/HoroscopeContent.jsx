import React from "react";
import "../../styles/HoroscopeContent.scss";
import { Card, CardContent, CardHeader, Skeleton } from "@mui/material";

const HoroscopeContent = ({
  horoscope,
  loadingHoroscope,
  loadingMainInfo,
  mainInfo,
  activeItem,
}) => {
  return (
    <div className="horoscope-content">
      {loadingMainInfo ? (
        <div className="loading-content">
          <Card width="100%" sx={{ boxShadow: "none" }}>
            <CardContent width="100%">
              <Skeleton animation="wave" height={15} style={{ marginBottom: 10 }} width="20%" />
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
        <article className={activeItem.value === "next" && "grey"}>
          {mainInfo?.report?.map((item, i) => (
            <div>
              <h3>{item?.title}</h3>
              <p>{item?.answer}</p>
            </div>
          ))}
        </article>
      )}
      {loadingHoroscope ? (
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
        <section>
          <p>
            <p>{horoscope?.prediction}</p>
          </p>
        </section>
      )}
    </div>
  );
};

export default HoroscopeContent;
