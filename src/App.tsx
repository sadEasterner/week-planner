import './App.css'
import { Fragment, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route, Navigate } from 'react-router-dom';
import WeekTable from './components/table';
import Home from './components/pages/home';
const App = () => {


  return (
    
    <Fragment>
      <main className="" dir="rtl">
        <Routes>
          <Route path='/' element={<Navigate to='/home' />} ></Route>
          <Route path='/home' element={<Home/>} ></Route>
        </Routes>
     </main>
    </Fragment>  
    
  )
}


export default App
