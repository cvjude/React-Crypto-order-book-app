import React from 'react';
import Header from './components/Header';
import DisplayOrders from './components/DisplayOrders';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <DisplayOrders />
      </main>
    </div>
  );
}

export default App;
