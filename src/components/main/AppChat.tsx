import { Card, Avatar, Button } from "@chakra-ui/react";


// const { Text } = Typography;

interface MessageCardProps {
    role: string;
    message: string;
    avatar?: string;
}

const AppChat: React.FC<MessageCardProps> = ({ message, role, avatar }: MessageCardProps) => {
  return (
    <Card.Root width="lg" minWidth="90vw" variant={'subtle'} >
            <Card.Body gap="2">
              { avatar && (<Avatar.Root size="sm" shape="rounded">
                <Avatar.Image src={ avatar || "https://picsum.photos/200/300"} />
                <Avatar.Fallback name="Nue Camp" />
              </Avatar.Root>)}
              <Card.Title mb="0">{ role }</Card.Title>
              <Card.Description>
                { message }
              </Card.Description>
            </Card.Body>
          </Card.Root>
  );
};

export default AppChat;