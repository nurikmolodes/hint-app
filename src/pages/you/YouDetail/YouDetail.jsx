import React, { useEffect } from "react";
import "./YouDetail.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import back from "../../../assets/back.svg";
import like from "../../../assets/like.svg";
import dislike from "../../../assets/dislike.svg";
import sign from "../../../assets/sign.svg";
import mantra from "../../../assets/mantra.svg";
import strangeFigure from "../../../assets/strangeFigure.svg";

const YouDetail = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  useEffect(() => {
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
      <div className={`upper-container ${name}`}>
        <div className="content">
          <div className="upper">
            <div className="like">
              <section>
                <img src={like} />
                <span>Like</span>
              </section>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, a excepturi voluptatem
                animi accusantium quis asperiores dolorem? Voluptates incidunt earum temporibus,
                iusto vero veniam ullam in, adipisci dignissimos dolores cum.
              </p>
            </div>
            <div className="dislike">
              <section>
                <img src={dislike} />
                <span>Dislike</span>
              </section>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam autem libero
                fugiat quod earum aliquid aspernatur eveniet enim, rerum at doloribus tempora eum,
                ab perspiciatis assumenda incidunt? A, laborum culpa.
              </p>
            </div>
          </div>
          <hr />
          <div className="below">
            <div className="sign">
              <section>
                <img src={sign} />
                <span>Сelebrities under the sign</span>
              </section>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores asperiores alias
                quae necessitatibus rem id inventore consequuntur, voluptatem, sunt, mollitia
                repudiandae! Nam neque ipsa voluptas quae libero rerum repudiandae distinctio!
              </p>
            </div>
            <div className="mantra">
              <section>
                <img src={mantra} />
                <span>Your mantra</span>
              </section>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam dolorum nulla
                voluptatum. Distinctio quae deserunt asperiores temporibus! Corporis inventore vitae
                aperiam, sit a facilis nisi! Mollitia perferendis consequuntur dolor ullam.
              </p>
            </div>
          </div>
        </div>
        <img className="figure" src={strangeFigure} />
      </div>
      <article>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur laborum excepturi
          porro odio incidunt sint voluptates inventore unde voluptatem delectus accusantium
          repellat, praesentium nisi, odit illum ipsam minus sed culpa. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Voluptatibus id voluptatem qui quos iure fugiat quod
          inventore error iusto laborum est ipsam similique voluptates minus quibusdam sapiente, vel
          aliquid. Molestias!
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur laborum excepturi
          porro odio incidunt sint voluptates inventore unde voluptatem delectus accusantium
          repellat, praesentium nisi, odit illum ipsam minus sed culpa. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Voluptatibus id voluptatem qui quos iure fugiat quod
          inventore error iusto laborum est ipsam similique voluptates minus quibusdam sapiente, vel
          aliquid. Molestias!
        </p>
      </article>
    </div>
  );
};

export default YouDetail;
