import { Box, Badge, Stack, Skeleton, Spinner, Flex, Text } from "@chakra-ui/react";
import Markdown from "react-markdown";
import { Prose } from "../ui/prose";
import rehypeHighlight from 'rehype-highlight';

// const { Text } = Typography;

interface MessageCardProps {
  role: string;
  message: string;
  avatar?: string;
  model?: string;

  isRunning?: boolean;
}

const AppChat: React.FC<MessageCardProps> = ({
  message,
  role,
  model,
  isRunning
}: MessageCardProps) => {
  const isAssistant = () => (role === 'assistant')
  return (
    <div style={{ display: 'flex', width: '100%', justifyContent: (isAssistant()) ? "flex-start" : "flex-end" }}>
      <Box bg={(isAssistant()) ? "#f3f3f3" : "#d5e5F5"} p={"4"} textAlign={"left"} minW={(isAssistant()) ? "90%" : "70%"} justifyContent={"flex-start"} gap={"0.3em"}>
        <Badge colorPalette={isAssistant() ? "teal" : "yellow"} variant="solid" marginRight={"0.5em"}>{ role }</Badge>
        { model && <Badge colorPalette={"black"} variant={"solid"}>{ model }</Badge> }
          
        <Prose minWidth={'100%'}>
          <Markdown rehypePlugins={[rehypeHighlight]}>{message}</Markdown>
        </Prose>
        { isRunning &&
        <Flex gap={'1em'} alignItems={'center'}>
          <Text fontSize={"2xs"}>RUNNING</Text>
          <Spinner />
        </Flex> 
           
        }
      </Box>
    </div>
    
  );
};

export const SkeletonChat : React.FC<Partial<MessageCardProps>> = ({
  role,
  model
}: Partial<MessageCardProps>) => {
  return (
    <div style={{ display: 'flex', width: '100%', justifyContent: "flex-start" }}>
      <Box bg={"#f3f3f3"} p={"4"} textAlign={"left"} minW={"90%"} justifyContent={"flex-start"} gap={"0.3em"}>
        <Badge colorPalette="teal" variant="solid" marginRight={"0.5em"}>{ role }</Badge>
        <Badge colorPalette={"black"} variant={"solid"}>{ model }</Badge>
          
        <Stack flex="1" mt={"1em"}>
          <Skeleton height="5" />
          <Skeleton height="5" width="80%" />
        </Stack>
      </Box>
    </div>
    
  );
}

export default AppChat;
