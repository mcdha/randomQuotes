import React from 'react'
import {Routes, Route} from 'react-router-dom'
// import Navbar from './components/Navbar'
import Home from './components/Home/Home'
import TodoAll from './components/Todo/TodoAll'
import Layout from './components/Layout'
import Trigger from './components/Quotes/Trigger'
// import Trigger from './components/Trigger'






const App = () => {

  
  return (
    
<Routes>
      
  <Route element={<Layout />}>
    <Route path='/' element={<Home />} />
    <Route path='/home' element={<Home />} />
    <Route path='/todo' element={<TodoAll />} />
    <Route path='/quotes' element={<Trigger />} />
  </Route>

</Routes>
  )
}

export default App