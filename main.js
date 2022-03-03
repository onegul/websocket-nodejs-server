const WebSocketServer = require('ws')

const wss = new WebSocketServer.Server({port: 8080})

wss.on("connection", ws => {
    // ws.send('kidan?')
    console.log("new client connected")

    var startSessionRequest = '{' +
    '"actionId":"start_batting_session",' +
    '"uid":"johndoe@email.com",' +
    '"fullName":"John Doe",' +
    '"gender":"male",' +
    '"isRightHand":true' +
    '}'

    var startSwingRequest = '{' +
    '"actionId":"start_batting_swing",' +
    '"uid":"johndoe@email.com",' +
    '"speed":100,' + 
    '"length":8,' + 
    '"direction":"on_stumps",' +
    '"swingNum":2,' +
    '"bowlerName":"Alice"' +
    '}'

    var statsRequest = '{' +
    '"actionId":"batting_swing_stats",' +
    '"uid":"johndoe@email.com",' +
    '"status":200' +
    '}'

    var reStatsRequest = '{' +
    '"actionId":"req_batting_swing_stats",' +
    '"uid":"johndoe@email.com",' +
    '"swingNum":2' +
    '}'

    var endSessionRequest = '{' +
    '"actionId":"end_batting_session",' +
    '"uid":"johndoe@email.com"' +
    '}'

    var invalidRequest = '{' +
    '"actionId":"invalid",' +
    '"uid":"johndoe@email.com",' +
    '"fullName":"John Doe",' +
    '"gender":"male",' +
    '"isRightHand":true' +
    '}'

    ws.send(startSessionRequest)
    console.log("Message sent=" + startSessionRequest)

    ws.on("ping", () => {
        console.log("ping from client")
    })

    ws.on("pong", () => {
        console.log("pong from client")
        ws.close()
    })

    ws.on("message", data => {
        console.log("Message received=" + data)
        // setTimeout(() => {
        //     if (data.includes("start_batting_session")) {
        //         ws.send(startSwingRequest)
        //         console.log("Message sent=" + startSwingRequest)
        //     } else if (data.includes("req_batting_swing_stats")) {
        //         ws.send(endSessionRequest)
        //         console.log("Message sent=" + endSessionRequest)
        //     } else if (data.includes("batting_swing_stats")) {
        //         ws.send(statsRequest)
        //         ws.send(reStatsRequest)
        //         console.log("Message sent=" + statsRequest)
        //         console.log("Message sent=" + reStatsRequest)
        //     } else if (data.includes("end_batting_session")) {
        //         ws.send(invalidRequest)
        //         console.log("Message sent=" + invalidRequest)
        //     } else if (data.includes("unknown")) {
        //         ws.ping()
        //     }
        // }, 10000);
    })
    ws.on("close", () => {
        console.log("the client has disconnected");
    });
    // handling client connection error
    ws.onerror = function () {
        console.log("Some Error occurred")
    }
})
console.log("The WebSocket server is running on port 8080")
