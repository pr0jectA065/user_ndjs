function regEmailContent(){

    const subject='Welcome to Testli';
    const body='<B>Use this link to complete registration..</B>';

    var regEmailContent={
        subject:[subject],
        bodyHtml:[body]
    };

    return regEmailContent;
}


//const forgotUserEmail=(userId)=>{
function forgotUserIdEmailContent(userId){
    const subject='Welcome to Testli';
    const body='<B>Your userId is : '+userId+'</B>';
    const url='http://gotestli.com';

    var forgotUserIdEmailContent={
        subject:[subject],
        bodyHtml:[body]
    };

    return forgotUserIdEmailContent;

}


//appContext - depending on which app is this called from,
//either testli or knocknock
function forgotPwdEmailContent(userId,token,appContext){
    const subject='Welcome to Testli';
    const url=appContext+
              '?t='+token+'&email='+userId
    const body='Hi <B>'+userId+'</B>.'+
               '<BR><BR>'+
               'Please use the following link to reset your password.'+
               '<BR><BR>'+
               url

    var forgotPwdEmailContent={
        subject:[subject],
        bodyHtml:[body]
    };

    return forgotPwdEmailContent;
}

module.exports={
    regEmailContent,
    forgotUserIdEmailContent,
    forgotPwdEmailContent
};