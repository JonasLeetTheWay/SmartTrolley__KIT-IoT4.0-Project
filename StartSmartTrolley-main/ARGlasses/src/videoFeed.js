//Style import
//React Components import
import React, { useState, useEffect, useRef } from "react";
import simplePeer from "./helpers/simple-peer";
//Redux/ DataManagement import
import io from "socket.io-client";
import { generateId, getTimeStamp } from "./helpers/utilities";
import { useSelector, useDispatch } from "react-redux";
import {
  addLabelToLabelList,
  setCurrentLabel,
  toggletakeImg,
  toggleStartTraining,
  setTrainingFinished,
  setRemoveLabelFromServer,
} from "./redux/actions";

export default function VideoFeed(props) {
  // hardCoded Credentials to log in to kimoknow Server - the server url can be
  const userName = "i40student01"; //i40student has to be in the name for the server to answer - the number can be incremented. 01 is the default user
  const roomId = `KimoknowRoom_${userName}`;
  const remoteName = `Backend_${userName}`;

  const signalingServerURL = "https://devpeerconnect2.kimoknow.de";

  // ref storages for the peer conntection
  const peer = useRef({});
  const localStream = useRef({});
  const localVideo = props.localVideo;
  const remoteVideo = useRef();
  const socket = useRef(io(signalingServerURL));
  const initiator = useRef(false); // this MUST be true for peer to signal

  const [connectedToPeer, setConnectToPeer] = useState(false);

  // use redux state management for calls to peer connection which may be triggered from outside
  const takeImg = useSelector((state) => state.takeImg);
  const drawBoundingBox = useSelector((state) => state.drawBoundingBox);
  const boundingBoxPosition = useSelector((state) => state.boundingBoxPosition);
  const selectedLabel = useSelector((state) => state.selectedLabel);
  const startTraining = useSelector((state) => state.startTraining);
  const highlightThreshold = useSelector((state) => state.highlightThreshold);
  const removeLabelOnServer = useSelector((state) => state.removeLabelOnServer);

  const dispatch = useDispatch(); // to set react redux values

  // ref storages for component internal handling
  const highlightThresholdLocal = useRef(0.7);
  const lastLabel = useRef("");

  const SimplePeer = new simplePeer(); // basic wrapper for the SimplePeer Libary

  const setupPeer = (remoteName) => {
    console.log("Connecting to peer");

    //configuring the peerConnection
    const peerObject = SimplePeer.init(localStream.current, initiator.current);
    console.log(peerObject);

    peerObject.on("signal", (data) => {
      console.log(userName + " send peer signal");
      const signal = {
        name: userName,
        roomId: roomId,
        remoteName: remoteName,
        desc: data,
      };
      socket.current.emit("signal", signal);
    });

    peerObject.on("stream", (stream) => {
      console.log("KimoknowDetectionServer got stream.");
      remoteVideo.current.srcObject = stream;
    });

    peerObject.on("error", (err) => {
      console.log("peer error");
      console.log(err);
    });

    /* when connection was established sending a welcome message 
    and setting up the models running on the backendServer*/
    peerObject.on("connect", () => {
      console.log("onConnected");
      setConnectToPeer(true);
      peerObject.send(
        JSON.stringify({
          type: "welcome",
          data: "Here is a message from your Internet Browser",
        })
      );
      // set detection model here
      peerObject.send(
        JSON.stringify({
          type: "select_classification_model",
          data: "default.kcmodel",
        })
      ); //here hardcoded - should be setup in redux
      peerObject.send(
        JSON.stringify({
          type: "select_detection_model",
          data: "frontplatte_steuereinheit.kmodel",
        })
      ); //here hardcoded - should be setup in redux
    });
    peerObject.on("data", (data) => {
      var jsonData = JSON.parse(data);

      if (jsonData.type === "welcome") {
        console.log(jsonData.data);
      } else if (jsonData.type === "labelList") {
        console.log(`${jsonData.type}:${jsonData.data}`);
        handleNewLabelList(jsonData.data.labels);
      } else if (jsonData.type === "trainingStatus") {
        if (jsonData.data === "trainingFinished") {
          dispatch(setTrainingFinished(true));
        } else if (jsonData.data === "trainingStarted") {
          dispatch(setTrainingFinished(false));
        }
      } else if (jsonData.type === "labeldata") {
        const receivedLabel = jsonData.data.label;
        if (jsonData.data.type === "detection") {
          // handle detection Data
          props.onDet(jsonData.data);
          console.log(jsonData.data);
        }
        if (parseFloat(jsonData.data.conf) >= highlightThresholdLocal.current) {
          if (
            lastLabel.current !== receivedLabel &&
            jsonData.data.type === "classification"
          ) {
            receivedLabel !== "empty"
              ? (lastLabel.current = receivedLabel)
              : (lastLabel.current = "");
            dispatch(setCurrentLabel(lastLabel.current));
          }
          if (
            jsonData.data.type === "detection" ||
            jsonData.data.type === "classification"
          ) {
            // handle detection Data
            props.onDet(jsonData.data);
            console.log(jsonData.data);
          }
        } else {
          lastLabel.current = "";
          dispatch(setCurrentLabel(lastLabel.current));
        }
        peerObject.send(
          JSON.stringify({
            type: "confirm",
            data: "labelReceived",
          })
        );
      }
    });

    peer.current = peerObject;
  };
  const connectToPeer = (otherId) => {
    console.log("Peer Connection");
    SimplePeer.connect(otherId);
  };

  // component did mount - setting up the socket to connect to signaling server
  useEffect(() => {
    console.log(`Establishing connection ${signalingServerURL}`);
    console.log(`Gererated socket ${socket}`);
    var video = document.getElementById("localVideo");
    video.setAttribute("playsinline", true); // to show the signal on iPhone

    getUserMedia().then(() => {
      console.log(`LOGIN:${userName} is logging in.`);
      socket.current.emit("login", {
        name: userName,
        remoteName: remoteName,
        roomId: roomId,
      });
    });

    socket.current.on("ready", () => {
      console.log(`READYTOPAIR:${userName} is ready to pair.`);
      initiator.current = true;
      setupPeer(remoteName);
    });

    socket.current.on("desc", (data) => {
      console.log("desc");
      if (data.desc.type === "offer" && initiator.current) return;
      if (data.desc.type === "answer" && !initiator.current) return;
      connectToPeer(data.desc);
    });
    socket.current.on("disconnected", () => {
      console.log("disconnected");
      initiator.current = true;
    });
  }, []);

  // component did render
  /* on every external setting of a redux state which should affect the server 
  send command via datachannel to the server to show a reaction */
  useEffect(() => {
    if (takeImg) {
      !drawBoundingBox
        ? peer.current.send(
            JSON.stringify({
              type: "takeImg",
              data: {
                label: selectedLabel,
                boundingBox: { xmin: -1, ymin: -1, xmax: -1, ymax: -1 },
              },
            })
          )
        : peer.current.send(
            JSON.stringify({
              type: "takeImg",
              data: { label: selectedLabel, boundingBox: boundingBoxPosition },
            })
          );
      dispatch(toggletakeImg());
    }

    if (startTraining && connectedToPeer) {
      console.log("StartTrainingWithTimeStamp", getTimeStamp());
      peer.current.send(
        JSON.stringify({
          type: "startTraining",
          data: {
            type: "classification",
            model: "WebQuickTrainModel",
            user: userName,
            timestamp: getTimeStamp(),
          },
        })
      );
      dispatch(toggleStartTraining());
    } else if (startTraining && !connectedToPeer) {
      console.log(
        "TrainStartError: Peer not connected. No training with timeStamp:",
        getTimeStamp()
      );
    }
    if (removeLabelOnServer !== "" && connectedToPeer) {
      peer.current.send(
        JSON.stringify({
          type: "removeLabel",
          data: removeLabelOnServer,
        })
      );
      dispatch(setRemoveLabelFromServer(""));
    } else if (removeLabelOnServer !== "" && !connectedToPeer)
      console.log(
        `DELETELABELERROR: Peer not connected. Label: ${removeLabelOnServer} was only deleted from Actimage`
      );
    dispatch(setRemoveLabelFromServer(""));
    if (highlightThreshold !== highlightThresholdLocal.current) {
      highlightThresholdLocal.current = highlightThreshold;
    }
  });

  const getUserMedia = () =>
    new Promise((resolve, reject) => {
      navigator.mediaDevices.getUserMedia =
        navigator.mediaDevices.getUserMedia ||
        navigator.mediaDevices.webkitGetUserMedia ||
        navigator.mediaDevices.mozGetUserMedia ||
        navigator.mediaDevices.msGetUserMedia;
      const op = {
        video: {
          width: { min: 160, ideal: 640, max: 1280 },
          height: { min: 120, ideal: 360, max: 720 },
          facingMode: "environment", // frontCamera: "user", backCamera: "environment"
        },
        // require audio
        audio: false,
      };
      navigator.mediaDevices
        .getUserMedia(op)
        .then((stream) => {
          localStream.current = stream;
          localVideo.current.srcObject = stream;
          localVideo.current.setAttribute("playsinline", true);
          resolve();
        })
        .catch((err) => console.log(err) || reject(err));
    });

  const handleNewLabelList = (labelListWithoutIds) => {
    labelListWithoutIds.forEach((label) => {
      dispatch(addLabelToLabelList({ id: generateId(), label: label }));
    });
  };

  return (
    <div class="position-absolute">
      <video
        autoPlay
        id="localVideo"
        muted
        ref={localVideo}
        width={document.getElementById("root").offsetWidth}
      ></video>
    </div>
  );
}
