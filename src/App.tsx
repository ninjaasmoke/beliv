import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

function App() {
  useEffect(() => {
    document.title = "beliv"
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
      </BrowserRouter>
    </div>
  );
}

export default App;
