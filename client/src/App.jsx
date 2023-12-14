import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { HomePage } from "./pages/HomePage";
import { PostPage } from "./pages/PostPage";
import { PostFormPage } from "./pages/PostFormPage";
import { Profile } from "./pages/Profile";
import { ProtectedRoutes } from "./routes/ProtectedRoutes";
import { PostProvider } from "./context/PostContext";
import { PostComment } from "./pages/CommentPage";

export const App = () => {
  return (
    <AuthProvider>
      <PostProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoutes />}>
              <Route path="/post" element={<PostPage />} />
              <Route path="/add-post" element={<PostFormPage />} />
              <Route path="/post/:id" element={<PostFormPage />} />
              <Route path="/CommentPage" element={<PostComment />} />
              <Route path="/profile" element={<Profile />} />
              {/*<Route path="/EditPostPage/:id" element={<EditPostPage/>} />*/}
            </Route>
          </Routes>
        </Router>
      </PostProvider>
    </AuthProvider>
  );
};
