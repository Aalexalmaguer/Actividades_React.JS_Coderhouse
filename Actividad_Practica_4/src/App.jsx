import React, { useState, useEffect } from 'react';
import './App.css'
import ItemDetailContainer from './ItemDetailContainer.jsx'
import ItemDetail from './ItemDetail.jsx'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Detalles del Producto</h1>
      </header>
      <main>
        {/* Aquí renderizamos el componente ItemDetailContainer */}
        <ItemDetailContainer />
      </main>
    </div>
  );
}
export default App;
