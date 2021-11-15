import React from 'react';
import Repos from './components/Repos'
import Details from './components/Details'
import NotFound from './components/NotFound'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Repos />}>
        <Route path=":repoId" element={<Details />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
