import Login from "./Component/Login/Login";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Signup from "./Component/Signup/Signup";
import Home from "./Component/Home/home"
import "./style.css";

function App() {
  return (
    <>
      {/* <Login /> */}
      {/* <Signup /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
