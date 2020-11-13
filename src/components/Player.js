import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
  faVolumeDown,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  setCurrentSong,
  songs,
  setSongs,
}) => {
  const [playButton, setPlayButton] = useState(faPlay);
  const [firstLoad, setFirstLoad] = useState(false);
  const [audioTimeData, setAudioTimeData] = useState({
    currentTime: 0,
    duration: 0,
  });
  const [isVolumeActive, setIsVolumeActive] = useState(false);
  const [volume, setVolume] = useState(100);
  const audioRef = useRef(null);

  useEffect(() => {
    setFirstLoad(true);
  }, []);

  const formatTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  const audioPlayHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setPlayButton(faPlay);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      setPlayButton(faPause);
    }
  };
  const updateTimeHandler = (e) => {
    setAudioTimeData({
      ...audioTimeData,
      currentTime: e.target.currentTime,
      duration: e.target.duration,
    });
  };
  const loadTimeHandler = (e) => {
    setPlayButton(faPlay);
    setAudioTimeData({
      ...audioTimeData,
      currentTime: e.target.currentTime,
      duration: e.target.duration,
    });

    if (firstLoad) {
      setPlayButton(faPlay);
      setFirstLoad(!firstLoad);
      return;
    }
    if (isPlaying) {
      audioRef.current.play();
      setPlayButton(faPause);
    } else {
      setPlayButton(faPlay);
    }
  };
  const dragHandler = (e) => {
    setAudioTimeData({ ...audioTimeData, currentTime: e.target.value });
    audioRef.current.currentTime = e.target.value;
  };
  const changeVolumeHandler = () => {
    setVolume(audioRef.current.volume * 100);
  };
  const volumeDragHandler = (e) => {
    setVolume(e.target.value);
    audioRef.current.volume = e.target.value / 100;
  };
  /*const resetAudioHandler = (e) => {
    setAudioTimeData({
      ...audioTimeData,
      currentTime: 0,
    });
    setIsPlaying(false);
    setPlayButton(faPlay);
  };*/
  const skipSongHandler = (direction) => {
    let currentSongIndex = songs.findIndex((element) => {
      return element.id === currentSong.id;
    });
    if (direction === "prev") {
      currentSongIndex =
        currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
    } else if (direction === "next") {
      currentSongIndex =
        currentSongIndex === songs.length - 1 ? 0 : currentSongIndex + 1;
    }

    let newSong = { ...songs[currentSongIndex], active: true };
    let newSongs = songs.map((element) => {
      if (element.id === newSong.id) {
        return { ...element, active: true };
      } else {
        return { ...element, active: false };
      }
    });

    setSongs(newSongs);
    setCurrentSong(newSong);
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{formatTime(audioTimeData.currentTime)}</p>
        <input
          type="range"
          min={0}
          max={audioTimeData.duration || 0}
          value={audioTimeData.currentTime}
          onChange={dragHandler}
        />
        <p>
          {audioTimeData.duration ? formatTime(audioTimeData.duration) : "0:00"}
        </p>
      </div>

      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipSongHandler("prev")}
          className="skip-back noSelect"
          icon={faAngleLeft}
          size="2x"
        />
        <FontAwesomeIcon
          onClick={audioPlayHandler}
          className="play noSelect"
          icon={playButton}
          size="2x"
        />
        <FontAwesomeIcon
          onClick={() => skipSongHandler("next")}
          className="skip-forward noSelect"
          icon={faAngleRight}
          size="2x"
        />
        <FontAwesomeIcon
          className="noSelect"
          onClick={() => setIsVolumeActive(!isVolumeActive)}
          icon={faVolumeDown}
        />
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={volumeDragHandler}
          style={isVolumeActive ? { display: "initial" } : { display: "none" }}
        />
      </div>
      <audio
        onTimeUpdate={updateTimeHandler}
        onLoadedMetadata={loadTimeHandler}
        onEnded={() => skipSongHandler("next")}
        onVolumeChange={changeVolumeHandler}
        ref={audioRef}
        src={currentSong?.audio}
      ></audio>
    </div>
  );
};

export default Player;
