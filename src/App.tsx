import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout.tsx'
import BlogPage from './pages/BlogPage.tsx'
import SinglePage from './pages/SinglePage.tsx'
import SignUpPage from './pages/SignUpPage.tsx'
import SignInPage from './pages/SignInPage.tsx'
import EditProfilePage from './pages/EditProfilePage.tsx'
import PrivateRoute from './components/privateRoute.tsx'
import EditArticlePage from './pages/EditArticlePage.tsx'
import CreateArticlePage from './pages/CreateArticlePage.tsx'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<BlogPage />} />
          <Route path='/articles' element={<BlogPage />} />
          <Route path='/articles/:id' element={<SinglePage />} />
          <Route path='/sign-up' element={<SignUpPage />} />
          <Route path='/sign-in' element={<SignInPage />} />
          <Route
            path='/profile'
            element={
              <PrivateRoute>
                <EditProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path='/articles/:id/edit'
            element={
              <PrivateRoute>
                <EditArticlePage />
              </PrivateRoute>
            }
          />
          <Route
            path='/new-article'
            element={
              <PrivateRoute>
                <CreateArticlePage />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </>
  )
}

export default App
