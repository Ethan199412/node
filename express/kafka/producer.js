const express = require('express');
const kafka = require('kafka-node');

const app = express();
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(client);

app.get('/upload', (req, res) => {
  const message = 'File upload request';
  const payloads = [
    {
      topic: 'test',
      messages: message
    }
  ];

  producer.send(payloads, (err, data) => {
    if (err) {
      console.error('Error sending message to Kafka:', err);
      res.status(500).send('Error sending message to Kafka');
    } else {
      console.log('Message sent to Kafka:', message);
      res.send('Message sent to Kafka');
    }
  });
});

app.listen(3000, () => {
  console.log('Producer server listening on port 3000');
});