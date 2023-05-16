import Footer from "../../template/Footer";
import Nav from "../../template/Nav";
import Topbar from "../../template/Topbar";
import DashboardComponent from "./DashboardComponent";
import '../assets/css/dashboard.css'

function Dashboard() {
  return (
    <div id="wrapper" className="page-wrapper">
      <Nav />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Topbar pageName="Dashboard" />
          <div className="container-fluid">

            <DashboardComponent/>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;
