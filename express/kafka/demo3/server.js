const { Kafka } = require('kafkajs');
const express = require('express');
const app = express();

// 创建Kafka客户端
const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092'],
});

// 创建生产者
const producer = kafka.producer();
const topic = 'test'
// 创建消费者
const consumer = kafka.consumer({ groupId: 'my-group' });

async function produceAndConsume() {
    await producer.connect();
    
    // 生产消息
    await producer.send({
        topic,
        messages: [
            { value: 'Hello, Kafka!' },
        ],
    });

    await consumer.connect();
    await consumer.subscribe({ topic });
    console.log('[p1.21] subscribe success')
    // 消费消息
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log('[p1.0]', {
                topic,
                partition,
                value: message.value.toString(),
            });
        },
    });
    console.log('[p1.2] add callback success')
}

produceAndConsume().then(_ => {

})

app.get('/send', async (req, res) => {
    console.log('[p1.0] send')
    await producer.send({
        topic,
        messages: [
            { value: 'Hello, Kafka!' },
        ],
    });
    console.log('[p1.0] send success')
    res.send('finish')
});

app.listen(3000, () => {
    console.log('Service A listening on port 3000');
});