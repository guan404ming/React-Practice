import { Message } from './models/message.js'

const sendData = (data, ws) => {
    ws.send(JSON.stringify(data));
}

const sendStatus = (payload, ws) => {
    sendData(["status", payload], ws);
}

const broadcastMessage = (clients, data, status) => {
    if (clients) {
        clients.forEach((client) => {
            sendData(data, client);
            sendStatus(status, client);
        });
    }
}

export default {
    onMessage: (ws, clients) => (
        async function (byteString) {
            const { data } = byteString;
            const [task, payload] = JSON.parse(data);
            switch (task) {
                case 'MESSAGE': {
                    const { name, to, body } = payload;
                    // Save payload to DB
                    const message = new Message({ name, to, body });
                    try {
                        await message.save();
                    } catch (e) {
                        throw new Error("Message DB save error: " + e);
                    }

                    Message.find().sort({ created_at: -1 }).limit(1000)
                    .exec((err, res) => {
                            if (err) throw err;
                            // initialize app with existing messages
                            broadcastMessage(clients, ['output', res], {
                                type: 'success',
                                msg: 'Message sent.'
                            })
                        }
                    )
                    break;
                }

                case 'CHAT': {
                    Message.find().sort({ created_at: -1 }).limit(1000)
                        .exec((err, res) => {
                            if (err) throw err;
                            // initialize app with existing messages
                            sendData(["load", res], ws);
                            sendStatus({
                                type: 'success',
                                msg: 'Message loaded.'
                            }, ws);
                        }
                    )
                }
                default: break;
            }
        }
    )
}