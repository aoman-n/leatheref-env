import React, { useState, useEffect } from 'react';
import Cable from 'actioncable';

const Chat = () => {
  const [messages, addMessages] = useState([]);
  const [value, updateValue] = useState('');
  const [chats, setChats] = useState();
  const [id, incrementId] = useState(0);

  useEffect(() => {
    createSocket(receivedMessage);
  }, [])

  const handleChangeValue = (e) => {
    const value = e.target.value;
    updateValue(value);
  }

  const hanbleSubmit = (e) => {
    e.preventDefault();
    chats.speak({ id: id, content: value });
    incrementId(prev => prev + 1);
    updateValue('');
  }

  const receivedMessage = (data) => {
    addMessages(prev => prev.concat(data));
  }

  const createSocket = (callback) => {
    let cable = Cable.createConsumer('ws://localhost:8080/cable?access-token=6&room_id=1');
    const chats = cable.subscriptions.create({
      channel: 'ChatChannel',
      room: '1'
    }, {
      connected: () => {
        console.log('connected!!!');
      },
      received: (data) => {
        console.log(data);
        callback(data);
      },
      speak: function(chatContent) {
        this.perform('speak', chatContent);
      }
    });
    setChats(chats);
  }

  return (
    <div className="App">
      <div>action cable</div>
      <form onSubmit={hanbleSubmit}>
        <input type="text" value={value} onChange={handleChangeValue} placeholder="type text" />
        <button type="submit">send</button>
      </form>
      <ul>
        {messages.map(message => (
          <li key={message.id}>{message.content} :{message.created_at}</li>
        ))}
      </ul>
    </div>
  );
}

export default Chat;