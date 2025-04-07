import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav style={{
      padding: '0.5rem 1rem',
      background: 'white',
      textAlign: 'center'
    }}>
      <Link to="/">一覧</Link> | <Link to="/create">投稿する</Link>
    </nav>
  );
};

export default NavBar;
