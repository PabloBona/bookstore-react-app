import { Routes, Route } from 'react-router-dom';

import BookList from './components/BookList';
import Categories from './components/Categories';

import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={(
            <BookList />
)}
        />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </>
  );
}

export default App;
