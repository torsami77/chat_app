import React, { useEffect, useState } from "react";

function Chat({socket, username, room}){
    const [currentMessage, setCurrentMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const sendMessage = async () => {
        if(currentMessage !== ''){
            const messageData = {
                room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + 
                ':' + 
                new Date(Date.now()).getMinutes(),
            };
            await socket.emit('send_message', messageData);
            setChatHistory((history) => [...history, messageData]);

        }
    }

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setChatHistory((history) => [...history, data]);
        })
    }, [socket])

    return (
        <div>
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body">
                {console.log(chatHistory)}
                {
                chatHistory.map((chat) => {
                   return <p className={`chat ${chat.author === username ? 'author': ''}`}>{chat.message}</p>
                })}
            </div>
            <div className="chat-footer">
                <input type="text" placeholder="Hey...."
                onChange={(event) => {
                    setCurrentMessage(event.target.value);
                }}/>
                <button onClick={sendMessage}>send</button>
            </div>
        </div>
    )
}

export default Chat;