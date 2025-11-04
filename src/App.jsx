import React from 'react'
import { RouterProvider } from 'react-router-dom'
import routers from './component/routers/routes'

const App = () => {
  return (
<RouterProvider router={routers}></RouterProvider>
  )
}

export default App