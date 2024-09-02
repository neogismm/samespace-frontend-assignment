import React, { useState } from "react";
import ResizableFlexbox from "./components/ResizableFlexbox";
import Search from "./components/Search";
import SongList from "./components/SongList";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  let flexboxHeight = "h-screen";

  return (
    <div className="mt-4">
      <ResizableFlexbox flexboxHeight={flexboxHeight}>
        <div className={`flex border items-center justify-center ${flexboxHeight}`}>
          <p>Logo & Profile</p>
        </div>
        <div className={`${flexboxHeight} w-full`}>
          <div className="flex">
            <span className="flex-1 text-left text-2xl font-bold">For You</span>
            <span className="flex-1 text-center text-2xl font-bold">Top Tracks</span>
            <span className="flex-1 text-right"></span>
          </div>

          <Search onSearch={setSearchQuery} />
          <SongList searchQuery={searchQuery} />
        </div>
        <div className={`flex border items-center justify-center ${flexboxHeight}`}>
          Player
        </div>
      </ResizableFlexbox>
    </div>
  );
};

export default App;