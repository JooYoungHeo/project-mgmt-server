const nodemailer = require('nodemailer');
const smtpPool = require('nodemailer-smtp-pool');

exports.sendMail = function(list){
  let smtpTransport=nodemailer.createTransport(smtpPool( {
      service:'Gmail',
      host:'localhost',
      port:'465',
      tls:{
          rejectUnauthorize:false
      },
      auth:{
          user:'jyhur900226@gmail.com',
          pass:'chltjsdud!@'
      },
      maxConnections:5,
      maxMessages:10
  }) );

  let mailOpt={
      // to:'jyhur900226@zuminternet.com',
      to: list,
      subject:'Nodemailer 테스트 테스트',
      html:'<span>html 테스트</h1>'
  };

  smtpTransport.sendMail(mailOpt, (err, res) => {
      if (err) console.log(err);
      else console.log('Message send :'+ JSON.stringify(res));

      smtpTransport.close();
  });
};
