var express = require('express');
var router = express.Router();
var getSqlConnection = require('../../config/db');
var Promise = require("bluebird");


router.post('/',function(req,res){
    //res.json("This is post request");
	var params  = {
        preemailid : req.body.preemailid,
        newemailid:req.body.newemailid
		//created_date: new Date()
	}
   console.log(params);
   return updateEmailID(params)
   .then(() => getChatId(params.newemailid))
   .then(result => {
      res.end(JSON.stringify(result));
   }).done(); 
})

function updateEmailID(params){
    return   Promise.using(getSqlConnection(), function(connection){
        return connection.query('update chat.chat SET  email_id = "'+params.newemailid+'" where email_id ="'+params.preemailid+'"')
        .then(result => {
            console.log(result.insertId);
             return result.insertId;
        }).catch(err =>{
            return err;
        });
   });
}

function getChatId(emailid){
 
    return   Promise.using(getSqlConnection(), function(connection){
        //return connection.query('select chat_id from chat.chat where username ="'+username+'" and email_id="'+emailid+'"')
        return connection.query('select chat_id from chat.chat where  email_id="'+emailid+'"')
        .then(rows => {
            console.log(rows);
             return rows;
        }).catch(err =>{
            return err;
        });

   });
}

module.exports = router;