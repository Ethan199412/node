const express = require('express');
const cors = require('cors');
const fs = require('fs')

const app = express();
const port = 3000;

app.use(cors());

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

app.get('/', (req, res) => {
    const file = fs.readFileSync('./index.html').toString()
    res.send(file)
})

app.get('/sse', (req, res) => {
    res.set({
        'Content-Type': 'text/event-stream',
        // 'Cache-Control': 'no-cache',
        // 'Connection': 'keep-alive'
    });

    res.flushHeaders();

    let i = 0
    const id = setInterval(() => {
        const data = {
            message: `Current time is ${new Date().toLocaleTimeString()}`
        };
        i++
        if (i >= 5) {
            clearInterval(id)
        }

        res.write(`data: ${JSON.stringify(data)}\n\n`);
    }, 1000);
});
