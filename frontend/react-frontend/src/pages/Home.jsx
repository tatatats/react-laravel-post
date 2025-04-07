import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/posts')
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.error('API取得エラー:', err);
      });
  }, []);

  return (
    <div className="home-container">
        <div className="main-content">
            <h1>投稿一覧</h1>
            <ul className="post-list">
            {posts.map((post) => (
                <li key={post.id} className="post-item">
                <Link to={`/posts/${post.id}`} className="post-link">
                    <strong>{post.title}</strong>
                </Link> - {post.content}
                </li>
            ))}
            </ul>
        </div>
    </div>
  );
};

export default Home;