import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import BookForm from './components/bookform';
import BookList from './components/booklist';
import Menu from './components/navbar';

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Container>
        <Routes>
          <Route path='/' element={<BookList />} />
          <Route path='/book/new' element={<BookForm />} />
        </Routes>
      </Container>

    </BrowserRouter>
  );
}

export default App;
