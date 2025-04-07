import './Home.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import PostUpdateForm from '../components/PostUpdateForm';
import PostDeleteButton from '../components/PostDeleteButton';

const ShowPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  const fetchPost = useCallback(() => {
    axios.get(`http://127.0.0.1:8000/api/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error('詳細取得エラー:', err));
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  if (!post) return <p>読み込み中...</p>;

  return (
    <div className="home-container">
      <div className="main-content">
        <h1>投稿詳細</h1>
        <p><strong>タイトル：</strong> {post.title}</p>
        <p><strong>本文：</strong> {post.content}</p>

        <hr />

        <PostUpdateForm post={post} onUpdated={fetchPost} />
        <PostDeleteButton postId={post.id} />
      </div>
    </div>
  );
};

export default ShowPost;