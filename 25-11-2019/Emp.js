const express = require('express')
const query = require('querystring')
const bodyParser = require('body-parser');
const fs = require('fs')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())

const port = 3000

app.get('/',(req,res) =>res.send("Hello world"))

app.listen(port,() => console.log("App is running on port 3000"))

function read(){
   return fs.readFileSync('./data.json','utf8',(err,jString)=>{
        if(err){
            console.log('Error in fs',err)
        }else{
            //console.log(jString)
            return jString
        }
    })
}



/*app.get('/employee',(req,res)=>{
    var empDetails = JSON.parse(read());
    //let rem = req.query.remove;
    var empMap = empDetails.map(({salary,...rest})=>rest)
    res.send(empMap)
})*/

app.get('/employee',(req,res)=>{
    var empDetails = JSON.parse(read());
    let prjct = req.query;
    //console.log(prjct)
    let i=0;
    for(key in prjct)
    {
        if(empDetails[i].hasOwnProperty(key))
        {
            var empFiltr = empDetails.filter(e=>(e.project === "dev"))
            res.send(empFiltr)
            
        }else{
            throw "Respected key value is not present"
        }
        i++; 
    }
    
    
    
})

app.get('/employee/ctc',(req,res) =>{

    var empDetails = JSON.parse(read());
    var total = empDetails.reduce((acc,emp)=>acc+emp.salary,0)
     res.send('Total salary of employees='+total)
        //console.log('emp')
})




