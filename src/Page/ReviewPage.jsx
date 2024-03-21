import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import styles from "../css/reviewpage.module.css";
import { Link } from "react-router-dom";
import back from "../Img/back.svg";
import catfoot from "../Img/catfoot.svg";
import orange from "../Img/orange.svg";
import thumb_on from "../Img/thumb_on.svg";
import thumb_off from "../Img/thumb_off.svg";
import spotimage from "../Img/spotimage.svg";

const Header = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  height: 40px;
  background-color: none;
  box-shadow: 0 3px 3px #f1f1f1;
  align-items: center;
  justify-content: center;
`;

const Back = styled.div`
  margin-right: auto;
  margin-left: 20px;
`;

const Spot = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-family: "Pretendard-Bold";
`;

const SpotName = () => {
  return (
    <>
      <Spot>뭉게뭉게 구름</Spot>
    </>
  );
};

const ReviewNum = () => {
  return (
    <>
      <div className={styles.review_num}>156건의 방문자 평가</div>
    </>
  );
};

const Sort = () => {
  return (
    <>
      <div className={styles.sort}>
        <div>최신순</div>
        <div style={{ paddingLeft: "3px" }}>&#9660;</div>
      </div>
    </>
  );
};

const SortBox = styled.div`
  display: flex;
  border-radius: 1rem;
  background-color: #ff865d;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 80px;
  height: 20px;
  margin-left: 20px;
`;

const Grade1 = () => {
  return (
    <>
      <div class={styles.grade1}>
        <div class={styles.gradegroup}>
          <img className={styles.catfoot1} src={catfoot} alt="catfoot" />
          <img className={styles.catfoot1} src={catfoot} alt="catfoot" />
          <img className={styles.catfoot1} src={catfoot} alt="catfoot" />
          <img className={styles.catfoot1} src={catfoot} alt="catfoot" />
          <img className={styles.catfoot1} src={catfoot} alt="catfoot" />
        </div>
        <div class={styles.gradenum1}>5.0</div>
      </div>
    </>
  );
};

const Grade2 = () => {
  return (
    <>
      <div class={styles.grade2}>
        <div class={styles.gradegroup} style={{ marginTop: "2px" }}>
          <img className={styles.catfoot2} src={catfoot} alt="catfoot" />
          <img className={styles.catfoot2} src={catfoot} alt="catfoot" />
          <img className={styles.catfoot2} src={catfoot} alt="catfoot" />
          <img className={styles.catfoot2} src={catfoot} alt="catfoot" />
          <img className={styles.catfoot2} src={catfoot} alt="catfoot" />
        </div>
        <div class={styles.gradenum2}>5.0</div>
      </div>
    </>
  );
};

const Average = () => {
  return (
    <>
      <div class={styles.average}>
        <ReviewNum />
        <SortBox>
          <Sort />
        </SortBox>
      </div>
      <Grade1 />
    </>
  );
};

const Circle = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  over-flow: hidden;
`;

const Profile = () => {
  return (
    <>
      <div className={styles.profile}>
        <Circle>
          <img className={styles.image} src={orange} alt="" />
        </Circle>
        <div className={styles.username}>먹는 게 제일 좋아</div>
      </div>
    </>
  );
};

const ReviewDate = () => {
  return (
    <>
      <div className={styles.review_date}>2024년 3월 14일</div>
    </>
  );
};

const Thumb = () => {
  return (
    <>
      <div className={styles.thumb}>
        <img className={styles.thumb_img} src={thumb_off} alt="thumb" />
        <div className={styles.thumbnum}>3</div>
      </div>
    </>
  );
};

const ReviewImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 1.5rem;
  over-flow: hidden;
  img {
    border-radius: 1.5rem;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ReviewText = styled.div`
  margin-top: 20px;
`;

const ReviewContent = () => {
  return (
    <>
      <div className={styles.review_content}>
        <ReviewImage>
          <img className={styles.img} src={spotimage} alt="spotimage" />
        </ReviewImage>
        <ReviewText>여기 파스타 강추!</ReviewText>
      </div>
    </>
  );
};

const ReviewDetail = () => {
  return (
    <>
      <div className={styles.profile_thumb}>
        <Profile />
        <Thumb />
      </div>
      <div className={styles.smallreview}>
        <Grade2 />
        <ReviewDate />
      </div>
      <ReviewContent />
    </>
  );
};

const Modal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();

  return (
    <>
      <div className={styles.btn_wrapper}>
        <button
          className={styles.modal_open_btn}
          onClick={() => setModalOpen(true)}
        >
          모달 열기
        </button>
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
            <p>리액트로 모달 구현하기</p>
            <button
              className={styles.modal_close_btn}
              onClick={() => setModalOpen(false)}
            >
              모달 닫기
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const ReviewPage = () => {
  return (
    <>
      <Header>
        <Link to="/spotdetail">
          <Back>
            <img src={back} alt="back" />
          </Back>
        </Link>
        <SpotName />
        <Back></Back>
        <Back></Back>
      </Header>
      <div className={styles.gap1} />
      <Average />
      <div className={styles.gap2} />
      <ReviewDetail />
    </>
  );
};

export default ReviewPage;
