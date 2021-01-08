const express=require("express");
const cors=require("cors");
const mysql=require("mysql");
//创建服务器
const server=express();

//为所有HTTP请求使用CORS
server.use(cors({
  origin:['http://localhost:8080','http://127.0.0.1:8080']
}))

//创建连接池
const pool = mysql.createPool({
  host:'127.0.0.1',
  port:'3306',
  user:'root',
  password:'',
  database:'xzqa',
  connectionLimit:15
})

server.get("/category",(req,res)=>{
  let sql="SELECT id,category_name FROM xzqa_category ORDER BY id";
  pool.query(sql,(error,results)=>{
    if(error) throw error;
    res.send({
      cood:200,
      message:"查询成功",
      results:results
    })
  })
})

server.get("/articles",(req,res)=>{
  let id = req.query.id;
  let sql = "SELECT id,subject,image,description FROM xzqa_article WHERE category_id=?";
  pool.query(sql,[id],(error,results)=>{
    if(error) throw error;
    res.send({code:200,message:"查询成功",results:results})
  })
})
server.listen(3000);