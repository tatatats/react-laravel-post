import './Home.css';
import PostForm from '../components/PostForm';

const CreatePost = () => {
  return (
    <div className="home-container">
      <div className="main-content">
        <h1>新規投稿</h1>
        <PostForm />
      </div>
    </div>
  );
};

export default CreatePost;