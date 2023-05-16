import { Link } from "react-router-dom"
import {Edit2} from "react-feather"
import EditBioModal from "../modals/EditBioModal";
function Bio({bio, profile}) {
  return (
    <>
      <div className="d-flex justify-content-between _sam-bio-text">
        <div>
          <h6>Bio</h6>
          <div className="container _bio-text">
            <p className="text-centr _sam_profile_sub_text">{bio}</p>
          </div>



        </div>
        <div className="d-flex _sam-link-height">
             <Edit2 size={18} color="#62b2ee" /> &nbsp;
              <Link className="collapse-item _sam-underline" to="#">
                   <EditBioModal bio={bio} profile={profile}/>
              </Link>
        </div>
      </div>

      <div className="mt-5">
        <h6>Skills</h6>
        <p className="_sam_profile_sub_text">
          Your skills will keep updating as you complete your course time line
          and projects.
        </p>

        <div className="_sam_grid">

         {
          profile.skill.map((skill)=>{
            return(
              <div className="border rounded-pill p-1">
              <p className="_sam_profile_skills text-center m-0">{}</p>
          </div>
            )
          })
         }

          {/* <div className="border rounded-pill p-1">
            <p className="_sam_profile_skills text-center m-0">Css</p>
          </div>

          <div className="border rounded-pill p-1">
            <p className="_sam_profile_skills text-center m-0">Logics Building</p>
          </div>

          <div className="border rounded-pill p-1">
            <p className="_sam_profile_skills text-center m-0">Java Script</p>
          </div>

          <div className="border rounded-pill p-1">
            <p className="_sam_profile_skills text-center m-0">JQuery</p>
          </div>

          <div className="border rounded-pill p-1">
            <p className="_sam_profile_skills text-center m-0">JQuery</p>
          </div> */}
        </div>

        <div className="mt-5">
            <h6 className="_sma_profile_certificates">
                Certificates
            </h6>
            <Link className="collapse-item mr-2" to="/certificate">
                      view certificate
            </Link>
        </div>
      </div>
    </>
  );
}
export default Bio;

