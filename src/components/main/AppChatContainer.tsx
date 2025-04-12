
import React, { useEffect, useState } from 'react';
import AppChatInputMsg from './AppChatInputMsg';
import AppChat, { SkeletonChat } from './AppChat';
import { Flex } from '@chakra-ui/react';
import { getResponse } from "../../services/index"

import ndjsonStream from 'can-ndjson-stream';

// interface AppChatContainerProps {
//   messages: { role: string; content: string }[];
// }

const AppChatContainer: React.FC = () => {

  const [messages, setMessages] = useState<any[]>([]);
  const [tempMessage, setTempMessage] = useState<any>([]);
  const [tempModel, setTempModel] = useState<any>(null);
  const [aiStatus, setAiStatus] = useState<{ loading: boolean, running: boolean, done: boolean }>({ loading: false, running: false, done: false })
  // const { messages, addDefaultMessages, addMessages} = useMessageStore((state: any) => state)
  const scrollToBottom = () => {
    const el = document.getElementById('messages');
    if (el) {
      el.scrollTo(0, 10000);
    }
  };

  const handleChat = (data: any) => {
    setTempMessage([]);
    setMessages([...messages,  { role: 'user', content: data.message }])
    setAiStatus({...aiStatus, loading: true});
    setTimeout(() => {

      getResponse([...messages, { role: 'user', content: data.message }], tempModel)
      .then(async (response) => {
        setAiStatus({...aiStatus, loading: false, running: true});
        const reader = ndjsonStream(response.body).getReader();
        let newline: any;
        let line = []
        let tempMsg: any = null;
        do {
          newline = await reader.read();
          if (newline.value) {
            line.push(newline.value.message.content)
            setTempMessage([...tempMessage, ...line]);
            setTempModel(newline.value.model)
            scrollToBottom();
            tempMsg = {content: line.join(''), role: newline.value?.message.role, model: newline.value.model };
            setMessages([...messages, { content: data.message, role: "user" }])
          } 
          
          
          if (newline.done) {
            setAiStatus({ loading: false, running: false, done: true });
            setMessages([...messages, { content: data.message, role: "user" }, tempMsg])
            setTempMessage([])
          }
        } while (!newline.done) 


      })

    }, 400)
    

  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Flex gap="2" height={"90vh"} direction={'column'} justifyContent={'flex-end'}>
        <Flex gap="2" direction={'column'} overflowY={'auto'} id="messages">
        {
          messages.map((message: any, index: number) => (
            <AppChat message={message.content} role={message.role} model={message.model} key={index}/>
          ))
        }
        { aiStatus.loading && <SkeletonChat model={tempModel} role={'assistant'} /> }
        { tempMessage.length > 0 && <AppChat message={tempMessage.join('')} model={tempModel} role={'assistant'} isRunning={aiStatus.running} /> }
        
        </Flex>
        <AppChatInputMsg onChat={handleChat} onChangeModel={setTempModel} />
    </Flex>
      
      
      
   
  );
};

export default AppChatContainer;
