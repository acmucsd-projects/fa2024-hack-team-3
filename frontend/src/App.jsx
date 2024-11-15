import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import { Provider } from './components/ui/provider'
function App() {

  return (
    <Provider>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/chat' element={<ChatPage />}/>
      </Routes>
    </Provider>
  )
}

export default App
