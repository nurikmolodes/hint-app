import React from "react";
import "../../styles/HoroscopeContent.scss";
import { Card, CardContent, CardHeader, Skeleton } from "@mui/material";

const HoroscopeContent = ({ horoscope, loadingHoroscope }) => {
  return (
    <div className="horoscope-content">
      {loadingHoroscope ? (
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
        <article>
          <h3>{horoscope?.sun_sign}</h3>
          <p>{horoscope?.prediction}</p>
        </article>
      )}

      <section>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy
          text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book.
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy
          text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book.
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy
          text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book.
        </p>
      </section>
    </div>
  );
};

export default HoroscopeContent;
