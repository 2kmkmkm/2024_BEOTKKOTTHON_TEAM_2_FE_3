import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import back from "../Img/back.svg";
import location_white from "../Img/location_white.svg";
import location_black from "../Img/location_black.svg";
import catfoot from "../Img/catfoot.svg";
import catfoot_off from "../Img/catfoot_off.svg";
import include from "../Img/include.svg";
import review from "../Img/review.svg";
import share from "../Img/share.svg";
import heart from "../Img/heart.svg";
import contact from "../Img/contact.svg";
import styles from "../css/spotdetailpage.module.css";
import axios from "axios";

const Header = styled.div`
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  display: flex;
  height: 40px;
  background-color: none;
`;

const SpotImage = styled.div`
  flex-direction: column;
  position: relative;
  display: flex;
  width: 100%;
  height: 300px;
  background: #c4c4c4;
`;

const Back = styled.div`
  padding-left: 20px;
  margin-right: auto;
`;

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
`;

const Spot = ({
  spotId,
  spotImage,
  spotName,
  spotCategory,
  spotReviewNum,
  spotGrade,
  spotAddress,
  spotContact,
  spotLink,
}) => {
  const SpotInfo1 = () => {
    const navigate = useNavigate();
    const onClickBack = () => {
      return navigate(-1);
    };

    const Catfoot = ({ spotGrade }) => {
      const filledCount = Math.floor(spotGrade);
      let color = [];
      if (filledCount >= 1) {
        color = [true, false, false, false, false];
      }
      if (filledCount >= 2) {
        color = [true, true, false, false, false];
      }
      if (filledCount >= 3) {
        color = [true, true, true, false, false];
      }
      if (filledCount >= 4) {
        color = [true, true, true, true, false];
      }
      if (filledCount >= 5) {
        color = [true, true, true, true, true];
      } else {
        color = [false, false, false, false, false];
      }

      console.log(color);

      return (
        <>
          <div>
            {color.map((color, index) =>
              color ? (
                <img
                  width="25px"
                  className={styles.catfoot_img}
                  key={index}
                  src={catfoot} // filledCount에 따라 이미지 변경
                  alt="catfoot"
                />
              ) : (
                <img
                  width="25px"
                  className={styles.catfoot_img}
                  key={index}
                  src={catfoot_off} // filledCount에 따라 이미지 변경
                  alt="catfoot"
                />
              )
            )}
          </div>
        </>
      );
    };

    return (
      <>
        <SpotImage>
          <img src={spotImage} />
          <Header>
            <Back>
              <div onClick={onClickBack}>
                <img src={back} alt="back" />
              </div>
            </Back>
          </Header>
        </SpotImage>
        <div className={styles.spotinfo1}>
          <div className={styles.categoryname}>{spotCategory}</div>
          <div className={styles.spotname}>{spotName}</div>
          <div className={styles.review}>
            <div className={styles.grade}>
              <Catfoot spotGrade={spotGrade} />
            </div>
            <div className={styles.grade_num}>{spotGrade}</div>
            <Link to={`/review/${spotId}`} className={styles.review_num}>
              {spotReviewNum}개의 리뷰 &gt;
            </Link>
          </div>
        </div>
      </>
    );
  };

  const SpotInfo2 = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const modalBackground = useRef();
    const handleButtonClick = () => {
      setModalOpen(true);
    };

    const handleCloseModal = () => {
      setModalOpen(false);
    };

    const handleRadioChange = (event) => {
      setSelectedOption(event.target.value);
    };

    const handleSubmit = () => {
      // 여기에 선택된 라디오 버튼 값(selectedOption)을 이용한 작업을 수행할 수 있습니다.
      console.log("Selected option:", selectedOption);
      handleCloseModal();
    };

    /* 
    const [mukatlist, setMukatlist] = useState([]);

    useEffect(() => {
      const fetchMukatlist = async () => {
        try {
          const response = await axios.get(
            `http://43.203.208.221:8079/api/groupmuckat`
          ); // 사용자 정보 추가 필요
          setMukatlist(response.data.data);
          console.log(response);
        } catch (e) {
          console.log(e);
        }
      };
      fetchMukatlist();
    }, [mukatlist]); */

    const IncludeModal = () => {
      return (
        <>
          <div onClick={handleButtonClick} className={styles.include}>
            <img className={styles.spotinfo2_img} src={include} alt="include" />
            <div className={styles.spotinfo2_text}>먹킷리스트 담기</div>
          </div>
          {modalOpen && (
            <div
              className={styles.modal_container}
              ref={modalBackground}
              onClick={(e) => {
                if (e.target === modalBackground.current) {
                  setModalOpen(false);
                }
              }}
            >
              <div className={styles.modal_content}>
                <h2>먹킷리스트 목록</h2>
                <form onSubmit={handleSubmit}>
                  <label className={styles.radiobutton}>
                    <input
                      type="radio"
                      value="personal"
                      checked={selectedOption === "personal"}
                      onChange={handleRadioChange}
                    />
                    개인 먹킷리스트
                  </label>
                  <label className={styles.radiobutton}>
                    <input
                      type="radio"
                      value="group"
                      checked={selectedOption === "group"}
                      onChange={handleRadioChange}
                    />
                    그룹 먹킷 리스트
                  </label>
                  <div className={styles.button_select}>
                    <button
                      className={styles.button_cancel}
                      onClick={handleCloseModal}
                    >
                      취소
                    </button>
                    <button className={styles.button_ok} type="submit">
                      확인
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      );
    };

    return (
      <>
        <div className={styles.spotinfo2}>
          <table>
            <tr>
              <td>
                <IncludeModal />
              </td>
              <td>
                <Link to={`/reviewwrite/${spotId}`} className={styles.link}>
                  <img
                    className={styles.spotinfo2_img}
                    src={review}
                    alt="reivew"
                  />
                  <div className={styles.spotinfo2_text}>리뷰 작성</div>
                </Link>
              </td>
              <td>
                <Link className={styles.link} to="">
                  <img
                    className={styles.spotinfo2_img}
                    src={share}
                    alt="share"
                  />
                  <div className={styles.spotinfo2_text}>공유</div>
                </Link>
              </td>
              <td>
                <Link className={styles.link} to="">
                  <img
                    className={styles.spotinfo2_img}
                    src={heart}
                    alt="heart"
                  />
                  <div className={styles.spotinfo2_text}>마음함</div>
                </Link>
              </td>
            </tr>
          </table>
        </div>
      </>
    );
  };

  const Address = () => {
    return (
      <>
        <div className={styles.address}>
          <img
            className={styles.location_black}
            src={location_black}
            alt="location"
          />
          <div className={styles.address_detail}>{spotAddress}</div>
          <Link className={styles.copy} to="">
            복사
          </Link>
          <Link className={styles.mapbutton} to="">
            <div className={styles.map}>지도보기</div>
          </Link>
        </div>
      </>
    );
  };

  const Contact = () => {
    return (
      <>
        <div className={styles.contact}>
          <img className={styles.contact_img} src={contact} alt="contact" />
          <div className={styles.contact_detail}>{spotContact}</div>
          <Link to="" className={styles.call}>
            전화걸기
          </Link>
        </div>
      </>
    );
  };

  const Detail = () => {
    return (
      <>
        <div className={styles.detail}>
          <Link
            className={styles.linkDetail}
            to={`https://www.example.com/restaurant1`}
          >
            {spotLink}
          </Link>
        </div>
      </>
    );
  };

  return (
    <>
      <div>
        <SpotInfo1 />
        <div>
          <div className={styles.gap1} />
          <SpotInfo2 />
          <div className={styles.gap2} />
          <Address />
          <div className={styles.gap2} />
          <Contact />
          <div className={styles.gap2} />
          <Detail />
        </div>
      </div>
    </>
  );
};

/*
const Location = () => {
  return (
    <>
      <div className={styles.location}>
        <img src={location_white} width="10px" alt="location"></img>
        <div style={{ padding: "3px" }}>800m</div>
      </div>
    </>
  );
};
 */

const SpotdetailPage = () => {
  const { spotId } = useParams();
  const [spotDetail, setSpotDetail] = useState({});

  useEffect(() => {
    const fetchSpotDetail = async () => {
      try {
        const response = await axios.get(
          `http://43.202.65.80:3000/api/restaurant/details/${spotId}`
        );
        setSpotDetail(response.data.body);
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    };
    fetchSpotDetail();
  }, [spotId]);

  return (
    <>
      {spotDetail && (
        <Spot
          key={spotDetail.restaurant_id}
          spotId={spotDetail.restaurant_id}
          spotImage={spotDetail.image}
          spotName={spotDetail.restaurant_name}
          spotCategory={spotDetail.category}
          spotReviewNum={spotDetail.review_count}
          spotGrade={spotDetail.avg_grade}
          spotAddress={spotDetail.address}
          spotContact={spotDetail.phone_number}
          spotLink={spotDetail.link}
        />
      )}
    </>
  );
};

export default SpotdetailPage;
