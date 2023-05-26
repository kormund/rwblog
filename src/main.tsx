import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { defaultTheme, Global } from './theme.ts'
import store, { persistor } from './store/store.ts'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { Spin } from 'antd'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Spin />}>
        <BrowserRouter>
          <ThemeProvider theme={defaultTheme}>
            <Global />
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </>,
)
