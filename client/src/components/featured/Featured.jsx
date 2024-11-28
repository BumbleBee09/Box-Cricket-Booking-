import "./featured.css";
import { NavLink } from "react-router-dom";
import {useSpring, animated} from '@react-spring/web';


const Featured = () => {
  const spring1 = useSpring({
    from: { x: 500},
    to: {x: 0},
    config: { duration: 1000 },
  });

  const spring2 = useSpring({
    from: { x: 600},
    to: {x: 0},
    config: { duration: 1000, delay: 500 },
  });

  const spring3 = useSpring({
    from: { x: 700},
    to: {x:0},
    config: { duration: 1000, delay: 1000 },
  });
  return (
    <div className="featured">
    <animated.div
        style={{
          ...spring1,
        }}
      >
     <NavLink className="nav-link" to="/grounds/Ahmedabad">
     <div className="featuredItem">
        <img
          src="https://cdn.dnaindia.com/sites/default/files/styles/full/public/2019/04/11/811584-ahmedabad-041119.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Ahmedabad</h1>
          <h2>5 places</h2>
        </div>
      </div>
     </NavLink>
    </animated.div>
    <animated.div
        style={{
          ...spring2,
        }}
      >
    <NavLink className="nav-link" to="/grounds/Surat">
      <div className="featuredItem">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDnNEpfqJKtHgTKFLSEFpWyhrW2i3oyMhB8A&usqp=CAU"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Surat</h1>
          <h2>3 places</h2>
        </div>
      </div>
      </NavLink>
    </animated.div>
    <animated.div
        style={{
          ...spring3,
        }}
      >
    <NavLink className="nav-link" to="/grounds/Bengaluru">
      <div className="featuredItem">
        <img
          src="https://www.voyage-en-inde.fr/wp-content/uploads/2011/05/Bangalore.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Bengaluru</h1>
          <h2>4 places</h2>
        </div>
      </div>
      </NavLink>
      </animated.div>
    </div>
  );
};

export default Featured;