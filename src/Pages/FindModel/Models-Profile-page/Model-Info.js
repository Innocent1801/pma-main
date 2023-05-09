import { useSelector } from "react-redux";
import { InteractiveBtn } from "./Buttons";
import { useLocation } from "react-router";
import { BiCategoryAlt } from "react-icons/bi";
import { BsPatchCheckFill } from "react-icons/bs";
import { FaEnvelope, FaHome, FaRegStar, FaStar } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { NavLink } from "react-router-dom";

function ModelInfo({ item, handleForm }) {
  const user = useSelector((state) => state.user.currentUser);
  const location = useLocation();
  const path = location.pathname.split("/")[3];

  return (
    <>
      <section className="section section-profile2 model-info">
        <div className="model__img-container">
          <img
            className="model__img"
            src={item?.picture ? item?.picture : item?.model?.picture}
            alt=""
            width="400"
            height="400"
          />
        </div>
        <div className="model-Info__text-content">
          <span className="top-text model__namewrap">
            <span className="model__names">{`${item?.model?.fullName}`}</span>
            {item?.model?.isVerified && <BsPatchCheckFill />}
          </span>
          <div className="text2 model__ratings">
            <span>
              <FaStar />
              <FaStar />
              <FaStar />
            </span>

            <span>
              <FaRegStar />
              <FaRegStar />
            </span>

            <span>(3.0)</span>
          </div>
          <div className="text3 model__categorys">
            <div id="agencylable">
              <FaHome />
              <span className="value">{item?.model?.agency}</span>
            </div>

            <div id="categorylable">
              <span>
                <BiCategoryAlt />
              </span>
              <span className="value">
                {item?.model?.category[0]} and {item?.model?.category[1]} Model
              </span>
            </div>
          </div>

          <div className="text4 model__locations">
            <MdLocationPin />
            <span>
              {item?.state ? item?.state : item?.model?.state},{" "}
              {item?.country ? item?.country : item?.model?.country}
            </span>
          </div>

          {!user && (
            <div className="interactive-section">
              <InteractiveBtn btnIcon="fa-solid fa-user-plus follow-icon Icon" btnText="Follow" />
              <InteractiveBtn
                btnIcon="fa-regular fa-heart heart-icon Icon"
                //btnIcon="fa-solid fa-heart heart-icon Icon"
                btnText="Favorite"
              />
              <InteractiveBtn
                btnIcon="fa-brands fa-instagram insta-icon Icon"
                btnText="Instagram"
              />
              <InteractiveBtn btnIcon="fa-solid fa-share-nodes share-icon Icon" btnText="Share" />
            </div>
          )}
          <div className="model__activities">
            <p>
              <span className="semi-bold">Favorite: </span>7.8k
            </p>
            <p>
              <span className="semi-bold">Followers: </span> 237k
            </p>
            <p>
              <span className="semi-bold">Views: </span> 3.6k
            </p>
            <p>
              <span className="semi-bold">Active: </span> 2 weeks ago
            </p>
          </div>
          <p>
            <span className="semi-bold">Minimum booking price: </span> #{item?.model?.minPrice}
          </p>

          <div className="profile-btn btn-shadow">
            <NavLink to={user && user._id === path && "/model-Acct-setting"}>
              <button
                onClick={!user && user._id !== path && handleForm}
                className="model-profilebtn  btn-shadow">
                <FaEnvelope />
                {!user || user._id !== path ? (
                  <>
                    <span>Book</span> <span>Model</span>
                  </>
                ) : (
                  <>
                    <span>Edit</span> <span>Portfolio</span>
                  </>
                )}
              </button>
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
}
export default ModelInfo;
