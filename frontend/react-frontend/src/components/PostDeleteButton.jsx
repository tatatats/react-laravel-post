import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostDeleteButton = ({ postId }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm('本当に削除しますか？')) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/posts/${postId}`);
      alert('削除しました');
      navigate('/');
    } catch (err) {
      console.error('削除エラー:', err);
      alert('削除に失敗しました');
    }
  };

  return (
    <button onClick={handleDelete} style={{ color: 'red', marginTop: '1rem' }}>
      削除
    </button>
  );
};

export default PostDeleteButton;