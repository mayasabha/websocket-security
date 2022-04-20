import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({
    port: 8080,
    perMessageDeflate: {
        zlibDeflateOption: {
            chunkSize: 1024,
            memLevel: 7,
            level: 3,
        },
        zlibInflateOptions: {
            chunkSize: 10 * 1024,
        },
        clientNoContextTakeover: true,
        serverNoContextTakeover: true,
        serverMaxWindowBits: 10,
        concurrencyLimit: 10,
        threshold: 1024,
    },
});

wss.on('connection', function connection(ws) {
    console.log('New Client Connected!');

    ws.on('message', function message(data) {
        console.log('Message Received: %s', data);
        ws.send(data);
    });
});