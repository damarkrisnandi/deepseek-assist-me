import { Card, Avatar, Wrap, Box, Text, Badge } from "@chakra-ui/react";
import Markdown from "react-markdown";
import { Prose } from "../ui/prose";
import rehypeHighlight from 'rehype-highlight';

// const { Text } = Typography;

interface MessageCardProps {
  role: string;
  message: string;
  avatar?: string;
  model?: string
}

const AppChat: React.FC<MessageCardProps> = ({
  message,
  role,
  avatar,
  model
}: MessageCardProps) => {
  return (
    <div style={{ display: 'flex', width: '100%', justifyContent: (role === 'assistant') ? "flex-start" : "flex-end" }}>
      <Box bg={(role === 'assistant') ? "#f3f3f3" : "#5EFFB7"} p={"4"} textAlign={"left"} minW={(role === 'assistant') ? "90%" : "50%"} justifyContent={"flex-start"} gap={"0.3em"}>
        { role === 'assistant' && <Badge colorPalette="teal" variant="solid" marginRight={"0.5em"}>{ role }</Badge> }
        { model && <Badge colorPalette={"black"} variant={"solid"}>{ model }</Badge> }
          
        <Prose minWidth={'100%'}>
          <Markdown rehypePlugins={[rehypeHighlight]}>{message}</Markdown>
        </Prose>
      </Box>
      {/* <Card.Root variant={"subtle"} minW={(role === 'assistant') ? "80%" : "50%"} backgroundColor={(role === 'assistant') ? "" : "aquamarine"}>
        <Card.Body gap="2">
          {avatar && (
            <Avatar.Root size="sm" shape="rounded">
              <Avatar.Image src={avatar || "https://picsum.photos/200/300"} />
              <Avatar.Fallback name="Nue Camp" />
            </Avatar.Root>
          )}
          { role === 'assistant' && <Card.Title mb="0">{role}</Card.Title> }
          { model && <Card.Description>
            { model }
          </Card.Description> }

          <Prose minWidth={'100%'}>
            <Markdown>{message}</Markdown>
          </Prose>

        </Card.Body>
      </Card.Root> */}
    </div>
    
  );
};

export default AppChat;
