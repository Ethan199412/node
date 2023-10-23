const express = require('express');
const kafka = require('kafka-node');

const app = express();
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(client);

// 创建 test topic
const admin = new kafka.Admin(client);
const topicToCheck = 'test';
admin.listTopics((err, topics) => {
  if (err) {
    console.error('Error listing topics:', err);
    return
  }
  if (topics[topicToCheck]) {
    console.log(`Topic '${topicToCheck}' already exists.`);
    return
  }
  // 如果不存在，创建新的 topic
  const topicsToCreate = [
    {
      topic: topicToCheck,
      partitions: 1, // 指定分区数量
      replicationFactor: 1, // 指定复制因子
    },
  ];

  admin.createTopics(topicsToCreate, (err, results) => {
    if (err) {
      console.error('Error creating topic:', err);
      return
    }
    console.log(`Topic '${topicToCheck}' created successfully.`);
  });
});

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