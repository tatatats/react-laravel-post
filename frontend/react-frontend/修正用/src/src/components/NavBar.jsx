import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/">一覧</Link> | <Link to="/create">投稿する</Link>
    </nav>
  );
};

export default NavBar;