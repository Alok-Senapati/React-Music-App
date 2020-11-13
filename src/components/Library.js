import React from "react";
import LibrarySong from "./LibrarySong";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const Library = ({
  songs,
  setCurrentSong,
  setSongs,
  currentSong,
  setLibraryStatus,
  libraryStatus,
}) => {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <div className="library-title">
        <h1>Library</h1>
        <FontAwesomeIcon
          icon={faTimesCircle}
          className="close-library noSelect"
          onClick={() => setLibraryStatus(!libraryStatus)}
        />
      </div>
      <div className="library-songs">
        {songs.map((song, id) => (
          <LibrarySong
            song={song}
            key={id}
            setCurrentSong={setCurrentSong}
            currentSong={currentSong}
            setSongs={setSongs}
            songs={songs}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
