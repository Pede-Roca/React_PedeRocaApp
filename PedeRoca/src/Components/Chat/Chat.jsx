import React, { useState, useEffect } from "react";
import styles from './Chat.module.css'
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const db = getFirestore();

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("date"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc.data());
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, [db]);

  const handleNewMessage = async () => {
    await addDoc(collection(db, "messages"), {
      date: new Date(),
      message: newMessage,
    });
    setNewMessage("");
  };

  return (
    <>
      <div>
        {messages.map((message, index) => (
          <div key={index} className={styles.Chat}>
            <p>{message.message}</p>
            <p className={styles.data}>
              {new Date(message.date.toDate()).toLocaleTimeString([], {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className={styles.input}
      />
      <button onClick={handleNewMessage} className={styles.botao}>
        Enviar
      </button>
    </>
  );
};

export default Chat;