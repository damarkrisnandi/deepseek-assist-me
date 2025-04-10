import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import AppChat from './components/main/AppChat'
import AppChatInputMsg from './components/main/AppChatInputMsg'
import { Flex } from '@chakra-ui/react/flex'
import AppChatContainer from './components/main/AppChatContainer'
import useMessageStore from './store/useMessageStore'

function App() {
  // const [count, setCount] = useState(0)
  const messages = useMessageStore((state: any) => state.messages)
  return (
    <>
    <Flex direction="column" gap="2">
      <AppChatContainer messages={messages} />
    </Flex>
      
    </>
  )
}

export default App
