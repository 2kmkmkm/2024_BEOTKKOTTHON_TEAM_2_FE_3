import React, { useState, useEffect, useDispatch } from "react";
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

const SpotlistPage = () => {
  const { category } = useParams();

  // 카테고리별 검색
  const SearchBar = () => {
    const [search, setSearch] = useState("");
    const onChange = (e) => {
      setSearch(e.target.value);
    };

    const [spots, setSpots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
      e.preventDefault();
      const filteredSpots = spots.filter((spot) => {
        return spot.spotName.toLowerCase().includes(search.toLowerCase());
      });
      setSpots(filteredSpots);
    };

    // 해당 카테고리 맛집 API 받아와서 검색
    useEffect(() => {
      const fetchSpots = async () => {
        try {
          setError(null);
          setLoading(true);
          const response = await axios.get(
            `http://43.202.65.80:3000/api/restaurant`
          );
          setSpots(response.data);
        } catch (e) {
          setError(e);
        }
        setLoading(false);
      };
      fetchSpots();
    }, []);

    // 검색어와 일치하는 맛집만 필터링

    return (
      <div onSubmit={handleSubmit}>
        <input
          className={styles.searchbar}
          type="search"
          value={search}
          onChange={onChange}
          placeholder="음식점을 입력해주세요"
        />
        {/* 맛집 목록 출력 */}
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <ul></ul>
        )}
      </div>
    );
  };

  const SpotlistItem = () => {
    const { category } = useParams();
    const [spotList, setSpotList] = useState([]);

    useEffect(() => {
      const fetchSpots = async () => {
        try {
          const response = await axios.get(
            `http://43.202.65.80:3000/api/restaurant/category/${category}`
          );
          console.log(response.data.body);
          setSpotList(response.data.body);
          console.log(response);
        } catch (e) {
          console.log(e);
        }
      };
      fetchSpots();
    }, [category]);

    return (
      <>
        {spotList &&
          spotList.map((spot) => (
            <SpotInfo
              key={spot.restaurant_id}
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

  return (
    <>
      <Header>
        <Back>
          <div onClick={onClickBack}>
            <img src={back} alt="back" />
          </div>
        </Back>
        <CategoryName>{category}</CategoryName>
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

export default SpotlistPage;
