import React from "react";
import "../../styles/HoroscopeContent.scss";

const HoroscopeContent = ({ horoscope }) => {
  console.log(horoscope);
  return (
    <div className="horoscope-content">
      <article>
        <h3>{horoscope?.sun_sign}</h3>
        <p>{horoscope?.prediction}</p>
      </article>
      <section>
        <p>
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
