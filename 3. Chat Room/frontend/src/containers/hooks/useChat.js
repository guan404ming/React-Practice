import { useState, useEffect, createContext, useContext } from "react";
import { message } from "antd";

const ChatContext = createContext({
    status: {},
    me: "",
    signedIn: false,
    messages: [],
    startChat: () => {}, 
    sendMessage: () => {},
    clearMessages: () => {},
});

const client = new WebSocket('ws://localhost:4000')

const ChatProvider = (props) => {
    const LOCALSTORAGE_KEY = "save-me";
    const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

    const [status, setStatus] = useState({});
    const [me, setMe] = useState(savedMe || "");
    const [signedIn, setSignedIn] = useState(false);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (signedIn) {
          localStorage.setItem(LOCALSTORAGE_KEY, me);
        }
    }, [me, signedIn]);
    
    const displayStatus = (s) => {
		if (s.msg) {
			const { type, msg } = s;
			const content = { content: msg, duration: 0.75 }
			switch (type) {
				case 'success':
					message.success(content)
					break
				case 'error':
				default:
					message.error(content)
					break
			}
		}
	}

    const sendData = (data) => {
        client.send(
            JSON.stringify(data)
        );
    };

    const startChat = () => {
        client.send(
            JSON.stringify(["CHAT"])
        )
    }

    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);
        switch (task) {
            case "output": {
                if ([...payload] !== [...messages])
                {
                    setMessages(() => [...payload]); 
                }
                break;
            }
            case "load": {
                setMessages(() => [...payload]); 
                break;
            }
            case "status": {
                setStatus(payload);
                break;
            }
            default: break;
        }
    }

    const sendMessage = (name, to, body) => {
        if (!name || !to || !body) throw new Error('name or to or body required')
        sendData(["MESSAGE", {name, to , body}]);
    }

    return (
      <ChatContext.Provider
        value={{
          status, me, signedIn, messages, 
          setMe, setSignedIn, sendMessage, displayStatus, startChat
        }}
        {...props}
      />
); };
 

const useChat = () => useContext(ChatContext);

export { ChatProvider, useChat };