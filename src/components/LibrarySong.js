import React, { useState, useEffect } from "react";

const LibrarySong = ({
  song,
  currentSong,
  setCurrentSong,
  setSongs,
  songs,
  libraryStatus,
  setLibraryStatus,
}) => {
  const [clsName, setClsName] = useState("");

  useEffect(() => {
    if (song.active) {
      setClsName(" selected-song");
    } else {
      setClsName("");
    }
  }, [song.active]);

  const setSongHandler = async () => {
    if (currentSong.id === song.id) {
      return;
    }
    let tempSongs = [...songs];
    tempSongs = tempSongs.map((state) => {
      if (state.id === song.id) {
        return { ...state, active: true };
      } else {
        return { ...state, active: false };
      }
    });
    await setSongs(tempSongs);

    await setCurrentSong({ ...song, active: true });
    if (window.outerWidth <= 856) {
      setLibraryStatus(!libraryStatus);
    }
  };
  return (
    <div onClick={setSongHandler} className={"library-song" + clsName}>
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h2>{song.name}</h2>
        <h3>{song.artist}</h3>
      </div>
    </div>
  );
};

export default LibrarySong;
