import { useState } from 'react';
import axios from 'axios';

const PostUpdateForm = ({ post, onUpdated }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/posts/${post.id}`, {
        title,
        content,
        user_id: 2,
      });
      alert('更新しました');
      onUpdated && onUpdated(); // 更新後に再取得したいとき用
    } catch (err) {
      console.error('更新エラー:', err);
      alert('更新に失敗しました');
    }
  };

  return (
    <div>
      <h2>投稿を編集</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: '1rem' }}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ display: 'block', width: '100%', height: '100px', marginBottom: '1rem' }}
      />
      <button onClick={handleUpdate}>更新</button>
    </div>
  );
};

export default PostUpdateForm;