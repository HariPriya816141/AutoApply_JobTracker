import React, { lazy, Suspense } from "react";
import AppShell from "./components/layout/AppShell";
import { Navigate, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Applications = lazy(() => import("./pages/Applications"));
const AddApplication = lazy(() => import("./pages/AddApplication"));
const ReviewApllication = lazy(() => import("./pages/ReviewApllication"));
const Settings = lazy(() => import("./pages/Settings"));

const App = () => {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <AppShell>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/applications/add" element={<AddApplication />} />
          <Route path="/applications/:id" element={<ReviewApllication />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </AppShell>
    </Suspense>
  );
};

export default App;
