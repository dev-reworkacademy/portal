import Footer from '../../template/Footer';
import Nav from '../../template/Nav';
import Topbar from '../../template/Topbar';
import EntryViewComponent from './EntryViewComponent';
import '../assets/css/entryView.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LogOut,
  X,Briefcase
  
} from 'react-feather';
import StoreContext from '../../context/Store';

function EntryViewPage() {
  return (
    <div id="wrapper" className="page-wrapper">
    <Nav />
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <Topbar pageName="Dashboard" />
        <div className="container-fluid">

        <StoreContext>
            <EntryViewComponent />
          </StoreContext>
        </div>
      </div>

      <Footer />
    </div>
  </div>

    
  );
}



export default EntryViewPage;
