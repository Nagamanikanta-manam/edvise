import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../Context/Socketproviders";
import ReactPlayer from "react-player";
import peer from "../service/peer";

const RoomPage = () => {
    const socket = useSocket();
    const [remotesocketid, setremotesocketid] = useState(null);
    const [mystream, setmystream] = useState(null);
    const [remotestream, setremotestream] = useState(null);
    const [addedTracks, setAddedTracks] = useState(new Set());

    const userJoined = useCallback(({ email, id }) => {
        console.log('user joined');
        console.log(id, email);
        setremotesocketid(id);
    }, []);

    const handlecalluser = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });
        const offer = await peer.getOffer();
        socket.emit("user:call", {
            to: remotesocketid,
            offer,
        });
        setmystream(stream);
    }, [remotesocketid, socket]);

    const handleIncomingcall = useCallback(async ({ from, offer }) => {
        console.log("calllll come");
        console.log("incoming call", from, offer);
        setremotesocketid(from);
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });
        setmystream(stream);
        const ans = await peer.getAnswer(offer);
        socket.emit('call:accepted', { to: from, ans });
    }, [socket]);

    const sendStreams = useCallback(() => {
        if (mystream) {
            for (const track of mystream.getTracks()) {
                if (!addedTracks.has(track)) {
                    peer.peer.addTrack(track, mystream);
                    setAddedTracks(prev => new Set(prev.add(track)));
                }
            }
        }
    }, [mystream, addedTracks]);

    const handlecallaccepted = useCallback(({ from, ans }) => {
        if (mystream) {
            peer.setLocalDescription(ans);
            sendStreams();
            console.log("call accepted!");
        } else {
            console.error("No local stream available");
        }
    }, [mystream, sendStreams]);

    const handleNegoneeded = useCallback(async () => {
        const offer = await peer.getOffer();
        socket.emit('peer:nego:needed', { offer, to: remotesocketid });
    }, [remotesocketid, socket]);

    useEffect(() => {
        peer.peer.addEventListener('negotiationneeded', handleNegoneeded);
        return () => {
            peer.peer.removeEventListener('negotiationneeded', handleNegoneeded);
        };
    }, [handleNegoneeded]);

    useEffect(() => {
        const handleTrack = (ev) => {
            const remoteStream = ev.streams;
            setremotestream(remoteStream[0]);
        };

        peer.peer.addEventListener('track', handleTrack);
        console.log("got tracks");

        return () => {
            peer.peer.removeEventListener('track', handleTrack);
        };
    }, []);

    const handleNegoneededIncoming = useCallback(async ({ from, offer }) => {
        const ans = await peer.getAnswer(offer);
        socket.emit('peer:nego:done', { to: from, ans });
    }, [socket]);

    const handleNegoneededFinal = useCallback(async ({ ans }) => {
        await peer.setLocalDescription(ans);
    }, []);

    useEffect(() => {
        socket.on("user:joined", userJoined);
        socket.on("incoming:call", handleIncomingcall);
        socket.on("call:accepted", handlecallaccepted);
        socket.on("peer:nego:needed", handleNegoneededIncoming);
        socket.on("peer:nego:final", handleNegoneededFinal);

        return () => {
            socket.off("user:joined", userJoined);
            socket.off("incoming:call", handleIncomingcall);
            socket.off("call:accepted", handlecallaccepted);
            socket.off("peer:nego:needed", handleNegoneededIncoming);
            socket.off("peer:nego:final", handleNegoneededFinal);
        };
    }, [socket, userJoined, handleIncomingcall, handlecallaccepted, handleNegoneededIncoming, handleNegoneededFinal]);

    return (
        <div>
            <h1>Room page</h1>
            <h4>{remotesocketid ? "connected" : "no one in room"}</h4>
            {mystream && <button onClick={sendStreams}>Send My Stream</button>}
            {remotesocketid && <button onClick={handlecalluser}>Call</button>}
            <div>
                <h4>My Stream</h4>
                {mystream && <ReactPlayer url={mystream} playing muted height="300px" width="600px" />}
            </div>
            <div>
                <h4>Remote Stream</h4>
                {remotestream && <ReactPlayer url={remotestream} playing muted height="300px" width="600px" />}
            </div>
        </div>
    );
};

export default RoomPage;
