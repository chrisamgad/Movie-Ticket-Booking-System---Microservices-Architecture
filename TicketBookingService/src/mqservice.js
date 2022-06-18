

const amqplib = require('amqplib/callback_api');
const queue = 'tasks';
const queue2 = 'processBookingQueue';
const exchange = 'exchange';
const routingKey= 'notification_service_queue_key'
const routingKey2= 'process_booking_service_queue_key'
var channel;

const connectRabbitMQ = () =>{
    amqplib.connect('amqp://localhost', (err, conn) => {

    
    // Sender
    conn.createChannel((err, ch1) => {
        channel = ch1;
        if (err) throw err;

        // ch1.assertQueue(queue);
        // ch1.assertQueue(queue2);
        ch1.assertExchange(exchange, 'direct', {durable: false});

        console.log('Rabbit MQ ON')
    });
   
})

}

const publishMessageOnQueue =(req, res, next) =>{

    let orderDetails = req.body;
    //setInterval(() => {
        //ch1.sendToQueue(queue, Buffer.from('something to do')); //This uses default exchange
        channel.publish(exchange, routingKey,  Buffer.from(JSON.stringify({ //publishes the message onto the exchange that re-routes the message to the queue (using the routingKey provided)
            'Name': orderDetails.Name,
            'MovieTicketType' : orderDetails.MovieTicketType,
            'TimeofMovie' : orderDetails.TimeofMovie
        }))); //We use publish function to define any other exchange other than the default exchange

        channel.publish(exchange, routingKey2,  Buffer.from(JSON.stringify({ //publishes the message onto the exchange that re-routes the message to the queue (using the routingKey provided)
            'Name': orderDetails.Name,
            'MovieTicketType' : orderDetails.MovieTicketType
            // 'TimeofMovie' : "10pm to 12am"
        }))); //We use publish function to define any other exchange other than the default exchange
    //}, 1000);

    res.status(200).json(orderDetails)
}

module.exports ={
    connectRabbitMQ,
    publishMessageOnQueue
}