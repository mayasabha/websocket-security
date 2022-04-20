import WebSocket from 'ws';
import fs from 'fs';

const ws = new WebSocket('ws://localhost:8080');

const messages = JSON.parse(fs.readFileSync('../message.json')).messages;

let t0, t1, t2, t3, t4, t5;

let first_message_received = false;
let series_message_sent = false;

t0 = performance.now();
ws.on('open', function open() {
    t1 = performance.now();
    console.log('Time Taken for initial setup', (t1 - t0));
    ws.send(messages[0]);
    // console.log("Connected");
    // console.log("Sending %s", message.content);
    t2 = performance.now();
    console.log('Time Taken from Initialization to First Message Sent', (t2 - t0));

    setTimeout(() => sendMessages(), 500);
});

ws.on('message', function message(data) {
    // console.log("Received: %s", data);
    if (data == messages[0] && !first_message_received) {
        t3 = performance.now();
        console.log('Time Taken from First Message Sent to First Message Received', (t3 - t2));
        console.log('Total Time taken from Initialization to First Successful Bidirectional Conversation', (t3 - t0));
        first_message_received = true;
    } else if (data == messages[4] && series_message_sent) {
        t5 = performance.now();
        const average_time = (t5 - t4) / 5;
        console.log('Average Time for each message sent and received', average_time);
    }
});

function sendMessages() {
    t4 = performance.now();
    messages.forEach(async (message) => {
        await ws.send(message);
    });
    series_message_sent = true;
}
