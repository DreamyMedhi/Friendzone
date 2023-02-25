const socket =io();//through this we called io function that was in server.js
//
  let name;

do{
  name=prompt("Please enter your name to start your conversation.");
}while (!name)


  let messageArea=document.querySelector('.message_area');
  let textarea=document.querySelector('#textarea')
//this means unless u enter the name the prompt will keep apperaring

//
// // //to send message:
textarea.addEventListener('keyup',(e)=>{
  //keyup means a function which means if we press any key it will send the message
   if(e.key==='Enter'){
     sendMessage(e.target.value) //THIS Will passs everything that is inside the text area
   };
 });

 function sendMessage(message){
 var msg={
      user:name,
      message:message.trim(),
   }
   //to append the message:
   appendMessage(msg,'incoming');
   textarea.value="";
   //send to sever:
   socket.emit('message',msg)//message is just a variable and can be named anything
 }
   function appendMessage(msg, type){
      let mainDiv=document.createElement('div')//we are creating a div here
      let className=type
      mainDiv.classList.add(className,'message')

      let markup= `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
      `

      mainDiv.innerHTML=markup
      //now we need to append this whole message including name in the messageArea:
      messageArea.appendChild(mainDiv)
 }


 //Receive message:
 socket.on('message',(msg)=>{
    appendMessage(msg,'outgoing')
 });
