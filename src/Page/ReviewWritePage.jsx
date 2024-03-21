import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import styles from "../css/reviewwritepage.module.css";
import back from "../Img/back.svg";
import catfoot_off from "../Img/catfoot_off.svg";
import mukat from "../Img/mukat.svg";
import point from "../Img/point.svg";

const Header = styled.div`
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  display: flex;
  height: 40px;
  background-color: none;
  box-shadow: 0 3px 3px #f1f1f1;
`;

const Back = styled.div`
  padding-left: 20px;
  margin-right: auto;
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

const Grade = () => {
  return (
    <>
      <div className={styles.grade}>
        <div className={styles.grade1}>
          <div className={styles.gradegroup}>
            <img className={styles.catfoot} src={catfoot_off} alt="catfoot" />
            <img className={styles.catfoot} src={catfoot_off} alt="catfoot" />
            <img className={styles.catfoot} src={catfoot_off} alt="catfoot" />
            <img className={styles.catfoot} src={catfoot_off} alt="catfoot" />
            <img className={styles.catfoot} src={catfoot_off} alt="catfoot" />
          </div>
        </div>
      </div>
      <div className={styles.grade2}>
        <div className={styles.grade_num}>0점</div>
        <div className={styles.grade_req}>(필수)</div>
      </div>
    </>
  );
};

const Picture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c4c4c4;
  width: 100%;
  margin: 0 30px;
  height: 180px;
  border-radius: 2rem;
`;

const SelectPicture = () => {
  return (
    <>
      <div className={styles.picture}>
        <Picture>
          <div>
            <div className={styles.plus}>+</div>
            <div className={styles.select}>사진 선택</div>
          </div>
        </Picture>
      </div>
    </>
  );
};

const TextBox = styled.div`
  border: 1.5px #c4c4c4 solid;
  border-radius: 2rem;
  width: 100%;
  margin: 0 30px;
  height: 170px;
`;

const ReviewText = () => {
  return (
    <>
      <div className={styles.textbox}>
        <TextBox>
          <div className={styles.review_header}>
            <div className={styles.grade_num}>방문 후기</div>
            <div className={styles.grade_req}>(선택)</div>
          </div>
          <div className={styles.gap3}></div>
          <textarea
            className={styles.textarea}
            placeholder="음식, 서비스, 분위기, 위생상태 등의 방문 경험을 적어주세요."
          />
          <div className={styles.wordcount}>( 0 / 1000자 )</div>
        </TextBox>
      </div>
    </>
  );
};

const Submit = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();
  const handleButtonClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = () => {
    handleCloseModal();
  };

  return (
    <>
      <button
        onClick={handleButtonClick}
        className={styles.button_submit}
        type="submit"
      >
        <div className={styles.select}>등록하기</div>
      </button>
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
            <div className={styles.cat}>
              <img className={styles.img} src={mukat} alt="mukat" />
            </div>
            <div className={styles.register}>리뷰가 등록되었습니다</div>
            <div className={styles.button_select}>
              <button
                className={styles.button_ok}
                onClick={handleSubmit}
                type="submit"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const ReviewWritePage = () => {
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
      <Grade />
      <div className={styles.gap2} />
      <SelectPicture />
      <ReviewText />
      <Submit />
    </>
  );
};

export default ReviewWritePage;
