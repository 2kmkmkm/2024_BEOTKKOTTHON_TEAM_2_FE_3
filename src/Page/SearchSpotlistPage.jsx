import React, { useState, useEffect } from "react";
import styled from "styled-components";
import back from "../Img/back.svg";
import point from "../Img/point.svg";
import location from "../Img/location_white.svg";
import catfoot from "../Img/catfoot.svg";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "../css/spotlistpage.module.css";
import "../font/font.css";
import axios from "axios";

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
  padding-left: 20px;
`;

const CategoryName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-family: "Pretendard-Bold";
`;

const Point = styled.a`
  padding-right: 20px;
  padding-top: 3px;
`;

const Wrapper = styled.div`
  width: calc(100% - 30px);
  margin: 15px;
  align-items: center;
  justify-content: center;
`;

const SpotImage = styled.img`
  width: 100%;
  border-radius: 1.5rem;
  border: 1px solid black;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-image: url("https://muckatlist.s3.ap-northeast-2.amazonaws.com/3a818899-2f88-4271-870c-421167f6c53f");
`;

// 각 맛집 정보
const SpotInfo = ({ spotId, spotImage, spotName, spotAddress, spotGrade }) => {
  // 해당 맛집 이미지
  const SpotImageDiv = () => {
    return (
      <>
        <div className={styles.spotlist}>
          <SpotImage>
            {/* <img
              // src={
              //   "https://muckatlist.s3.ap-northeast-2.amazonaws.com/3a818899-2f88-4271-870c-421167f6c53f"
              // }
              alt="spotImage"
            /> */}
          </SpotImage>
        </div>
      </>
    );
  };

  // 해당 맛집 정보
  const SpotDetailDiv = () => {
    return (
      <>
        <div className={styles.spotinfo}>
          <div className={styles.spotname}>{spotName}</div>
          <div className={styles.address}>{spotAddress}</div>
          <div className={styles.review}>
            <img
              src={catfoot}
              style={{ paddingTop: "1px" }}
              alt="catfoot"
              width="20px"
            />
            <div className={styles.grade}>{spotGrade}</div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Link className={styles.list} to={`/spotdetail/${spotId}`}>
        <SpotImageDiv />
        <SpotDetailDiv />
      </Link>
    </>
  );
};

const SearchSpotlistPage = () => {
  // 이전에 "맛집 이름"으로 검색한 맛집 리스트
  const SpotlistItem = () => {
    const { searched } = useParams();
    const [spotList, setSpotList] = useState([]);

    useEffect(() => {
      const fetchSpots = async () => {
        try {
          const response = await axios.get(
            `http://43.202.65.80:3000/api/restaurant/search/${searched}`
          );
          console.log(response.data.body);
          setSpotList(response.data.body);
        } catch (e) {
          console.log(e);
        }
      };
      fetchSpots();
    }, []);

    return (
      <>
        {spotList &&
          spotList.map((spot) => (
            <SpotInfo
              key={spot.restaurant_name}
              spotId={spot.restaurant_id}
              spotImage={spot.spotImage}
              spotName={spot.restaurant_name}
              spotAddress={spot.address}
              spotGrade={spot.avg_grade}
            />
          ))}
      </>
    );
  };

  const navigate = useNavigate();
  const onClickBack = () => {
    return navigate(-1);
  };

  // spotlist에서 "맛집 이름"으로 검색할 검색창
  const SearchBar = () => {
    const [search, setSearch] = useState("");
    const onChange = (e) => {
      setSearch(e.target.value);
    };

    const handleSubmit = async (e) => {
      try {
        const response = await axios.get(
          `http://43.202.65.80:3000/api/restaurant/search/${search}`
        );
        if (response.data) {
          console.log(response.data);
          navigate(`/spotlist/search/${search}`);
        } else {
          console.log(e);
        }
      } catch (e) {
        console.log(e);
      }
    };

    const handleOnKeyDown = (e) => {
      if (e.key === "Enter") {
        handleSubmit(e);
      }
    };

    return (
      <div>
        <input
          onKeyDown={handleOnKeyDown}
          className={styles.searchbar}
          type="search"
          value={search}
          onChange={onChange}
          placeholder="음식점을 입력해주세요"
        />
      </div>
    );
  };

  return (
    <>
      <Header>
        <Back>
          <div onClick={onClickBack}>
            <img src={back} alt="back" />
          </div>
        </Back>
        <CategoryName>전체</CategoryName>
        <Point>
          <img src={point} width="25px" alt="point" />
        </Point>
      </Header>
      <SearchBar />
      <Wrapper>
        <SpotlistItem />
      </Wrapper>
    </>
  );
};

export default SearchSpotlistPage;
