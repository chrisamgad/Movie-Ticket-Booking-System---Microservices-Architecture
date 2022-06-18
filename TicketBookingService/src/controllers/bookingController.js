const {publishMessageOnQueue} = require('../mqservice')


const BookTicket = (req,res,next) =>{

    publishMessageOnQueue(req,res,next);

}

module.exports = {
    BookTicket : BookTicket
}