import "./featuredProperties.css";
import { useSpring, animated } from "@react-spring/web";


const FeaturedProperties = () => {
  const spring1 = useSpring({
    from: { x: 500 },
    to: { x: 0 },
    config: { duration: 1000 },
  });

  const spring2 = useSpring({
    from: { x: 600 },
    to: { x: 0 },
    config: { duration: 1000},
  });

  const spring3 = useSpring({
    from: { x: 700 },
    to: { x: 0 },
    config: { duration: 1000},
  });

  const spring4 = useSpring({
    from: { x: 800 },
    to: { x: 0 },
    config: { duration: 1000},
  });
  return (
    <div className="fp">
    <animated.div
        style={{
          ...spring1,
        }}
      >
      <div className="fpItem">
        <img
          src="https://content.jdmagicbox.com/comp/surat/s7/0261px261.x261.220129104036.u6s7/catalogue/capital-box-cricket-club-mota-varachha-surat-axrwf6fukp.jpg?clr="
          alt=""
          className="fpImg"
        />
        <span className="fpName">Mota varachha Ground</span>
        <span className="fpCity">Surat</span>
        <span className="fpPrice">Starting from $12</span>
        <div className="fpRating">
          <button>8.9 ⭐</button>
          <span>Excellent</span>
        </div>
      </div>
      </animated.div>
      <animated.div
        style={{
          ...spring2,
        }}
      >
      <div className="fpItem">
        <img
          src="https://content.jdmagicbox.com/comp/hyderabad/z2/040pxx40.xx40.220327205921.t4z2/catalogue/stop-n-play-box-cricket-badangipet-hyderabad-sports-ground-n36lar9xsf.jpg"
          alt=""
          className="fpImg"
        />
        <span className="fpName">Stop And Play Badangipet</span>
        <span className="fpCity">Hyderabad</span>
        <span className="fpPrice">Starting from $14</span>
        <div className="fpRating">
          <button>9.3 ⭐</button>
          <span>Exceptional</span>
        </div>
      </div>
      </animated.div>
      <animated.div
        style={{
          ...spring3,
        }}
      >
      <div className="fpItem">
        <img
          src="https://content.jdmagicbox.com/comp/ahmedabad/s7/079pxx79.xx79.221127230057.d2s7/catalogue/green-galaxy-box-arena-ahmedabad-sports-clubs-k3ibz4twvd-250.jpg"
          alt=""
          className="fpImg"
        />
        <span className="fpName">Box Ground</span>
        <span className="fpCity">Ahmedabad</span>
        <span className="fpPrice">Starting from $19</span>
        <div className="fpRating">
          <button>8.8 ⭐</button>
          <span>Excellent</span>
        </div>
      </div>
      </animated.div>
      <animated.div
        style={{
          ...spring4,
        }}
      >
      <div className="fpItem">
        <img
          src="data:image/jpeg;base64,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"
          alt=""
          className="fpImg"
        />
        <span className="fpName">Football and cricket Box Ground</span>
        <span className="fpCity">Bangalore</span>
        <span className="fpPrice">Starting from $15</span>
        <div className="fpRating">
          <button>8.9 ⭐</button>
          <span>Excellent</span>
        </div>
      </div>
      </animated.div>
    </div>
  );
};

export default FeaturedProperties;