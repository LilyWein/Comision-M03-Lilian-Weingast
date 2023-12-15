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
          
      <div className="grid gap-2 mt-20">
        {post.map((post, i) => (
          <PostCard post={post} key={i} />
        ))}
      </div>
    </>
  );
};
