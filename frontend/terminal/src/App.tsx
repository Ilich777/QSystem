import React from 'react';
import './App.css';
import Wrapper from './components/Wrapper';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Wrapper>
        <Header />
        <Home />
        <Footer />
      </Wrapper>
    </div>
  );
}

export default App;
