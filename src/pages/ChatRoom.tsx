import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../Chat.css";

type UserData = {
  name: string;
  content: string;
};

const ChatRoom = () => {
  const [content, setContent] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [items, setItems] = useState<UserData[]>([]);
  const context = useContext(AuthContext);

  const { id } = useParams();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setItems([...items, { name: name, content: content }]);
  };

  return (
    <div>
      <h2>{id}</h2>
      <div className="balloon_l">
        <div className="faceicon">
          <img src={`${process.env.PUBLIC_URL}/logo192.jpg`} alt="Logo" />
        </div>
        <p className="says">ばばけんきもい</p>
      </div>
      <div className="balloon_r">
        <table>
          {items.map((item: UserData) => {
            return (
              <tr>
                {/* <td>{item.name}</td> */}
                <div className="balloon_r">
                  <div className="says">
                    <p>
                      <td>{item.content}</td>
                    </p>
                  </div>
                  <div className="faceicon">
                    <img
                      src={`${process.env.PUBLIC_URL}/hiroyuki.jpg`}
                      alt="Logo"
                    />
                  </div>
                </div>
              </tr>
            );
          })}
        </table>
      </div>
      <form onSubmit={handleSubmit}>
        名前：
        <input value={name} onChange={(e) => setName(e.target.value)} />
        チャット：
        <input value={content} onChange={(e) => setContent(e.target.value)} />
        <button>Add</button>
      </form>
    </div>
  );
};

export default ChatRoom;
