import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { Provider } from './components/ui/provider'
import { Box } from '@chakra-ui/react'
function App() {

  return (
    <Box minH={"100vh"} bg={"gray.100"}>
      <Provider>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/chat' element={<ChatPage />}/>
          <Route path='/register' element={<RegisterPage />}/>
          <Route path='/login' element={<LoginPage />}/>
        </Routes>
      </Provider>
    </Box>
  )
}

export default App
