import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import styles from "../css/reviewwritepage.module.css";
import back from "../Img/back.svg";
import catfoot_off from "../Img/catfoot_off.svg";

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

const Text = () => {
  return (
    <>
      <div className={styles.text}>
        <div>평가를 완료하시면 최대 100포인트가 적립됩니다.</div>
        <div>
          (별점만 선택하면 50포인트, 방문 후기도 작성하면 100포인트 지급)
        </div>
      </div>
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
            placeholder="음식, 서비스, 분위기, 위생상태 등의 방문 경험을 적어주세요. (30자 이상 작성 시 포인트 적립)"
          />
          <div className={styles.wordcount}>( 0 / 1000자 )</div>
        </TextBox>
      </div>
    </>
  );
};

const SubmitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 20px 0 20px;
  width: calc(100% - 40px);
  background: #ff865d;
  border: none;
  height: 60px;
  border-radius: 1.5rem;
`;

const Submit = () => {
  return (
    <>
      <div>
        <SubmitButton>
          <div className={styles.select}>등록하기</div>
        </SubmitButton>
      </div>
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
      <Text />
      <Grade />
      <div className={styles.gap2} />
      <SelectPicture />
      <ReviewText />
      <Submit />
    </>
  );
};

export default ReviewWritePage;
