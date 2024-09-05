import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Loader from "./Loader";

const SongList = ({
  searchQuery,
  setActiveSong,
  showTopTracks,
  setSongCover,
  onSetFilteredSongs,
}) => {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setThemeColor } = useContext(ThemeContext);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://cms.samespace.com/items/songs");
      const data = await res.json();
      const songsWithDuration = await Promise.all(
        data.data.map(async (song) => {
          const audio = new Audio(song.url);
          return new Promise((resolve) => {
            audio.addEventListener("loadedmetadata", () => {
              song.duration = audio.duration;
              resolve(song);
            });
          });
        })
      );
      setSongs(songsWithDuration);
    } catch (error) {
      console.error("Error in fetching songs: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = songs.filter(
      (song) =>
        (song.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (!showTopTracks || song.top_track)
    );
    setFilteredSongs(filtered);
    onSetFilteredSongs(filtered);
  }, [songs, searchQuery, showTopTracks, onSetFilteredSongs]);

  const handleSongClick = (song) => {
    setActiveSong(song);
    setSongCover(song.cover);
    setThemeColor(song.accent);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {loading ? (
        <Loader />
      ) : filteredSongs.length === 0 ? (
        <li className="text-center py-4 text-gray-400">Not found. Sorry!</li>
      ) : (
        filteredSongs.map((item) => (
          <button onClick={() => handleSongClick(item)} key={item.id}>
            <li className="flex items-center justify-between rounded-lg h-[90px] px-2 cursor-pointer hover:bg-white/10">
              <div className="flex">
                <div className="size-11 rounded-full overflow-hidden mt-1">
                  <img
                    className="w-full h-full object-cover object-center"
                    src={`https://cms.samespace.com/assets/${item.cover}`}
                    alt={`${item.name} cover`}
                  />
                </div>

                <div className="flex flex-col items-start justify-between ml-3">
                  <span>{item.name}</span>
                  <span className="text-gray-400 text-sm">{item.artist}</span>
                </div>
              </div>

              <div className="">
                {item.duration
                  ? new Date(item.duration * 1000).toISOString().substr(14, 5)
                  : "0:00"}
              </div>
            </li>
          </button>
        ))
      )}
    </div>
  );
};

export default SongList;
