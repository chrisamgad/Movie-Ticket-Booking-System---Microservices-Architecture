
const amqplib = require('amqplib/callback_api');
const queue = 'tasks';
const exchange = 'exchange';
const routingKey= 'notification_service_queue_key'
const {sendConfirmationEmail} = require('./controller/emailController')

const startServer = () =>{

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
                //console.log(JSON.parse(msg.content.toString()).TimeofMovie);
                let messageObjParsed = JSON.parse(msg.content.toString());
                // console.log(sendConfirmationEmail(messageObjParsed))
                sendConfirmationEmail(messageObjParsed).then((res)=>{
                    if(res.success == true){
                        console.log('Acked')
                        ch2.ack(msg); //if ack not sent for any reason, the message is re-added onto the queue, and when the ack is finally successfully sent, the message is removed from the queue (Fault Tolerance)
                    }
                    //else, don't send ack, which means the message is re-added onto the queue until the confirmation email is sent successfully

                    }).catch((e)=>{
                        console.log('Failed Email')
                    }) 
        
            }
            else {
                console.log('Consumer cancelled by server');
            }
        });
        });
    })
}


module.exports = {
    startServer
}