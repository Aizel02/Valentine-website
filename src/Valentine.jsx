import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

import "./Valentine.css";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";

import memeSure from "./assets/meme1.jpg";
import memeUniverse from "./assets/meme2.jpg";
import arayko from "./assets/arayko.gif";
import dinga from "./assets/dinga.gif";
import sad from "./assets/sad.gif";
import yesGif from "./assets/yes.gif";
import loveSong from "./assets/Ben&Ben - Lifetime.mp3";
import love from "./assets/iloveu.gif";

export default function Valentine() {
  const { width, height } = useWindowSize();
  const [noCount, setNoCount] = useState(0);
  const [modalData, setModalData] = useState(null);
  const [yesClicked, setYesClicked] = useState(false);
  const [noStyle, setNoStyle] = useState({});
  const moveNoButton = () => ({
  position: "absolute",
  top: Math.random() * 200 + "px",
  left: Math.random() * 200 + "px",
});
  const [audio] = useState(() => {
  const song = new Audio(loveSong);
  song.volume = 0.6;   
  song.loop = false;  
  return song;
});


  const handleNoClick = () => {
    const next = noCount + 1;
    setNoCount(next);

    if (next === 1) {
      setModalData({
        img: memeSure,
        autoClose: true,
      });
    }

    if (next === 4) {
      setModalData({
        img: arayko,
        autoClose: true,
      });
    }

    if (next === 5) {
      setModalData({
        img: memeUniverse,
        autoClose: true,
      });
    }
  };

  useEffect(() => {
    if (noCount === 7) {
      setModalData({
        img: sad,
        autoClose: true,
      });
    }

    if (noCount === 9) {
      setModalData({
        img: dinga,
        autoClose: true,
      });
    }
  }, [noCount]);

if (yesClicked) {
  return (
    <div className="success">
      <Confetti width={width} height={height} />
      
      <img
        src={love}
        alt="celebration"
        style={{ width: "300px", marginTop: "20px" }}
      />

      <h1>Yay! 💖</h1>
      <p className="success-title">Happy Valentine’s Day!</p>
<span className="success-subtitle">
  Every love story is beautiful,<br />
  but ours is my favorite 😊
</span>

    </div>
  );
}
  return (
    <div className="container">
      <FloatingHearts />

      <div className="content">
        <h1>Will you be my Valentine? 💘</h1>

        <div className="buttons">
          <button
  className="yes"
  onClick={() => {
    audio.currentTime = 0; 
    audio.play();

    setModalData({
      title: "YAYYY 💖",
      img: yesGif,
      autoClose: true,
      isYes: true,
    });
  }}
>
  Yes
</button>


          <button
  className="no"
  style={noStyle}
 onMouseEnter={() => {
  if (noCount === 3 || Math.random() > 0.3) {
    setNoStyle(moveNoButton());
  }
}}
  onClick={() => {
    setNoStyle(moveNoButton());
    handleNoClick();
  }}
>
  {noCount === 0 ? "No 😝" : "No"}
</button>

        </div>
      </div>

      {modalData && (
        <Modal
          data={{ ...modalData, onYes: () => setYesClicked(true) }}
          onClose={() => setModalData(null)}
        />
      )}
    </div>
  );
}

/*  MODAL COMPONENT (FIXED) */
function Modal({ data, onClose }) {
  useEffect(() => {
    if (data.autoClose) {
      const timer = setTimeout(() => {
        onClose();
        if (data.isYes && data.onYes) data.onYes();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [data, onClose]);

  return (
    <div className="modal">
      <div className="modal-card">
        <img src={data.img} alt="meme" />
        {data.title && <h2>{data.title}</h2>}
        {data.text && <p>{data.text}</p>}
      </div>
    </div>
  );
}

/* FLOATING HEARTS */
function FloatingHearts() {
  return (
    <div className="hearts">
      {Array.from({ length: 50 }).map((_, i) => {
        const size = 14 + Math.random() * 20;

        return (
          <span
            key={i}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${8 + Math.random() * 6}s`,
            }}
          >
            <Heart size={size} fill="#ef4444" color="#ef4444" />
          </span>
        );
      })}
    </div>
  );
}
