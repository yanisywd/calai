// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import App from "./App";
// import Dashboard from "./Dashboard";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<App />} />
//       <Route path="/dashboard" element={<Dashboard />} />
//     </Routes>
//   </BrowserRouter>
// );


import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Dashboard from "./Dashboard";
import FirstPage from "./FirstPage"; // Updated import to match new component name

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<FirstPage />} />
      <Route path="/app" element={<App />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Add route for static index.html */}
      <Route
        path="/landing"
        element={
          <iframe
            src="/moh_new/landing_page_et_calcul_calorie_sans_inscription_visiteur__/index.html"
            style={{
              width: "100%",
              height: "100vh",
              border: "none",
            }}
            title="Landing Page"
          />
        }
      />
    </Routes>
  </BrowserRouter>
);




