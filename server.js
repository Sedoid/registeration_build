const express= require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require("fs");
// const cors = require('cors');

const app = express();

const accounts = {
    accounts: []
}



fs.mkdir("database",() =>{
    console.log(" Directory Succesfully Created");
})

fs.writeFile(path.join(__dirname,"database","record.json"),`${JSON.stringify(accounts)}`,()=>{
    console.log('Accounts file created successfully');
});

app.use(express.static(path.join(__dirname,"/build")));



app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,"build",'index.html'));
})

app.use(bodyParser.json());


app.post('/register',(req,res)=>{
    let newStudent = req.body;
    var records;
    fs.readFile('./database/record.json','utf-8',(error,data)=>{
         records = JSON.parse(data);
        //  console.log(records);
         records.accounts.push(newStudent);

         fs.writeFile(path.join(__dirname,"database","record.json"),`${JSON.stringify(records)}`,(error,success) =>{
            console.log('Student details has been set i think');
            console.log(error);
            console.log(success);
        })
    })
 
})

app.post('/update',(req,res) =>{
    let studentUpdate = req.body;
    var records;
    fs.readFile('./database/record.json','utf-8',(error,data)=>{
         records = JSON.parse(data);
        //  console.log(records);
         records.accounts.splice(studentUpdate.id,1);
         records.accounts.push(studentUpdate);

         fs.writeFile(path.join(__dirname,"database","record.json"),`${JSON.stringify(records)}`,(error,success) =>{
            console.log('Student details has been set i think');
            console.log(error);
            console.log(success);
        })
    })

})

app.post('/delete',(req,res) =>{
    let deleteId = req.body;
    fs.readFile('./database/record.json','utf-8',(error,data)=>{
        records = JSON.parse(data);
        // console.log(records);
        records.accounts.splice(deleteId.id,1);

            fs.writeFile(path.join(__dirname,"database","record.json"),`${JSON.stringify(records)}`,(error,success) =>{
                    console.log('Student details has been set i think');
                    console.log(error);
                    console.log(success);
                })
           
   })
})

app.get('/update',(req,res) =>{
    fs.readFile('./database/record.json','utf-8',(error,data)=>{
        records = JSON.parse(data);
        console.log(records);
        res.status(200).json(data);
       
    })

})





app.listen(process.env.PORT || 8080,() =>{
    console.log('server running 8080');
});