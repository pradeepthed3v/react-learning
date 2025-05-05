import { useState } from 'react'
import { Chatbot } from 'supersimpledev';
import './App.css'

function ChatInput({chatMessages,setChatMessages}) {
  const [inputText,setInputText]=useState('');

  function saveInputText(event){
    setInputText(event.target.value);

  }
  function sendMessage(){
    const newChatMessages= [
    ...chatMessages,
    {
        message:inputText,
        sender:'user',
        id: crypto.randomUUID()
      }
    ];
    
    setChatMessages(newChatMessages);

    const response=Chatbot.getResponse(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message:response,
        sender:'robot',
        id:crypto.randomUUID()
      }
    ]);



    setInputText('')

  }
  return (
    <>
      <input 
        placeholder="Send a message" 
        size="30"
        onChange={saveInputText}
        value={inputText}
      />
      <button onClick={sendMessage}>send</button>
    </>
  );
}

function ChatMessage({message,sender}){
  //const message= props.message;
  //const sender = props.sender;
  //const {message, sender} = props;

 /* if(sender==='robot')
  return(
    <div>
      <img src="robot.png"width="50"/>
     {message} 
     
    </div>

);*/
  return (
    <div>
      {sender === 'robot' && (
        <img src="robot.png"width="50"/>)}
     {message} 
     {sender === 'user' && (
      <img src="user.png"width="50"/>)}
    </div>

  );

}
function ChatMessages({chatMessages}){
 return(
      <>
    
      
        {chatMessages.map((chatMessage)=>{
          return(
            <ChatMessage
            message={chatMessage.message}
            sender={chatMessage.sender}
            key={chatMessage.id} 
            />
          );
        })}
      </>
      );

}

function App(){
  const [chatMessages, setChatMessgaes] = useState([{
    message : 'hello chatbot',
    sender : 'user',
    id : 'id1'
  },{
    message : 'Hello!How can I help you?',
    sender : 'robot',
    id : 'id2'
  },{
    message : 'Can you get me todays date?',
    sender : 'user',
    id : 'id3'
  },{
    message:'Today is April 22',
    sender : 'robot',
    id : 'id4'
  }]);
   //const[ChatMessgaes,setChatMessages]=array;
  //const ChatMessages= array[0];
  //const setChatMessages= array[1];



 return(
      <>
      <ChatInput 
        chatMessages={chatMessages}
        setChatMessages={setChatMessgaes}
      />

      <ChatMessages
       chatMessages={chatMessages}
      />
     
      

    </>

  );

}

export default App
