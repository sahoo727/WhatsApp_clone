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
import { useStateValue } from './SateProvider';
import firebase from 'firebase/compat';


function Chat() {
    const [input, setInput] = useState("");
    const [seed,setSeed] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [message, setMessages] = useState([]);
    const [{user},dispatch] = useStateValue();

    useEffect(() => {
        if(roomId){
            db.collection("rooms").doc(roomId).onSnapshot((snapshot) => 
                setRoomName(snapshot.data().name)                
            );

            db.collection('rooms').doc(roomId).collection("messages").orderBy('timestamp','asc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map((doc) =>
                    doc.data()
                ))
            ))
            
        }
    },[roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    } , [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message : input,
            name : user.displayName,
            timestamp : firebase.firestore.FieldValue.serverTimestamp(),
        });
        setInput("");
    }

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/miniavs/${seed}.svg`}/>
                <div className="chat_headerinfo">
                    <h3>{roomName}</h3>
                    <p>Last seen {" "} {new Date(message[message.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
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
                {message.map((message) => (
                    <p className={`chat_message ${message.name === user.displayName && "chat_reciever"}`}>
                        <span className="chat_name">{message.name}</span>
                        {message.message}
                        <span className="chat_timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}
                
                
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