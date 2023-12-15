import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { usePosts } from "../context/PostContext";
import { PostCard } from "../components/PostCard";

export const PostPage = () => {
  
  const { getPostById, post } = usePosts();

  
  useEffect(() => {
    getPostById();
  }, []);

  if (post.length === 0)
    return (
      <>
        <Navbar />
        <div className="mt-20">
          <h1>No realizó poseos aún</h1>
        </div>
        
      </>
    );

  return (
    <>
      <Navbar />
          
      <div className="mt-20">
        {post.map((post, i) => (
          <PostCard post={post} key={i} />
        ))}
      </div>
    </>
  );
};
