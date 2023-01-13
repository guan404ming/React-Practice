 import { useState, useRef, useEffect } from "react";
import { Input, Tabs} from "antd";
import styled from "styled-components";
import { useChat } from "./hooks/useChat";
import Title from "../components/Title";
import ChatModal from "../components/ChatModal";
import Message from "../components/Message";

const FootRef = styled.div`
    height: 20px;
`

const ChatBoxesWrapper = styled(Tabs)`
    width: 100%;
    height: 300px;
    background: #eeeeee52;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
    overflow: auto;
`;

const ChatRoom = () => {
    const { me, messages, sendMessage, displayStatus, startChat} = useChat();
    const [body, setBody] = useState('');
    const [msgSent, setMsgSent] = useState(false);
    const [chatBoxes, setChatBoxes] = useState([]); // { label, children, key }
    const [activeKey, setActiveKey] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const msgFooter = useRef(null);
    const scrollToBottom = () => {
        msgFooter.current?.scrollIntoView
            ({ behavior: 'smooth', block: "start" });
    };
    useEffect(() => {
        setMsgSent(false);
    }, [msgSent]);

    useEffect(() => {
        if (messages.length !== 0) {
            const index = chatBoxes.findIndex(({ key }) => key === activeKey);
            const newChatBoxes = chatBoxes;
            newChatBoxes[index].children = renderChat(messages);
            setTimeout(() => {
                setBody(' ')
            }, 100);
            setTimeout(() => {
                setBody('')
                scrollToBottom();
            }, 200);
        }
    }, [messages])

    const renderChat = (chat) => {
        scrollToBottom();
        return (
            (chat.length !== 0) ? 
            <>
                {chat.map(({ name, to, body }, i) => (
                    ((name === me && activeKey === to) || (name === activeKey && to === me)) ? <Message isMe={name === me} name={name} message={body} key={i}></Message> : <div key={i}></div>
                ))}
                <FootRef ref={msgFooter} />
            </>: 
            <p style={{ color: '#ccc' }}> No messages... </p>
        )
    }

    const extractChat = (friend) => {
        return renderChat(messages.filter(({ name, body }) => ((name === friend) || (name === me))));
    }

    const createChatBox = (friend) => {
        if (chatBoxes.some(({ key }) => key === friend)) {
            throw new Error(friend + "'s chat box has already opened.");
        }
        startChat()
        const chat = extractChat(friend);
        setChatBoxes([...chatBoxes, { label: friend, children: chat, key: friend }]);
        setMsgSent(true);
        return friend;
    }

    const removeChatBox = (targetKey, activeKey) => {
        const index = chatBoxes.findIndex(({ key }) => key === activeKey);
        const newChatBoxes = chatBoxes.filter(({ key }) => key !== targetKey);
        setChatBoxes(newChatBoxes);
        return activeKey ?
                activeKey === targetKey ?
                    index === 0 ?
                        '' : chatBoxes[index - 1].key
                    : activeKey
                : ''
    }

    return (
        <>
            <Title name={me} />
            <ChatBoxesWrapper
                onChange={(key) => {
                    setActiveKey(key);
                    extractChat(key);
                }}

                onEdit={(targetKey, action) => {
                    if (action === 'add') setModalOpen(true);
                    else if (action === 'remove') {
                        setActiveKey(removeChatBox(targetKey, activeKey));
                    }
                }}
                items={chatBoxes}
                activeKey={activeKey}
                type="editable-card"
            >
            </ChatBoxesWrapper>
            
            <ChatModal
                open={modalOpen}
                onCreate={({ name }) => {
                    setActiveKey(createChatBox(name));
                    extractChat(name);
                    setModalOpen(false);
                }}
                onCancel={() => { setModalOpen(false);}}
            />
            
            <Input.Search
                value={body}
                onChange={(e) => setBody(e.target.value)}
                enterButton="Send"
                placeholder="Type a message here..."
                onSearch={(msg) => {
                    if (!msg) {
                        displayStatus({
                            type: 'error',
                            msg: 'Please enter a username and a message body.'
                        })
                    }
                    else {
                        sendMessage(me, activeKey, msg)
                        setMsgSent(true);
                    }
                }}
            ></Input.Search>
        </>
    )
}

export default ChatRoom