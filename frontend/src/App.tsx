import "./App.css";
import {
  BrowserRouter,
  Routes,
} from "../node_modules/react-router-dom/dist/index";
import SignUp from "./pages/Signup";
import { Route } from "../node_modules/react-router-dom/dist/index";
import Signin from "./pages/Signin";
import Blog from "./pages/Blog";
import Home from "./pages/Home";
import Publish from "./pages/Publish";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path="/home"></Route>
          <Route element={<SignUp />} path="/signup"></Route>
          <Route element={<Signin />} path="/signin"></Route>
          <Route element={<Blog />} path="/blog/:id"></Route>
          <Route element={<Publish />} path="/publish"></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
