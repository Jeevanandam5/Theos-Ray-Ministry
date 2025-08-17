import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Subject from './pages/Subject'
import SubjectDetails from './pages/SubjectDetails'
import WatchLater from './pages/WatchLater'
import { NavBar } from './components/NavBar'
import AdminRoute from './components/admin/AdminRoute'

const App = () => {
  return (
    <>
    <NavBar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/subject' element={<Subject/>}/>
      <Route path='/subject/:id' element={<SubjectDetails/>}/>
      <Route path='/watchlater' element={<WatchLater/>}/>
      <Route path="/admin" element={<AdminRoute />} />

    </Routes>
    </>
  )
}

export default App