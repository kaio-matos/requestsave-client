import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClientProvider } from 'react-query'
import App from './App'
import './index.css'
import { queryClient } from './services/QueryClient'
import { LoginProvider } from './contexts/LoginContext'
import { BrowserRouter as Router } from 'react-router-dom'
import { MessageProvider } from './contexts/MessageContext'

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <LoginProvider>
          <MessageProvider>
            <App />
          </MessageProvider>
        </LoginProvider>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
