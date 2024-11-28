import "./propertyList.css";
import { NavLink } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";

const PropertyList = () => {
  const spring1 = useSpring({
    from: { x: -800 },
    to: { x: 10 },
    config: { duration: 1000 },
  });

  const spring2 = useSpring({
    from: { x: -700 },
    to: { x: 20 },
    config: { duration: 1000},
  });

  const spring3 = useSpring({
    from: { x: -600 },
    to: { x: 40 },
    config: { duration: 1000},
  });

  const spring4 = useSpring({
    from: { x: -500 },
    to: { x: 50 },
    config: { duration: 1000},
  });

  return (
    <div className="pList">
      <animated.div
        style={{
          ...spring1,
        }}
      >
        <NavLink className="nav-link" to="/grounds">
          <div className="pListItem">
            <img
              src="https://www.soccerbible.com/media/117949/balls-3-min.jpg"
              alt=""
              className="pListImg"
            />
            <div className="pListTitles">
              <h1>FootBall</h1>
              <h2>23 Grounds</h2>
            </div>
          </div>
        </NavLink>
      </animated.div>
      <animated.div
        style={{
          ...spring2,
        }}
      >
        <NavLink className="nav-link" to="/grounds">
          <div className="pListItem">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtCR2CZlOWdNP1xQ9-KqgEAss9xhgaxRknjw&usqp=CAU"
              alt=""
              className="pListImg"
            />
            <div className="pListTitles">
              <h1>Cricket</h1>
              <h2>45 Grounds</h2>
            </div>
          </div>
        </NavLink>
      </animated.div>
      <animated.div
        style={{
          ...spring3,
        }}
      >
        <NavLink className="nav-link" to="/grounds">
          <div className="pListItem">
            <img
              src="https://i.pinimg.com/originals/e0/b3/99/e0b399e64f9f4f0d225d678f4a981a52.jpg"
              alt=""
              className="pListImg"
            />
            <div className="pListTitles">
              <h1>Volleyball</h1>
              <h2>31 Grounds</h2>
            </div>
          </div>
        </NavLink>
      </animated.div>
      <animated.div
        style={{
          ...spring4,
        }}
      >
        <NavLink className="nav-link" to="/grounds">
          <div className="pListItem">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKDs05Rbra52_34jTjCFNIeJLpDGTsFht_CBSkkwH0GtEMAYDzVpw3aghmtUFgoRrug_4&usqp=CAU"
              alt=""
              className="pListImg"
            />
            <div className="pListTitles">
              <h1>HandBall</h1>
              <h2>23 Grounds</h2>
            </div>
          </div>
        </NavLink>
      </animated.div>
    </div>
  );
};

export default PropertyList;
