import React from "react-dom"
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from "./components/Home";

function App() {
  const [] = useState()
  const HomePage = () => (<Home />);



  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<HomePage/>} />
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
