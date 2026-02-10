import { Routes, Route } from "react-router-dom";
//import LandingPage from the Pages folder
import LandingPage from "./Pages/LandingPage";
//import HomePage from the Pages folder
import HomePage from "./Pages/HomePage";
//import NoteDetailPage from the Pages folder
import NoteDetailPage from "./Pages/NoteDetailPage";
//import CreatePage from the Pages folder
import CreatePage from "./Pages/CreatePage";
//import Login and Register from the Pages folder
import Login from "./Pages/LoginPage";
//import Register from the Pages folder
import Register from "./Pages/Register";
//import PrivateRoute from the components folder
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Routes>
      {/*public routes*/}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/*private routes*/}
      <Route path="/home" element={
        <PrivateRoute><HomePage /></PrivateRoute>
      } />
      {/*create route*/}
      <Route path="/create" element={
        <PrivateRoute><CreatePage /></PrivateRoute>
      } />
      {/*note detail route*/}
      <Route path="/notes/:id" element={
        <PrivateRoute><NoteDetailPage /></PrivateRoute>
      } />
    </Routes>
  );
};

export default App;
