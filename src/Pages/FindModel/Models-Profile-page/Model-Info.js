import { useSelector } from "react-redux";
import { InteractiveBtn } from "./Buttons";
import { useLocation } from "react-router";

function ModelInfo({ item, handleForm, setEditPortfolio }) {
  const user = useSelector((state) => state.user.currentUser);
  const location = useLocation()
  const path = location.pathname.split("/")[3]
  console.log(user)

  const handleEditProfile = () => {
    setEditPortfolio(true);
  };

  return (
    <>
      <section className="section model-info">
        <div className="model__img-container">
          <img
            className="model__img"
            src={item?.picture}
            alt=""
            width="400"
            height="400"
          />
        </div>
        <div className="model-Info__text-content">
          <span className="top-text">
            <h3 className="model__name">{`${item?.model?.fullName}`}</h3>
            <i className="fa-solid fa-circle-check check-icon"></i>
          </span>
          <p className="model__rating">
            <i className="fa-solid fa-star star--icon"></i>
            <i className="fa-solid fa-star star--icon"></i>
            <i className="fa-solid fa-star star--icon"></i>
            <i className="fa-regular fa-star star--icon"></i>
            <i className="fa-regular fa-star star--icon"></i>
            <span> (3.0)</span>
          </p>
          <p>
            <span className="model__category semi-bold">
              {item?.model?.category[0]} and {item?.model?.category[1]} Model
            </span>
          </p>

          <p className="model__location">
            <i className="fa-solid fa-location-dot model__location-icon"></i>
            <span className="semi-bold">
              {item?.state}, {item?.country}
            </span>
          </p>
          <p className="model__agency">
            <i className="fa-solid fa-house-chimney model__agency-icon"></i>
            <span className="semi-bold">{item?.model?.agency}</span>
          </p>

          {!user && (
            <div className="interactive-section">
              <InteractiveBtn
                btnIcon="fa-solid fa-user-plus follow-icon Icon"
                btnText="Follow"
              />
              <InteractiveBtn
                btnIcon="fa-regular fa-heart heart-icon Icon"
                //btnIcon="fa-solid fa-heart heart-icon Icon"
                btnText="Favorite"
              />
              <InteractiveBtn
                btnIcon="fa-brands fa-instagram insta-icon Icon"
                btnText="Instagram"
              />
              <InteractiveBtn
                btnIcon="fa-solid fa-share-nodes share-icon Icon"
                btnText="Share"
              />
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

          {/* desktop CTA btn section */}

          <button
            onClick={user && user._id === path ? handleEditProfile : handleForm}
            className="cta-btn desktop-cta dark--btn on-hover"
          >
            <i className="fa-solid fa-envelope-circle-check Icon"></i>
            {!user || user._id !== path ? "Book model" : "Edit Portfolio"}
          </button>
        </div>
      </section>

      {/* mobile CTA btn section */}
      <div className="cta-btn-wrapper">
        <button onClick={user && user._id === path ? handleEditProfile : handleForm} className="cta-btn dark--btn on-hover">
          <i className="fa-solid fa-envelope-circle-check Icon"></i>
          {!user || user._id !== path ? "Book model" : "Edit Portfolio"}
        </button>
      </div>
    </>
  );
}
export default ModelInfo;
