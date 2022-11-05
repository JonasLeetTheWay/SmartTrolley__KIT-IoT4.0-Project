//Style import
import "./styles/App.scss";
import styled from "styled-components";
import kimoknow_background from "./resource/kimoknow_background.png";
//React Components import

import { useRef } from "react";
import Video from "./Video";
import Overlay from "./overlay";
import { setoverlaySt } from "./redux/actions";
import { useSelector, useDispatch } from "react-redux";

const StyledVideoStreamBackground = styled.div`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${kimoknow_background});
  height: 100%;
  width: 100%;
  text-align: center;
  position: fixed;
  top: 0;
  display: flex;
`; //just some easy inCode Styling

console.log("connecting mqtt...");
const mqtt = require("mqtt");
const options = {
  keepalive: 60,
  //username: "pi",
  //password: "pi",
  port: 8080, //8081,
};
const client = mqtt.connect("wss://imi-i40-mqtt.imi.kit.edu", options); //imi-i40-mqtt.imi.kit.edu:8080

client.on("connect", function () {
  console.log("Connected");
  client.subscribe("obdet/in", function (err) {
    console.log("sub obdet/in");
  });
});

function App() {
  const dispatch = useDispatch(); // to set react redux values
  const currentLabel = useSelector((state) => state.currentLabel); // use Redux State Management
  const overlaySt = useSelector((state) => state.overlaySt);
  const localVideo = useRef();

  var lastDetection = "";

  // handle detection data

  const setLastDetection = (label) => {
    if (lastDetection !== label) {
      lastDetection = label;
      const out = { label: label };
      client.publish("rpi/obdet/out", out);
    }
  };

  const findEntryInJdata = (data, label) => {
    var out = "";
    if (data.length > 0) {
      data.forEach((det) => {
        if (det.label === label && det.conf * 10 > 5) {
          out = det;
        }
      });
    }
    return out;
  };

  const onDetec = (jdata) => {
    if (jdata.type === "detection") {
      const width = document.getElementById("root").offsetWidth;
      const height = document.getElementById("localVideo").offsetHeight;
      var p = overlaySt.points;
      var first = true;
      p.forEach((po) => {
        const detecLabel = po.label;
        var x = -30;
        var y = -30;
        var det = findEntryInJdata(jdata.data, detecLabel);
        if (det != "") {
          x = (det.bb.xmax - det.bb.xmin) / 2 + det.bb.xmin;
          y = (det.bb.ymax - det.bb.ymin) / 2 + det.bb.ymin;
          if (first) {
            setLastDetection(detecLabel);
            first = false;
          }
        }
        po.x = x * width;
        po.y = y * height;
      });
      dispatch(
        setoverlaySt({
          trolley: overlaySt.trolley,
          entrys: overlaySt.entrys,
          points: p,
        })
      );
    }
  };

  return (
    <div className="App">
      <StyledVideoStreamBackground>
        {" "}
        {/*just some basic css styling*/}
        <div className="styledVideoStream">
          {/*just some basic css styling*/}
          <div id="videoPlaceholder" class="position-absolute top-0 start-0">
            {" "}
            {/*just some basic css styling
            <h3 style={{ color: "white" }}>
              {currentLabel ? `${currentLabel}` : "Nothing detected"}
            </h3>
            */}
            <div class="position-relative">
              <Video
                id="videoStream"
                client={client}
                onDet={onDetec}
                localVideo={localVideo}
              />
              {/*Here the main peer connection is contained */}
              <Overlay client={client} />
            </div>
          </div>
        </div>
      </StyledVideoStreamBackground>
    </div>
  );
}

export default App;
