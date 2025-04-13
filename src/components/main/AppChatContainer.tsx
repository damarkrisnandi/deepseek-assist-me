import React, { useEffect, useState } from "react";
import AppChatInputMsg from "./AppChatInputMsg";
import AppChat, { SkeletonChat } from "./AppChat";
import { EmptyState, Flex, Stack, VStack } from "@chakra-ui/react";
import { chatAssistant } from "../../services/index";

import ndjsonStream from "can-ndjson-stream";
import { LuMessageCircle } from "react-icons/lu";

// interface AppChatContainerProps {
//   messages: { role: string; content: string }[];
// }

const AppChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [tempMessage, setTempMessage] = useState<any>([]);
  const [tempModel, setTempModel] = useState<any>(null);
  const [aiStatus, setAiStatus] = useState<{
    loading: boolean;
    running: boolean;
    done: boolean;
  }>({ loading: false, running: false, done: false });
  // const { messages, addDefaultMessages, addMessages} = useMessageStore((state: any) => state)
  const scrollToBottom = () => {
    const el = document.getElementById("messages");
    if (el) {
      el.scrollTo(0, el.scrollHeight);
    }
  };

  const handleChat = (data: any) => {
    setTempMessage([]);
    setMessages([...messages, { role: "user", content: data.message }]);
    setAiStatus({ ...aiStatus, loading: true });
    setTimeout(() => {
      chatAssistant(
        [...messages, { role: "user", content: data.message }],
        tempModel
      ).then(async (response) => {
        await handleNextMessage(data, response);
      });
    }, 400);
  };

  // Core Helper Functions
  const handleNextMessage = async (data: any, response: any) => {
    setAiStatus({ ...aiStatus, loading: false, running: true });
    const reader = ndjsonStream(response.body).getReader();
    let newline: any;
    let line = [];
    let tempMsg: any = null;
    do {
      newline = await reader.read();
      if (newline.value) {
        line.push(newline.value.message.content);
        setTempMessage([...tempMessage, ...line]);
        setTempModel(newline.value.model);
        scrollToBottom();
        tempMsg = {
          content: line.join(""),
          role: newline.value?.message.role,
          model: newline.value.model,
        };
        setMessages([...messages, { content: data.message, role: "user" }]);
      }

      if (newline.done) {
        setAiStatus({ loading: false, running: false, done: true });
        setMessages([
          ...messages,
          { content: data.message, role: "user" },
          tempMsg,
        ]);
        setTempMessage([]);
      }
    } while (!newline.done);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Flex
      gap="2"
      height={"90vh"}
      direction={"column"}
      justifyContent={"flex-end"}
    >
      <Flex gap="2" direction={"column"} overflowY={"auto"} id="messages">
        {messages.length === 0 && <EmptyMessages />}
        {messages.map((message: any, index: number) => (
          <AppChat
            message={message.content}
            role={message.role}
            model={message.model}
            key={index}
          />
        ))}
        {aiStatus.loading && (
          <SkeletonChat model={tempModel} role={"assistant"} />
        )}
        {tempMessage.length > 0 && (
          <AppChat
            message={tempMessage.join("")}
            model={tempModel}
            role={"assistant"}
            isRunning={aiStatus.running}
          />
        )}
      </Flex>
      <AppChatInputMsg onChat={handleChat} onChangeModel={setTempModel} />
    </Flex>
  );
};

const EmptyMessages = () => {
  return (
    <Stack h={"50vh"}>
      <EmptyState.Root size={"md"}>
        <EmptyState.Content>
          <EmptyState.Indicator>
            <LuMessageCircle />
          </EmptyState.Indicator>
          <VStack textAlign="center">
            <EmptyState.Title>Deepseek Assist me!</EmptyState.Title>
            <EmptyState.Description>
              Ask Something about programming terms and topics
            </EmptyState.Description>
          </VStack>
        </EmptyState.Content>
      </EmptyState.Root>
    </Stack>
  );
};

export default AppChatContainer;
