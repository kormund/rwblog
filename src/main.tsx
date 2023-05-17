import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { defaultTheme, Global } from './theme.ts'
import { store } from './store/store.ts'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={defaultTheme}>
          <Global />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </>,
)
