import "./App.css";
import Login from "./app/loging/Page";
import InstitutionLayout from "./app/admin/InstitutionLayout";
import UserLayout from "./app/user/Layout";
import ExamLayout from "./app/exam/Layout";
import AdminLayout from "./component/admin/AdminLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div style={{ fontFamily: "DM Sans" }}>
      <Router>
        <Routes>
          {
            // user and exam page
          }
          <Route path="/" element={<UserLayout />} />
          <Route path="/exam" element={<ExamLayout />} />
          <Route path="/exam/info" element={<ExamLayout />} />
          <Route path="/exam/state" element={<ExamLayout />} />
          <Route path="/exam/result" element={<ExamLayout />} />
          <Route path="/exam/solution" element={<ExamLayout />} />
          {
            //user Login page
          }
          
          <Route path="/forgotPass" element={<Login />} />
          <Route path="/signup" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/verify" element={<Login />} />
          <Route path="/login/create" element={<Login />} />
          <Route path="/login/goal" element={<Login />} />

          {
            // admin and 
          }
{
  //institute page
}
          <Route path="/institution" element={<InstitutionLayout />} />
          <Route path="/institution/batch" element={<InstitutionLayout />} />
          <Route path="/institution/page/batch" element={<InstitutionLayout />} /> 
{
  // admin page
}
          <Route path="/login" element={<Login />} />
          <Route path="/login/verify" element={<Login />} />
          <Route path="/login/create" element={<Login />} />
          <Route path="/login/goal" element={<Login />} />
          <Route path="/admin/dashboard" element={<AdminLayout />} />
          <Route path="/admin/bank" element={<AdminLayout />} />
          <Route path="/admin/analytics" element={<AdminLayout />} />
          <Route path="/admin/institution" element={<AdminLayout />} />
          <Route path="/admin/institution/page" element={<AdminLayout />} />
          <Route path="/admin/manage" element={<AdminLayout />} />
          <Route path="/admin/bank/collection" element={<AdminLayout />} />
          <Route path="/admin/dashboard/course" element={<AdminLayout />} />
          <Route path="/admin/institution/page/batch" element={<AdminLayout />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
