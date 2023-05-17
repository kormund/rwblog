import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import BlogPage from './pages/BlogPage.tsx'
import SinglePage from './pages/SinglePage.tsx'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<BlogPage />} />
          <Route path='/articles' element={<BlogPage />} />
          <Route path={'/articles/:id'} element={<SinglePage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
