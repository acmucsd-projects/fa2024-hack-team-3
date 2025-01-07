import { StrictMode } from 'react'
import ReactDOM from "react-dom";
import { Provider } from "./components/ui/provider"
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './styles/styles.css'
// import { GoogleOAuthProvider } from '@react-oauth/google';
import {ChatProvider} from  "../Context/ChatProvider.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    
      <Provider>
        <ChatProvider>
        {/* <GoogleOAuthProvider clientId="907516461833-671rhjggt01ab5hq8vo7ah18qlv5f8vc.apps.googleusercontent.com"> */}
          <App />
        {/* </ GoogleOAuthProvider> */}
         </ChatProvider>
      </Provider>
   
      
    </BrowserRouter>
  </StrictMode>,
)
