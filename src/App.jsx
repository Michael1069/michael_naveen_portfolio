import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio from "./Portfolio.jsx";
import AgentChat from "./pages/AgentChat.jsx";
import InteractiveBackground from "./components/InteractiveBackground.jsx";
import { ReactLenis } from 'lenis/react';

function App() {
  return (
    <BrowserRouter basename="/Portfolio">
      <Routes>
        <Route path="/" element={
          <ReactLenis root>
            <div className="relative min-h-screen">
              <InteractiveBackground />
              <Portfolio />
            </div>
          </ReactLenis>
        } />
        <Route path="/agent" element={<AgentChat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
