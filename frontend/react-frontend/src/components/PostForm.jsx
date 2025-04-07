import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://127.0.0.1:8000/api/posts', {
        title,
        content,
        user_id: 2,
      });

      alert('投稿が作成されました！');
      setTitle('');
      setContent('');
      setErrors({});
      navigate('/');
    } catch (error) {
        console.error(error);
        if (error.response?.status === 422) {
            console.log('バリデーションエラー詳細:', error.response.data.errors);
            setErrors(error.response.data.errors);
        } else {
            alert('エラーが発生しました');
        }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>タイトル</label><br />
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        {errors.title && <p style={{ color: 'red' }}>{errors.title[0]}</p>}
      </div>

      <div>
        <label>内容</label><br />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        {errors.content && <p style={{ color: 'red' }}>{errors.content[0]}</p>}
      </div>

      <button type="submit">投稿する</button>
    </form>
  );
};

export default PostForm;