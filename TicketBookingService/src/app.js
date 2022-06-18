const express = require('express');

// const { addRoutes } = require('./routes/api');
const booking_routes = require('../routes/bookingRoutes');

const PORT = process.env.PORT || 3000;
//const { injectExchangeService, amqpConnect } = require('./services/mqService');

const {connectRabbitMQ} = require('./mqservice');



startServer = () => {

    // establish mq connection
    // amqpConnect();
    
    // create an express app
    const app = express();


    // middleware to parse request
    app.use(express.json());

    // middleware to inject message-queue services
    // app.use(injectExchangeService);

    // add all routes
    // addRoutes(app);
    app.use(booking_routes)

    connectRabbitMQ();

    app.listen(PORT, () => {
        console.log(`Ticket-Booking-service listening on port ${PORT}`);
    })
}

module.exports = {
    startServer: startServer
}