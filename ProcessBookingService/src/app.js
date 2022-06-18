

const amqplib = require('amqplib/callback_api');
const queue = 'processBookingQueue';
const exchange = 'exchange';
const routingKey= 'process_booking_service_queue_key'

const startServer = () =>{

    try{
        amqplib.connect('amqp://localhost', (err, conn) => {
            if (err) throw err;
    
            // Listener
            conn.createChannel((err, ch2) => {
                if (err) throw err;
    
                ch2.assertExchange(exchange, 'direct', {
                    durable: false
                });
                
                ch2.assertQueue(queue);
                ch2.bindQueue(queue, exchange, routingKey);
    
                ch2.consume(queue, (msg) => {
                    if (msg !== null) {
                        //console.log(msg.content.toString())
        
                        let messageObjParsed = JSON.parse(msg.content.toString());
                        // console.log(sendConfirmationEmail(messageObjParsed))
                        console.log(`Booking of ${messageObjParsed.Name} is done processed`)
                        ch2.ack(msg);
                    }
                    else {
                        console.log('Consumer cancelled by server');
                    }
                });
            });
        })
    }catch(e){
        console.log(e)
    }

    
}

module.exports ={
    startServer
}