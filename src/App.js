import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BlogPostList from './components/BlogPostList';
import NoPage from './components/NoPage';
import BlogPostItem from './components/BlogPostItem';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="blog-posts/">
            <Route index element={<BlogPostList />}></Route>
            <Route path="post/:page/:pagesize/:index" element={<BlogPostItem />} />
            <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
