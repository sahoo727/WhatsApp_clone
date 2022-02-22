import React, { useEffect, useState } from 'react';
import {Avatar,IconButton} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import { useParams } from 'react-router-dom';
import './Chat.css';
import db from './firebase';


function Chat() {
    const [input, setInput] = useState("");
    const [seed,setSeed] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");

    useEffect(() => {
        if(roomId){
            db.collection("rooms").doc(roomId).onSnapshot((snapshot) => 
                setRoomName(snapshot.data().name)
                
            );
            
        }
    },[roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    } , [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        setInput("");
    }

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/miniavs/${seed}.svg`}/>
                <div className="chat_headerinfo">
                    <h3>{roomName}</h3>
                    <p>Last seen...</p>
                </div>

                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="chat_body">
                <p className={`chat_message ${true && "chat_reciever"}`}>
                    <span className="chat_name">sahoo</span>
                    Hey!!!
                    <span className="chat_timestamp">11:20am</span>
                </p>
                
            </div>

            <div className="chat_footer">
                <InsertEmoticonIcon/>
                <form >
                    <input value={input} 
                        onChange = {(e) => setInput(e.target.value)}
                        type="text" placeholder="Type a message">
                    </input>
                    <button onClick={sendMessage} type="submit">send msg</button>
                </form>
                <MicIcon/>
            </div>
        </div>
    )
}

export default Chat