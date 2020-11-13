import "./styles/app.scss";
import React, { useState } from "react";
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";
import Nav from "./components/Nav";
import data from "./data";

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);

  return (
    <div className="App noSelect">
      <div className={`play-area ${libraryStatus ? "play-area-shift" : ""}`}>
        <Nav
          setLibraryStatus={setLibraryStatus}
          libraryStatus={libraryStatus}
        />
        <Song currentSong={currentSong} />
        <Player
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          songs={songs}
          setSongs={setSongs}
        />
      </div>
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
        currentSong={currentSong}
        setLibraryStatus={setLibraryStatus}
        libraryStatus={libraryStatus}
      />
    </div>
  );
}

export default App;
