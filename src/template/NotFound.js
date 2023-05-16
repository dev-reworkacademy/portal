import Nav from "./Nav";
import Topbar from "./Topbar";
import Footer from "./Footer";

function NotFound() {
  return (
    <div id="wrapper" className="page-wrapper">
      <Nav />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Topbar />
          <div className="container-fluid">
            <h1>Page Not Found</h1>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default NotFound;
