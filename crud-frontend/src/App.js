import React from "react-dom"
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from "./components/Home";
import StudentPage from './components/StudentPage'
import StudentEditPage from './components/StudentEditPage'
import CampusEditPage from './components/CampusEditPage'

function App() {
  const [] = useState()
  // const HomePage = () => (<Home />);
  const StudentInfoPageComponent = () => (<StudentPage />)
  const StudentEditPageComponent = () => (<StudentEditPage />)
  const CampusEditPageComponent =() => (<CampusEditPage />)



  return (
    <Router>
      <div>
        <Routes>
          {/* <Route exact path="/" element={<HomePage/>} /> */}
          <Route exact path="/students/:id" element={<StudentInfoPageComponent/>} />
          <Route exact path="/students/edit/:id" element={<StudentEditPageComponent/>} />
          <Route exact path="/campus/edit/:id" element={<CampusEditPageComponent/>} />

          {/* <Route exact path="/student/:id" element={<StudentPage/>}/> */}
          {/* <Route exact path="/campus/:id" element={<CampusPage/>}/> */}
          {/* <Route exact path="/student/edit/:id" element={<EditStudentPage/>}/> */}
          {/* <Route exact path="/campus/edit/:id" element={<EditCampusPage/>}/> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
