//KAFKA CLIENT
const kafka = require('kafka-node'),
      Producer = kafka.Producer,
      client = new kafka.KafkaClient({kafkaHost: '127.0.0.1:9092'}),
      producer = new Producer(client);
//const client = new kafka.KafkaClient({kafkaHost: '127.0.0.1:9092'});

try {
    //const Producer = kafka.producer;
    //const client = new kafka.Client({kafkaHost: '127.0.0.1:9092'});
    //const producer = new Producer(client);
    const kafka_topic = 'inavitas_example';
    console.log(kafka_topic);

    let payload = [{
        topic: kafka_topic,
        messages: ['message body'], // multi messages should be a array, single message can be just a string or a KeyedMessage instance
        key: 'theKey', // string or buffer, only needed when using keyed partitioner
        partition: 0, // default 0
        attributes: 2, // default: 0
        timestamp: Date.now() // <-- defaults to Date.now() (only available with kafka v0.10+)
    }];

    producer.on('ready', async function(){
        let push_status = producer.send(payload, (err, data) => {
            if (err){
                console.log('kafka-producer -> '+kafka_topic+' kafka topic error'+ err)
            } else {
                console.log('kafka-producer -> '+kafka_topic+' kafka topic success')
            }
        })
    })
    producer.on('error', function (err) {
        console.log(err)
        console.log('kafka-producer -> '+kafka_topic+' kafka connection error')
        throw err;
    })

    console.log("::> Kafka Server is Ready")
} catch (e) {
    console.log(e);
}
