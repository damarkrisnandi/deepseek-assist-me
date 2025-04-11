import { Card, Avatar } from "@chakra-ui/react";
import Markdown from "react-markdown";

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
    <Card.Root variant={"subtle"} minW="80vh">
      <Card.Body gap="2">
        {avatar && (
          <Avatar.Root size="sm" shape="rounded">
            <Avatar.Image src={avatar || "https://picsum.photos/200/300"} />
            <Avatar.Fallback name="Nue Camp" />
          </Avatar.Root>
        )}
        <Card.Title mb="0">{role}</Card.Title>
        { model && <Card.Description>
          { model }
        </Card.Description> }
        {/* <Card.Description> */}
        <Markdown>{message}</Markdown>
        {/* </Card.Description> */}
      </Card.Body>
    </Card.Root>
  );
};

export default AppChat;
