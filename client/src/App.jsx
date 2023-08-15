import "./App.css";
import Login from "./app/loging/Page";
import Layout from "./app/admin/Layout";
import UserLayout from "./app/user/Layout";
import ExamLayout from "./app/exam/Layout";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div style={{ fontFamily: "DM Sans" }}>
      <Router>
        <Routes>
          <Route path="/" element={<UserLayout />} />
          <Route path="/exam" element={<ExamLayout />} />
          <Route path="/exam/info" element={<ExamLayout />} />
          <Route path="/exam/state" element={<ExamLayout />} />
          <Route path="/exam/result" element={<ExamLayout />} />
          <Route path="/signup" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/verify" element={<Login />} />
          <Route path="/login/create" element={<Login />} />
          <Route path="/login/goal" element={<Login />} />
          <Route path="/admin/dashboard" element={<Layout />} />
          <Route path="/admin/bank" element={<Layout />} />
          <Route path="/admin/analytics" element={<Layout />} />
          <Route path="/admin/institution" element={<Layout />} />
          <Route path="/admin/institution/page" element={<Layout />} />
          <Route path="/admin/manage" element={<Layout />} />
          <Route path="/admin/bank/collection" element={<Layout />} />
          <Route path="/admin/dashboard/course" element={<Layout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
