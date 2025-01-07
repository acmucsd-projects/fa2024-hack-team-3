import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import AccountSettings from './pages/AccountSettings'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import { Provider } from './components/ui/provider'
import { Box } from '@chakra-ui/react'
import { ColorModeProvider } from "./components/ui/color-mode" //dark mode
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import {ChatProvider} from  "../Context/ChatProvider"


import system  from './theme'
function App() {

  const isLoggedIn = () => {
    // Check if user is logged in by checking for a token
    const token = localStorage.getItem("authToken");
    return !!token; // Returns true if token exists
  };

  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn()) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };


  return (
    
    <ChakraProvider value={system}>
      <ColorModeProvider>
    <Box minH={"100vh"} >

        <Routes>
          <Route path='/' 
            element={
              // REMOVE THIS WHEN REST OF WEBSITE IS READY
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path='/chat' element={<ChatPage />}/>
          <Route path='/register' element={<RegisterPage />}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/settings' element={<AccountSettings />}/>
          <Route path='/profile' element={<ProfilePage />}/>
        </Routes>

    </Box> 
    </ColorModeProvider>
    </ChakraProvider>
  )
}

export default App
