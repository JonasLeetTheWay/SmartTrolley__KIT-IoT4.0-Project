import Peer from 'simple-peer'

export default class simplePeer {
    peer = null 
    init = (stream, initiator) => {
        console.log(stream)
        if (!stream) {
            stream = null
        }
        this.peer = new Peer({
            initiator: initiator,
            stream: stream,
            channelConfig:{maxRetransmits:0,ordered:true},
            channelName:"datachannel",
            trickle: false,
            reconnectTimer: 1000,
            iceTransportPolicy: 'relay',
            config: {
                iceServers: []
            },
            objectMode:true,
        })
        return this.peer
    }
    connect = (otherId) => {
        this.peer.signal(otherId)
    } 
    send = (data) =>{
        this.peer.send(data)
    }
    
} 