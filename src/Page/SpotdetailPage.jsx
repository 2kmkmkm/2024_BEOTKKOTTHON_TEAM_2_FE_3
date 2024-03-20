import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import back from "../Img/back.svg";
import location_white from "../Img/location_white.svg";
import location_black from "../Img/location_black.svg";
import catfoot from "../Img/catfoot.svg";
import include from "../Img/include.svg";
import review from "../Img/review.svg";
import share from "../Img/share.svg";
import heart from "../Img/heart.svg";
import styles from "../css/spotdetailpage.module.css";

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
  height: 280px;
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

const SpotInfo1 = () => {
  return (
    <>
      <div className={styles.spotinfo1}>
        <div className={styles.categoryname}>술집</div>
        <div className={styles.spotname}>뭉게뭉게 구름</div>
        <div className={styles.review}>
          <div className={styles.grade}>
            <img className={styles.catfoot} src={catfoot} alt="catfoot" />
            <img className={styles.catfoot} src={catfoot} alt="catfoot" />
            <img className={styles.catfoot} src={catfoot} alt="catfoot" />
            <img className={styles.catfoot} src={catfoot} alt="catfoot" />
            <img className={styles.catfoot} src={catfoot} alt="catfoot" />
          </div>
          <div className={styles.grade_num}>5.0</div>
          <div className={styles.review_num}>156개의 리뷰 &gt;</div>
        </div>
      </div>
    </>
  );
};

const SpotInfo2 = () => {
  return (
    <>
      <div className={styles.spotinfo2}>
        <table>
          <tr>
            <td>
              <Link className={styles.link} to="">
                <img
                  className={styles.spotinfo2_img}
                  src={include}
                  alt="include"
                />
                <div className={styles.spotinfo2_text}>먹킷리스트 담기</div>
              </Link>
            </td>
            <td>
              <Link className={styles.link} to="">
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
                <img className={styles.spotinfo2_img} src={share} alt="share" />
                <div className={styles.spotinfo2_text}>공유</div>
              </Link>
            </td>
            <td>
              <Link className={styles.link} to="">
                <img className={styles.spotinfo2_img} src={heart} alt="heart" />
                <div className={styles.spotinfo2_text}>마음함</div>
              </Link>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};

const Copy = styled.button``;

const Map = styled.button``;

const Address = () => {
  return (
    <>
      <div className={styles.address}>
        <img
          className={styles.location_black}
          src={location_black}
          alt="location"
        />
        <div className={styles.address_detail}>
          서울특별시 구름구 미르미동 123-2
        </div>
        <Copy>복사</Copy>
        <Map>지도</Map>
      </div>
    </>
  );
};

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

const SpotdetailPage = () => {
  return (
    <>
      <SpotImage>
        <Header>
          <Back>
            <Link to="/spotlist">
              <img src={back} alt="back" />
            </Link>
          </Back>
        </Header>
        <Wrapper>
          <Location />
        </Wrapper>
      </SpotImage>
      <SpotInfo1 />
      <div className={styles.gap1} />
      <SpotInfo2 />
      <div className={styles.gap2} />
      <Address />
      <div className={styles.gap2} />
    </>
  );
};

export default SpotdetailPage;
