const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieparser=require('cookie-parser');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const cors = require('cors')
require('dotenv').config();
var app = express();


var conn = mysql.createConnection({
    host: "localhost",
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DATABASE
});
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieparser());

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie:{
        secure:true,
        maxAge:100*60*60*24//ms
    }

}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  // for parsing application/x


//========================================================================================================


app.post('/Register', async function (req, res) {
    let username = req.body.name;
    let email = req.body.email;
    let bpassword = req.body.bpassword;
    let password = req.body.password;
    let mobile = req.body.mobile;


    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    var digitinpass = 0;
    var capitalletterinpass = 0;
    var smallletterinpass = 0;
    var speinpass = 0;

    for (var i = 0; i < password.length; i++) {
        var char = password.charAt(i);
        if (char.match(/[a-z]/)) {
            smallletterinpass++;
        }
        if (char.match(/[A-Z]/)) {
            capitalletterinpass++;
        }
        if (char.match(/[0-9]/)) {
            digitinpass++;
        }
        if (char.match(/[$@#&!]/)) {
            speinpass++;
        }
    }

    if (email && username && password && mobile && bpassword) {
        if (!validRegex.test(email)) {
            return res.send("Please enter a valid email.");
        }
        else if (password.length < 8 || capitalletterinpass < 1 || smallletterinpass < 1 || digitinpass < 1 || speinpass < 1) {
            return res.send("Password is weak. Please enter a strong password.");
        }
        else if (bpassword != password) {
            return res.send("Passwords not same.");
        } else {
            const hashedPassword = await bcrypt.hash(password, 10); 
            conn.query('INSERT INTO users (name, password, email, mobileno) VALUES (?, ?, ?, ?)',
                [username, hashedPassword, email, mobile], function (err, result) {
                    if (err) {
                        console.error(err);
                        return res.status(500).send("Internal server error.");
                    }
                    console.log("Registered");
                    // return res.send("Registered");
                    res.send({ username });

                });
        }
    } else {
        res.send('Please enter all data');
    }
});

//========================================================================================================


app.post('/adminRegister', async function (req, res) {
    let adminname = req.body.name;
    let email = req.body.email;
    let bpassword = req.body.bpassword;
    let password = req.body.password;
    let mobile = req.body.mobile;


    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    var digitinpass = 0;
    var capitalletterinpass = 0;
    var smallletterinpass = 0;
    var speinpass = 0;

    for (var i = 0; i < password.length; i++) {
        var char = password.charAt(i);
        if (char.match(/[a-z]/)) {
            smallletterinpass++;
        }
        if (char.match(/[A-Z]/)) {
            capitalletterinpass++;
        }
        if (char.match(/[0-9]/)) {
            digitinpass++;
        }
        if (char.match(/[$@#&!]/)) {
            speinpass++;
        }
    }

    if (email && adminname && password && mobile && bpassword) {
        if (!validRegex.test(email)) {
            return res.send("Please enter a valid email.");
        }
        else if (password.length < 8 || capitalletterinpass < 1 || smallletterinpass < 1 || digitinpass < 1 || speinpass < 1) {
            return res.send("Password is weak. Please enter a strong password.");
        }
        else if (bpassword != password) {
            return res.send("Passwords not same.");
        } else {
            const hashedPassword = await bcrypt.hash(password, 10); 
            conn.query('INSERT INTO admin (name, password, email, mobileno) VALUES (?, ?, ?, ?)',
                [adminname, hashedPassword, email, mobile], function (err, result) {
                    if (err) {
                        console.error(err);
                        return res.status(500).send("Internal server error.");
                    }
                    console.log("Registered");
                    // return res.send("Registered");
                    res.send({ adminname });

                });
        }
    } else {
        res.send('Please enter all data');
    }
});
//========================================================================================================

app.post('/Login',  function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    
    if (username && password) {

        conn.query('SELECT * FROM users WHERE name=?', [username],async function (err, result, fields) {
            const user = result[0];
            if (result.length === 0) {
                return res.status(401).send('Invalid username or password');
              }
            if (err) {
                console.error(err);
                res.status(500).send("error");
                return;
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (result.length > 0 && passwordMatch) {

                req.session.loggedin = true;
                req.session.username = result[0].name;
                const id=result[0].id;
                const token=jwt.sign({id},"jwtsecretkey",{expiresIn:3600})
                console.log("Logged in");
                return res.json({Login:username,token,result});
            } else {

                res.status(401).send("Incorrect username or password.");
                
            }
        });
    } else {
        res.status(400).send('Please enter username and password.');
    }
});

//========================================================================================================


app.post('/adminLogin',  function (req, res) {
    let adminname = req.body.adminname;
    let password = req.body.password;
    
    if (adminname && password) {

        conn.query('SELECT * FROM admin WHERE name=?', [adminname],async function (err, result, fields) {
            const user = result[0];
            if (result.length === 0) {
                return res.status(401).send('Invalid adminname or password');
              }
            if (err) {
                console.error(err);
                res.status(500).send("error");
                return;
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (result.length > 0 && passwordMatch) {

                req.session.loggedin = true;
                req.session.adminname = result[0].name;
                const id=result[0].id;
                const token=jwt.sign({id},"jwtsecretkey",{expiresIn:3600})
                console.log("Logged in");
                return res.json({adminLogin:adminname,token,result});
            } else {

                res.status(401).send("Incorrect adminname or password.");
                
            }
        });
    } else {
        res.status(400).send('Please enter adminname and password.');
    }
});

//========================================================================================================


const verifyjwt=(req,res,next)=>{
    const token=req.headers["access-token"];

    if(!token){
        return res.json("we need token please provide token next time")
    }
    else{
        jwt.verify(token,"jwtsecretkey",(err,decode)=>{

            if(err){
                res.json("not authenticated")
            }
            else{
                req.userId=decode.id;
                next();
            }
        })
    }
}

//=======================================================================================================

const verifyjwtadmin=(req,res,next)=>{
    const token=req.headers["access-token"];

    if(!token){
        return res.json("we need token please provide token next time")
    }
    else{
        jwt.verify(token,"jwtsecretkey",(err,decode)=>{

            if(err){
                res.json("not authenticated")
            }
            else{
                req.userId=decode.id;
                next();
            }
        })
    }
}

//==========================================================================================================

app.get('/checkauth',verifyjwt ,(req,res)=>{
    return res.json("authenticated");
})

//==========================================================================================================

app.get('/checkauthadmin',verifyjwtadmin ,(req,res)=>{
    return res.json("authenticated");
})

//==========================================================================================================

app.get('/home', function (req, res) {
    if(req.session.username){
        return res.json({valid:true,username:req.session.username})
    }
    else{
        return res.json({valid:false})
    }
});

//============================================================================================================

app.get('/adminhome', function (req, res) {
    if(req.session.adminname){
        return res.json({valid:true,adminname:req.session.adminname})
    }
    else{
        return res.json({valid:false})
    }
});

//=======================================================================================================

// app.get('/home', function (request, response) {
//     
//     if (request.session.loggedin) {
//    
//         response.send(request.session.username);
//     } else {
//        
//         response.send('Please login');
//     }
//     response.end();
// });


//=========================================================================================================

app.get('/home/products', (req, res) => {
    const sql = 'SELECT * FROM items';
    conn.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

app.get('/home/fproducts', (req, res) => {
    let {min,max}=req.query;
    min=min.toString();
    max=max.toString();

    const sql = 'SELECT * FROM items WHERE price BETWEEN ? AND ?';
    conn.query(sql, [min,max],(err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});
//=============================================================================================================

app.get('/home/cart', (req, res) => {
    const uname = req.query.name; 

    conn.query('SELECT * FROM carts WHERE users = ?', [uname], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Internal server error.");
        }
        res.json(results);
    });
});

//========================================================================================================

app.post('/home/cart', (req, res) => {
    const { name, item } = req.body;
    const { name: itemName, description, price } = item;

    // Check if the item already exists in the cart
    const newstocks=item.stocks-1;
    conn.query('UPDATE items SET stocks=? WHERE name=?',[newstocks,itemName],function(err,res){
            if(err){
                console.log(err);
                return res.status(500).send("Internal server error.");
            }
            console.log("item updated");
    });

    conn.query('SELECT * FROM carts WHERE users = ? AND itemname = ?', [name, itemName], function (err, results) {
        if (err) {
            console.error(err);
            return res.status(500).send("Internal server error.");
        }

        if (results.length > 0) {
            // If item exists, update the quantity (noofitem) and price
            const currentQuantity = results[0].no_of_item;
            const currentPrice = results[0].price;

            // Calculate new quantity and price
            const newQuantity = currentQuantity + 1;  // Adjust based on your logic
            const newPrice = parseInt(currentPrice) + parseInt(price);    // Adjust based on your logic
            
            
            // conn.query('UPDATE items SET stocks=? WHERE item=?',[newstocks,itemName],function(err,res){
            //     if(err){
            //         console.log(err);
            //         return res.status(500).send("Internal server error.");
            //     }
            //     console.log("item updated");
            // });
            // Update the cart with new quantity and price
            conn.query('UPDATE carts SET no_of_item = ?, price = ? WHERE users = ? AND itemname = ?',
                [newQuantity, newPrice, name, itemName], function (err, result) {
                    if (err) {
                        console.error(err);
                        return res.status(500).send("Internal server error.");
                    }
                    console.log("Cart updated");
                    res.send({ item, name });
                });
        } else {
            // If item doesn't exist, insert new row into carts table
            conn.query('INSERT INTO carts (users, itemname, description, price, no_of_item) VALUES (?, ?, ?, ?, ?)',
                [name, itemName, description, price, 1], function (err, result) {
                    if (err) {
                        console.error(err);
                        return res.status(500).send("Internal server error.");
                    }
                    console.log("Item added to cart");
                    res.send({ item, name });
                });
        }
    });
});


app.post('/home/updateitem', (req, res) => {
    const {  item,newQuantity ,newPrice} = req.body;
    console.log(newQuantity);
    console.log(item);

    // Ensure item and newQuantity are provided in the request body
    if (!newQuantity || !item || !item.Id) {
        return res.status(400).send("Invalid request parameters.");
    }

    conn.query('UPDATE carts SET no_of_item = ? ,price=? WHERE Id = ?', [newQuantity,newPrice, item.Id], (err, result) => {
        if (err) {
            console.error("Error updating item:", err);
            return res.status(500).send("Internal server error.");
        }
        
        console.log("Item updated successfully");
        res.send({ item, result });
    });
});

//=============================================================================================================

app.post('/home/removeitem', (req, res) => {
    const { name, item } = req.body;
    const { itemname } = item;

    conn.query('DELETE FROM carts WHERE users = ? AND itemname = ?', [name, itemname], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Internal server error.");
        }
        res.send({ success: true });
    });
});

//============================================================================================================

app.post('/adminhome/addnewitem',(req,res)=>{
    let adminname=req.body.name;
    let itemname=req.body.item.name;
    let description=req.body.item.description;
    let price=req.body.item.price;
    let stocks=req.body.item.stocks;
    if(itemname &&description &&price&& stocks){
    conn.query('INSERT INTO items (name, description, price,adminname,stocks) VALUES (?, ?, ?,?, ?)', [ itemname,description,price,adminname,stocks], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Internal server error.");
        }
        console.log("item sucsessfully added");
        return res.json({result});
    });}
    else{
        res.status(400).send('Please enter all requierd details');
        
    }
})


//===========================================================================================================

app.get('/adminhome/items',(req,res)=>{
    const name = req.query.name;

    conn.query('SELECT * FROM items WHERE adminname = ?', [name], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Internal server error.");
        }
        res.json(results);
    });
})

//============================================================================================================

app.post('/adminhome/updateitem', (req, res) => {
    const { item, name } = req.body; 
    conn.query('UPDATE items SET price = ?, stocks = ? WHERE adminname = ? AND name = ?', [item.price, item.stocks, name, item.name], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Internal server error.");
        }
        console.log("Item updated");
        res.send({ item: req.body.item, result }); 
    });
});

//============================================================================================================

app.listen(5000);