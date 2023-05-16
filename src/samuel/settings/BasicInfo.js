import { Link } from "react-router-dom"
import {Edit2, Plus, Facebook, Twitter,Instagram,Linkedin} from "react-feather"
import LocationModal from "../modals/LocationModal"
import LanguageModal from "../modals/LanguageModal"
import EducationModal from "../modals/EducationModal"


function BasicInfo({ link1,link2,link3,link4,full_name, location, language, certificate, profile }){

    return(
        <>
            <div className="_sam-skill-bio">
                <h6>Full Name</h6>
                <h6 className="_text-bio-name fw-bold fs-6">{full_name}</h6>
                <p className="_sam_profile_sub_text">This is the name that appears in your account and your certificates</p>
            </div>

            <div className="mt-5">
                <h6>Course(s)</h6>
               {
                profile.courses.map((course) =>{
                    let status;
                    return(
                        <p className="text-dark fw-500 fs-6" key={course.id}>{course.name} - (<span className="text-dark fw-500 fs-6">{course.status}</span>)</p>
                    )
                })
               }
            </div>

            <div className="mt-5">
                <div className="d-flex justify-content-between">
                    <div>
                        <h6>Location</h6>
                        <p className="text-dark fw-bold fs-6">{location}</p>
                    </div>
                    <div className="d-flex _sam-link-height">
                       <Edit2 size={18} color="#62b2ee" /> &nbsp;
                       <Link type="button" className="collapse-item _sam-underline" to="#">
                   
                        <LocationModal />
                     </Link>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <div className="d-flex justify-content-between">
                    <div>
                        <h6>Primary Language Spoken</h6>
                        <p className="text-dark fw-bold fs-6">{language}</p>
                    </div>
                    <div className="d-flex _sam-link-height">
                       <Plus size={18} color="#62b2ee" /> &nbsp;
                       <Link className="collapse-item _sam-underline" to="#">
                         <LanguageModal />
                     </Link>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <div className="d-flex justify-content-between">
                    <div>
                        <h6>Education / Certificates</h6>
                        <p className="text-dark fw-bold fs-6">{certificate}</p>
                    </div>
                    <div className="d-flex _sam-link-height">
                       <Edit2 size={18} color="#62b2ee" /> &nbsp;
                       <Link className="collapse-item _sam-underline" to="#">
                       <EducationModal />
                     </Link>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <div className="d-flex justify-content-between">
                    <div>
                        <h6>Social Links</h6>
                        <div className="d-flex mt-4">
                            <Twitter size={22} color="#62b2ee" /> &nbsp;&nbsp;
                            <h6 className="mt-1">{link1}</h6>
                        </div>
                        <div className="d-flex mt-4">
                            <Facebook size={22} color="#62b2ee"/> &nbsp;&nbsp;
                            <h6 className="mt-1">{link2}</h6>
                        </div>
                        <div className="d-flex _sam-link-height mt-4">
                            <Linkedin size={18} color="#62b2ee" /> &nbsp;
                            {link3}
                        </div>
                        <div className="d-flex _sam-link-height mt-4">
                            <Instagram size={18} color="#62b2ee" /> &nbsp;
                            {link4}
                        </div>
                    <div className="d-flex _sam-link-height mt-4">
                       <Plus size={18} color="#62b2ee" /> &nbsp;
                       <Link className="collapse-item _sam-underline" to="#">
                       Add Link
                     </Link>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default BasicInfo