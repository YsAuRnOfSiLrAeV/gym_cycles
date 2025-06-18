import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProgramList from "./components/ProgramList";
import Sidebar from "./components/Sidebar";
import Author from "./components/Author";
import Organization from "./components/Organization";
import Newcomers from "./components/Newcomers";
import Nutrition from "./components/Nutrition";
import HypertrophyProgramDetails from "./components/HypertrophyProgramDetails";
import StrengthProgramDetails from "./components/StrengthProgramDetails";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="h-16" />
      <div className="w-full flex justify-center bg-[#E5E4E2]">
        <div className="w-[100%] lg:w-[85%] flex flex-col lg:flex-row bg-[#eeeeee]">
          <Sidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<ProgramList />} />
              <Route path="/author" element={<Author />} />
              <Route path="/organization" element={<Organization />} />
              <Route path="/newcomers" element={<Newcomers />} />
              <Route path="/nutrition" element={<Nutrition />} />
              <Route path="/hypertrophy" element={<HypertrophyProgramDetails />} />
              <Route path="/strength" element={<StrengthProgramDetails />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
