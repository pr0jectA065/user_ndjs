var Mailgun=require('mailgun-js');

var mailConfig=require('../config/mail.provider.mailgun')
//var mailContent=require('../config/mail.content')

const sendEmail=(toEmailAddr,emailContent)=>{
    
    //console.log(emailContent.subject)
    //console.log(emailContent.bodyHtml)
    //console.log(toEmailAddr)

    //Your api key, from Mailgun’s Control Panel
    var api_key=mailConfig.mailgunConfig.api_key;
    //Your domain, from the Mailgun Control Panel
    var domain=mailConfig.mailgunConfig.domain;
    //Your sending email address
    var from_who=mailConfig.mailgunConfig.from;

    var mailgun=new Mailgun({apiKey:api_key,domain:domain});

    var data={
        //Specify email data
        from:from_who,
        //The email to contact
        to:toEmailAddr,
        //Subject and text data  
        subject:emailContent.subject,
        html:emailContent.bodyHtml
    }

    //smtpTransporter.sendMail(mailOptions,function(err){
    mailgun.messages().send(data,function(err,body){
        if (err){
            console.log('smtpTransporter error:\n'+err.message);
            return;
            //return res.status(500).send({msg:err.message});
        } else {
            //res.render('submitted',{email:user.email});
            console.log(body);
        }
    });
}

module.exports=sendEmail;