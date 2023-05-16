import React, {  useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./mary/Dashboard/Dashboard";
import AttendancePage from "./samuel/attendance/AttendancePage";
import NotificationPage from "./samuel/notification/NotificationPage";
import CertificatePage from "./samuel/certificate/CertificatePage";
import PasswordOutlet from "./samuel/settings/PasswordOutlet";
import ProfileOutlet from "./samuel/settings/ProfileOutlet";
import CoursesGridPage from "./ahmed/courses-grid/CoursesGridPage";
import ProjectGridPage from "./ahmed/project-grid/ProjectGridPage";
import PaymentPage from "./ahmed/payment/PaymentPage";
import LoginPage from "./mary/Login/Login_Page";
import EntryViewPage from "./mary/EntryView/EntryViewpage";
import Register from "./mary/Register/Register";
import CourseDetailsPage from "./ahmed/course-details/CoursesDetailsPage";
import ProjectDetailsPage from "./ahmed/project-details/ProjectDetailsPage";
import Sample from "./Sample";
import NotFound from "./template/NotFound";
import AssignmentDetailsPage from "./ahmed/assignment/AssignmentDetailsPage";
import AssignmentGridPage from "./ahmed/assignment-grid/AssignmentGridPage";
import ReceiptPage from "./ahmed/payment/ReceiptPage";
import ManagePhases from "./components/Phase";
import StoreContext from "./context/Store";
import ChartComponent from "./mary/AdminDashboard/ChartComponent";
import CardComponent from "./mary/AdminDashboard/CardComponent";
import LargeCardComponent from "./mary/AdminDashboard/LargeCardComponent";
import AssessmentVideoPage from "./ahmed/assessment-videos/AssessmentVideoPage";
import ClassworkPage from "./ahmed/classwork/ClassworkPage";
// ====
import LiveClasses from "./ubasi/liveClasses/AllClasses";
import ClassDetails from "./ubasi/liveClasses/ClassDetails";
import ClassesLayout from "./ubasi/liveClasses";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

function App() {
  const [userData, setUserData] = useState({});

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <StoreContext>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/largecards" element={<LargeCardComponent />} />
            <Route path="/smallcards" element={<CardComponent />} />
            <Route path="/chart" element={<ChartComponent />} />
            <Route path="/live-classes" element={<ClassesLayout />}>
              <Route index element={<LiveClasses />} />
              <Route path=":classId" element={<ClassDetails />} />
            </Route>

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/notification" element={<NotificationPage />} />
            <Route path="/certificate" element={<CertificatePage />} />
            <Route path="/profile" element={<ProfileOutlet />} />
            <Route path="/password" element={<PasswordOutlet />} />

            <Route path="/modules" element={<CoursesGridPage />} />
            <Route path="/projects" element={<ProjectGridPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/receipt-:id" element={<ReceiptPage />} />
            <Route
              path="/project-details-:id"
              element={<ProjectDetailsPage />}
            />
            <Route path="/assignments" element={<AssignmentGridPage />} />
            <Route
              path="/assignment-details-:id"
              element={<AssignmentDetailsPage />}
            />
            <Route path="/entryview" element={<EntryViewPage />} />
            <Route
              path="/module-details-:alias"
              element={<CourseDetailsPage />}
            />
            <Route path="/assessments" element={<AssessmentVideoPage />} />
            <Route path="/classwork" element={<ClassworkPage />} />
            <Route path="/phases" element={<ManagePhases />} />
            <Route path="/sample" element={<Sample />} />
            <Route path="*" element={<NotFound />} />
            {/* i want to ake here */}
          </Routes>
        </StoreContext>
      </QueryClientProvider>
    </>
  );
}

export default App;
