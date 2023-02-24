import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Profile, Campaign, CreateCampaign } from "./pages";
import { Sidebar, Navbar } from "./components";

export default function App() {
  return (
    <div className="relative sm:-8 p-4 bg-red-300 min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280] mx-auto sm:pr-5">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}
