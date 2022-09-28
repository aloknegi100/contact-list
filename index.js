const { query } = require('express');
const express=require('express');
const path=require('path');
const port=8000;

const db=require('./config/mongoose');
const Contact=require('./models/contact');
const app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('asset'));



// var contacts=[{name:"Alok Singh Negi",
//     phone:"8826544293"
// },{name:"Coding Ninjas",
// phone:"8825524294"
// },{name:"Deeksha Negi",
// phone:"9966544293"
// }]

app.get('/',(req,res)=>{
    Contact.find({},function(err,contacts){
        if(err)
        {
            console.log("error in finding contacts");
            return;
        }
        res.render('home',{contacts})

    })
    
})

app.post('/create-contact',(req,res)=>{
    // contacts.push({name:req.body.name,phone:req.body.phone});
    // res.redirect('/')
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err)
        {
            console.log("error in creating a contact");
            return;
        }
        console.log("successfully created a contact ****",newContact);
        return res.redirect('back');
        
    })
    

})

app.get('/delete-contact/',(req,res)=>{
   
    let id=req.query.id;
    Contact.findByIdAndDelete(id,(err)=>{
        if(err)
        {
            console.log('error in deleting element by id');
            return;
        }
        return res.redirect('back');
    })
    
})
app.listen(port,(err)=>{
    if(err)
    {
        console.log("error",err);
        return;
    }
    console.log("running on port:",port);
})
