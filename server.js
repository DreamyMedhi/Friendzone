const express=require('express');
const app=express();
const http =require('http').createServer(app);

const PORT=process.env.PORT||3000

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.use(express.static("public"));



//Server code
http.listen(PORT,function(req,res){
    console.log("Server started");
});


//socket
const io=require('socket.io')(http);//this one is used to make a connection btwn the terminal and the  client and server

io.on('connection',(socket)=>{
  console.log("Connected");
  socket.on('message',(msg)=>{
      // console.log(msg);
      //NO we need to send this message to all the users who are connected to us:
          socket.broadcast.emit('message',msg)
  })
});
