import React, { useState, useEffect } from "react";

const SongList = ({ searchQuery, setActiveSong, showTopTracks, setSongCover, setFilteredSongs, duration }) => {
  const [songs, setSongs] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch("https://cms.samespace.com/items/songs");
      const data = await res.json();
      setSongs(data.data);
    } catch (error) {
      console.error("Error in fetching songs: ", error);
    }
  };

  useEffect(() => {
    fetchData();
    setFilteredSongs(filteredSongs);
  }, []);

  const filteredSongs = songs.filter(
    (song) =>
      (song.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!showTopTracks || song.top_track)
  );

  const handleSongClick = (song) => {
    setActiveSong(song);
    setSongCover(song.cover);
  }

  return (
    <ul className="flex flex-col">
      {filteredSongs.map((item) => (
        <button onClick={() => handleSongClick(item)} key={item.id}>
          <li className="flex border h-24">
            <div>
              <img
                height={40}
                width={40}
                src={`https://cms.samespace.com/assets/${item.cover}`}
                alt={`${item.name} cover`}
              />
            </div>
            <div>
              Song: {item.name} Artist: {item.artist}
            </div>
            <div>{duration ? new Date(duration * 1000).toISOString().substr(11, 8) : "0:00"}</div>
          </li>
        </button>
      ))}
    </ul>
  );
};

export default SongList;