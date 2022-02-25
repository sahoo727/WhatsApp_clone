import React, { useEffect, useState } from 'react';
import {Avatar} from '@mui/material';
import './SidebarChat.css';
import db from './firebase';
import {Link} from "react-router-dom";

function SidebarChat({ id,name,addNewChat }) {
    const [seed,setSeed] = useState("");
    const [messages,setMessages] = useState("");

    useEffect(() => {
        if(id){
            db.collection('rooms')
            .doc(id)
            .collection('messages')
            .orderBy('timestamp','desc')
            .onSnapshot(snapshot => {
                setMessages(snapshot.docs.map((doc) =>
                    doc.data()
                ))
            })
        }
    },[id])

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    } , []);

    const createChat = () => {
        const roomName = prompt("please enter name");

        if(roomName){
            db.collection('rooms').add({
                name : roomName,
            })
        }
    };

    return !addNewChat ?(
        <Link to={`/rooms/${id}`}>
        <div className="sidebarchat">
            <Avatar src={`https://avatars.dicebear.com/api/miniavs/${seed}.svg`}/>
            <div className="sidebarchat_info">
                <h2>{name}</h2>
                <p>{messages[0]?.message}</p>
            </div>
            
        </div>
        </Link>
    ):(
        <div onClick={createChat}
        className="sidebarchat">
            <h2>Add new chat</h2>
        </div>
    );
}

export default SidebarChat
