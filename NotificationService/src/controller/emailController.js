
var nodemailer = require('nodemailer');




sendConfirmationEmail = async (messageContent) => {

    try{
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();


    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'catherine.waters39@ethereal.email',
            pass: 'abbfJcXCWPuPqkUFNn'
        }
    });

    var mailOptions = {
        from: '"Movie System App 👻" <chrisamgad@gmail.com>', // sender address
        to: "catherine.waters39@ethereal.email", // list of receivers
        subject: `Movie Ticket Confirmation - ${messageContent.Name}`,
        text: `Your Ticket Booking was successfull. Your Movie ticket type is ${messageContent.MovieTicketType} and its time is ${messageContent.TimeofMovie}`
      };
      
    //   console.log('test')
    
        let info = await transporter.sendMail(mailOptions)
            // console.log('test')           
            console.log('Email sent: successfully');
            return {
                "success" : true
            } 
        
    }catch(e){
     
        console.log('Email sent Failed');
            // console.log(e)
            // return {
            //     "success" : false
            // } 
        
    }

}

module.exports = {
    sendConfirmationEmail
}

