import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<div>投稿作成ページ（仮）</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
