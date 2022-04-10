import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import BookForm from './components/bookform';
import BookList from './components/booklist';
import UserForm from './components/userform';
import UserList from './components/userlist';
import Menu from './components/navbar';
import LoginForm from './components/loginform';

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Container>
        <Routes>
          <Route path='/' element={<LoginForm />} />
          <Route path='/books/new' element={<BookForm />} />
          <Route path='/books/list' element={<BookList />} />
          <Route path='/users/new' element={<UserForm />} />
          <Route path='/books/:id/edit' element={<BookForm />} />
          <Route path='/users/:id/edit' element={<UserForm />} />
          <Route path='/users/list' element={<UserList />} />
        </Routes>
      </Container>

    </BrowserRouter>
  );
}

export default App;
