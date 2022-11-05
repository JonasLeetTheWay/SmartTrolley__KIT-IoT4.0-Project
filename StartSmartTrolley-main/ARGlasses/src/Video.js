import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import VideoFeed from "./videoFeed";
import stupidObj from "./stupidObj";

function Video(props) {
  // make sure videofeed is only rendered once
  if (stupidObj.stupid) {
    stupidObj.stupid = false;
    Object.freeze(stupidObj);
    return VideoFeed(props);
  }

  return (
    <div class="position-absolute">
      <video
        autoPlay
        id="localVideo"
        muted
        ref={props.localVideo}
        width={document.getElementById("root").offsetWidth}
      ></video>
    </div>
  );
}

export default Video;
