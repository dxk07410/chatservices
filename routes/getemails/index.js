var express = require('express');
var router = express.Router();
var getSqlConnection = require('../../config/db');
var Promise = require("bluebird");



router.get('/',function(req,res){
    let username = req.query.username;
    return Promise.resolve(true)
    .then(() => getEmails(username))
    .then(chatId => {
        //res.end(JSON.stringify(chatId));
        res.status(200).send(chatId);
    })
})

function getEmails(username){
 
    return   Promise.using(getSqlConnection(), function(connection){
        return connection.query('select email_id from chat.chat where  username="'+username+'"')
        .then(rows => {
            console.log(rows);
             return rows;
        }).catch(err =>{
            return err;
        });

   });
}



module.exports = router;