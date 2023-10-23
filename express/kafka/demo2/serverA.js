const express = require('express');
const kafka = require('kafka-node');

const app = express();
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' }); // 根据您的Kafka配置更改
const producer = new Producer(client);

const admin = new kafka.Admin(client);
const topicToCheck = 'test1';
admin.listTopics((err, topics) => {
    if (err) {
        console.error('Error listing topics:', err);
        return
    }
    console.log('[p0.1] topics', topics)
    if (topics[topicToCheck]) {
        console.log(`Topic '${topicToCheck}' already exists.`);
        return
    }
    // 如果不存在，创建新的 topic
    const topicsToCreate = [
        {
            topic: topicToCheck,
            partitions: 3, // 指定分区数量
            replicationFactor: 2, // 指定复制因子
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

// producer.on('ready', () => {
//   console.log('Service A is ready to send messages to Kafka');
app.get('/send', (req, res) => {
    const payloads = [
        {
            topic: 'test',
            messages: 'Message from Service A',
        },
    ];

    producer.send(payloads, (err, data) => {
        if (err) {
            console.error('Error sending message from Service A:', err);
            res.status(500).send('Error sending message');
            return
        }
        console.log('Message sent from Service A:', data);
        res.send('Message sent');
    });
});

app.listen(3000, () => {
    console.log('Service A listening on port 3000');
});
// });

