import List from "./List";
import Points from "./Points";
import { useSelector, useDispatch } from "react-redux";
import { setoverlaySt } from "./redux/actions";

export default function Overlay(props) {
  const dispatch = useDispatch(); // to set react redux values
  const overlaySt = useSelector((state) => state.overlaySt);

  // handle Table updates send via MQTT
  props.client.on("message", function (topic, message) {
    // message is Buffer
    console.log("messagen in List");
    console.log(message.toString());
    // setSta(JSON.parse(message.toString()));
    const trolley = JSON.parse(message.toString()).trolley;
    const entrys = JSON.parse(message.toString()).entrys;
    const points = [];
    entrys.forEach((e) => {
      points.push({ label: e.name, x: 0, y: 0 });
    });
    const data = { trolley: trolley, entrys: entrys, points: points };
    // update overlay state with new data
    dispatch(setoverlaySt(data));
  });

  return (
    <div>
      <Points client={props.client} st={overlaySt} />
      <List client={props.client} st={overlaySt} />
    </div>
  );
}
