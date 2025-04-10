
import React, { useRef, useEffect } from 'react';
import AppChatInputMsg from './AppChatInputMsg';
import AppChat from './AppChat';
import { Flex } from '@chakra-ui/react';

interface AppChatContainerProps {
  messages: { role: string; content: string }[];
}

const AppChatContainer: React.FC<AppChatContainerProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Flex gap="2" height={"100vh"} direction={'column'} justify={'content-between'}>
        <Flex gap="2" direction={'column'}>
        <AppChat message={'Ask something to me?'} role={'Deepseek..'} avatar={'https://console.groq.com/deepseek_logo.png'}/>
        {
        messages.map((message: any, index: number) => (
          <AppChat message={message.content} role={message.role}/>
        ))
        }
        </Flex>
        <AppChatInputMsg />
    </Flex>
      
      
      
   
  );
};

export default AppChatContainer;
