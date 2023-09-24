const express = require('express');
const kafka = require('kafka-node');

const app = express();
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const consumer = new Consumer(
  client,
  [{ topic: 'test', partition: 0 }],
  { autoCommit: true }
);

consumer.on('message', (message) => {
  console.log('Received message from Kafka:', message.value);
  // 进行文件上传逻辑
});

app.listen(4000, () => {
  console.log('Consumer server listening on port 4000');
});