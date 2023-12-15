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
        <h1>No Tiene Posteos</h1>
      </>
    );

  return (
    <>
      <Navbar />
          
      <div className="grid grid-cols-1 gap-2">
        {post.map((post, i) => (
          <PostCard post={post} key={i} />
        ))}
      </div>
    </>
  );
};
