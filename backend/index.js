import express from "express"
import mysql from "mysql"
import cors from "cors"
const app = express()
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123456",
    database:"book"
})
//遇到身份驗證問題
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';

//默認無法給服務器寫入訊息，除非引入中間件
app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.json("hello this is backend")
})

app.get("/books",(req,res)=>{
    const q = "SELECT * FROM books"
    db.query(q,(err,data)=>{
        if(err)return res.json(err)
        return res.json(data)
    })
})

app.post("/newbook",(req,res)=>{
    const q = "INSERT INTO books (`name`,`price`) VALUES(?) "
    const TestVals = [
        req.body.name,
        req.body.price
    ]
    db.query(q,[TestVals],(err,data)=>{
        if(err)return res.json(err)
        return res.json(data)
    })
})

app.delete("/books/:id",(req,res)=>{
    const bookId = req.params.id
    const q = "DELETE FROM books WHERE id = ?"
    db.query(q,[bookId],(err,data)=>{
        if(err)return res.json(err)
        return res.json(data)
    })
})

app.put("/books/:id",(req,res)=>{
    const bookId = req.params.id
    const q = "UPDATE books SET `name`=?, `price`=? WHERE `id` = ? "
    const TestVals = [
        req.body.name,
        req.body.price
    ]
    db.query(q,[...TestVals,bookId],(err,data)=>{
        if(err)return res.json(err)
        return res.json(data)
    })
})

app.listen(8800,()=>{
    console.log("Connect success")
})