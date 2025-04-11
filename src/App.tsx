
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Flex } from '@chakra-ui/react/flex'
import AppChatContainer from './components/main/AppChatContainer'


function App() {
  return (
    <>
    <Flex direction="column" gap="2">
      <AppChatContainer />
    </Flex>
      
    </>
  )
}

export default App
