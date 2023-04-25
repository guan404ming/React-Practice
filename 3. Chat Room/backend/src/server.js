import http from 'http';
import express from 'express'
import mongoose from 'mongoose'
import WebSocket from 'ws'
import mongo from './mongo'
import wsConnect from './wsConnet'

mongo.connect();

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })
const db = mongoose.connection

db.once('open', () => {
    console.log("MongoDB connected!"); 
    wss.on('connection', (ws) => {
        let clients = wss.clients
        ws.onmessage = wsConnect.onMessage(ws, clients);
    });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => { 
    console.log(`Example app listening on port ${PORT}!`)
});