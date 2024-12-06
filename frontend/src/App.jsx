import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { Provider } from './components/ui/provider'
import { Box } from '@chakra-ui/react'
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
    <Box minH={"100vh"} bg={"gray.100"}>
      <Provider>
        <Routes>
          <Route path='/' 
            element={
              // REMOVE THIS WHEN REST OF WEBSITE IS READY
              // <ProtectedRoute>
                <HomePage />
              // </ProtectedRoute>
            }
          />
          <Route path='/chat' element={<ChatPage />}/>
          <Route path='/register' element={<RegisterPage />}/>
          <Route path='/login' element={<LoginPage />}/>
        </Routes>
      </Provider>
    </Box>
  )
}

export default App
