import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Bills from './pages/Bills';
import Items from './pages/Items';
import DefaultLayout from './components/DefaultLayout';

const App = () => {
  return (
    <Router>
      <DefaultLayout>
        <Routes> {/* Ganti Switch dengan Routes */}
          <Route exact path="/" element={<Home />} /> {/* Perhatikan penggunaan element prop */}
          <Route path="/pages/bills" element={<Bills />} />
          <Route path="/pages/items" element={<Items />} />
        </Routes>
      </DefaultLayout>
    </Router>
  );
};

export default App;
