"use client";

import React, { useState, useReducer } from "react";
import ReactPlayer from "react-player";

import { videos } from "../data/Videos";
import VideoInfo from "./VideoInfo";
// import VideoList from "../data/VideoList";

export default function Player() {
  const [playback, setPlayback] = useState(false);

  const playPause = () => {
    setPlayback((playback) => !playback);
  };

  interface CurrentVideoID {
    videoID: number;
  }

  interface Action {
    type: "increment" | "decrement" | "reset";
  }

  function currentVideo(
    current: CurrentVideoID,
    action: Action
  ): CurrentVideoID {
    switch (action.type) {
      case "increment":
        return { videoID: current.videoID + 1 };
      case "decrement":
        return { videoID: current.videoID - 1 };
      case "reset":
        return { videoID: 0 };
      default:
        throw new Error();
    }
  }

  const [current, dispatch] = useReducer(currentVideo, { videoID: 0 });
  const video = videos[current.videoID].url;

  const nextVideo = () => {
    current.videoID !== videos.length - 1
      ? dispatch({ type: "increment" }, setPlayback(true))
      : dispatch({ type: "reset" }, setPlayback(true));
  };

  // const previousVideo = () => {
  //   current.videoID !== 0 && dispatch({ type: "decrement" }, setPlayback(true));
  // };

  return (
    <div className="w-full h-full fixed bg-black">
      <div
        className="w-full h-full absolute z-40 cursor-pointer"
        onClick={playPause}
      ></div>
      <div className="absolute z-50 right-0 bottom-0 p-4 mr-4 flex items-center justify-end">
        <div
          className="text-white text-4xl transition ease-in-out hover:scale-125 cursor-pointer"
          onClick={nextVideo}
        >
          →
        </div>
      </div>
      <VideoInfo />
      <ReactPlayer
        width="100%"
        height="100%"
        url={video}
        muted={false}
        playing={playback}
        onEnded={nextVideo}
      />
    </div>
  );
}
