import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import styles from "../css/reviewpage.module.css";
import { Link, useParams } from "react-router-dom";
import back from "../Img/back.svg";
import catfoot from "../Img/catfoot.svg";
import catfoot_off from "../Img/catfoot_off.svg";
import orange from "../Img/orange.svg";
import thumb_on from "../Img/thumb_on.svg";
import thumb_off from "../Img/thumb_off.svg";
import spotimage from "../Img/spotimage.svg";
import axios from "axios";
import "../font/font.css";

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

const SpotName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-family: "Pretendard-Bold";
`;

const SelectBox = styled.div`
  margin-left: 20px;
  font-family: "Pretendard-Medium";
  position: relative;
  width: 80px;
  height: 10px;
  padding: 8px 10px 8px 10px;
  border-radius: 2rem;
  background-color: #fd9775;
  text-align: center;
  justify-content: center;
  cursor: pointer;
  display: flex;
`;

const Label = styled.label`
  display: flex;
  font-size: 12px;
  text-align: center;
  align-items: center;
  justify-content: center;
  color: white;
`;

const SelectOptions = styled.ul`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: absolute;
  list-style: none;
  margin-top: 18px;
  left: 0;
  width: 100%;
  padding: 0;
  border-radius: 8px;
  background-color: white;
  color: black;
  max-height: ${(props) => (props.show ? "none" : "0")};
`;

const Option = styled.li`
  font-size: 12px;
  padding: 6px 8px;
  &:hover {
    background-color: #eaeaea;
  }
`;

const Circle = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  over-flow: hidden;
`;

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

const HeaderDiv = ({ spotName }) => {
  const { spotId } = useParams();
  return (
    <>
      <div>
        {/*헤더 부분*/}
        <Header>
          <Link to={`/spotdetail/${spotId}`}>
            <Back>
              <img src={back} alt="back" />
            </Back>
          </Link>
          <SpotName spotname={spotName} />
          <Back></Back>
          <Back></Back>
        </Header>
      </div>
    </>
  );
};

const ReviewDetail = ({
  userReviewId,
  kakaoId,
  userId,
  userImage,
  restaurantName,
  star,
  writeTime,
  details,
  likeCount,
  reviewImage,
}) => {
  const Profile = () => {
    return (
      <>
        <div className={styles.profile}>
          <Circle>
            <img className={styles.image} src={userImage} alt="" />
          </Circle>
          <div className={styles.username}>{userId}</div>
        </div>
      </>
    );
  };

  const Thumb = () => {
    return (
      <>
        <div className={styles.thumb}>
          <img className={styles.thumb_img} src={thumb_off} alt="thumb" />
          <div className={styles.thumbnum}>{likeCount}</div>
        </div>
      </>
    );
  };

  const Grade2 = () => {
    let color = [];
    if (star >= 1) {
      color = [true, false, false, false, false];
    }
    if (star >= 2) {
      color = [true, true, false, false, false];
    }
    if (star >= 3) {
      color = [true, true, true, false, false];
    }
    if (star >= 4) {
      color = [true, true, true, true, false];
    }
    if (star >= 5) {
      color = [true, true, true, true, true];
    }

    return (
      <>
        <div>
          {color.map((color, index) =>
            color ? (
              <img
                width="20px"
                className={styles.catfoot_img}
                key={index}
                src={catfoot} // filledCount에 따라 이미지 변경
                alt="catfoot"
              />
            ) : (
              <img
                width="20px"
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

  const ReviewDate = () => {
    return (
      <>
        <div className={styles.review_date}>{writeTime}</div>
      </>
    );
  };

  const ReviewContent = () => {
    return (
      <>
        <div className={styles.review_content}>
          <ReviewImage>
            <img className={styles.img} src={reviewImage} alt="spotimage" />
          </ReviewImage>
          <ReviewText>{details}</ReviewText>
        </div>
      </>
    );
  };

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

const SpotReview = ({ review_count, avg_grade, restaurant_id }) => {
  const SelectSort = () => {
    const [currentValue, setCurrentValue] = useState("최신순");
    const [showOptions, setShowOptions] = useState(false);

    const handleToggleOptions = () => {
      setShowOptions((prev) => !prev);
    };

    const handleOnChangeSelectValue = (value) => {
      setCurrentValue(value);
      setShowOptions(false);
    };

    return (
      <SelectBox onClick={handleToggleOptions}>
        <Label>{currentValue}</Label>
        <SelectOptions show={showOptions}>
          <Option onClick={() => handleOnChangeSelectValue("최신순")}>
            최신순
          </Option>
          <Option onClick={() => handleOnChangeSelectValue("추천순")}>
            추천순
          </Option>
          <Option onClick={() => handleOnChangeSelectValue("별점 높은순")}>
            별점 높은순
          </Option>
          <Option onClick={() => handleOnChangeSelectValue("별점 낮은순")}>
            별점 낮은순
          </Option>
        </SelectOptions>
      </SelectBox>
    );
  };

  const Grade1 = ({ currentValue }) => {
    const filledCount = Math.floor(avg_grade);
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
    }

    let sortOption, sortBy;
    if (currentValue === "최신순") {
      sortOption = "REVIEWDATE";
      sortBy = "DESC";
    } else if (currentValue === "추천순") {
      sortOption = "REVIEWCOUNT";
      sortBy = "DESC";
    } else if (currentValue === "별점 높은순") {
      sortOption = "STAR";
      sortBy = "ASC";
    } else if (currentValue === "별점 낮은순") {
      sortOption = "STAR";
      sortBy = "DESC";
    }

    return (
      <>
        <div>
          {color.map((color, index) =>
            color ? (
              <img
                width="25px"
                className={styles.catfoot_img}
                key={index}
                src={catfoot}
                alt="catfoot"
              />
            ) : (
              <img
                width="25px"
                className={styles.catfoot_img}
                key={index}
                src={catfoot_off}
                alt="catfoot"
              />
            )
          )}
          <Sort
            restaurant_id={restaurant_id}
            sortOption={sortOption}
            sortBy={sortBy}
          />
        </div>
        <div>{avg_grade}</div>
      </>
    );
  };

  return (
    <>
      <div>
        {/* 리뷰 개수 */}
        <div className={styles.review_num}>{review_count}건의 방문자 평가</div>
        {/* 정렬(클릭 시 모달 창) */}
        <SelectSort />
        {/* 냥발 + 평균 평점*/}
        <Grade1 />
      </div>
    </>
  );
};

const Sort = ({ sortOption, sortBy, restaurant_id }) => {
  const [sort, setSort] = useState([]);

  useEffect(() => {
    const fetchSort = async () => {
      try {
        const response = await axios.get(
          `http://43.203.208.221:8079/api/reviews/${restaurant_id}/${sortOption}/${sortBy}`
        );
        setSort(response.data.body);
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    };
    fetchSort();
  }, []);

  return (
    <>
      {sort && (
        <ReviewDetail
          key={sort.userReviewId}
          kakaoId={sort.kakaoId}
          userId={sort.userId}
          userImage={sort.userImage}
          spotName={sort.restaurantName}
          spotGrade={sort.star}
          reviewTime={sort.writeTime}
          details={sort.details}
          likeCount={sort.likeCount}
          reviewImage={sort.reviewImage}
        />
      )}
    </>
  );
};

const ReviewPage = () => {
  const { spotId } = useParams();
  const [spotDetail, setSpotDetail] = useState([]);

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
  }, []);

  return (
    <>
      {/* 헤더 전체 */}
      <HeaderDiv spotName={spotDetail.restaurant_name} />
      {/* `http://43.202.65.80:3000/api/restaurant/details/${spotId}`
      위의 API 값으로 맛집 상세 정보 받고, 정보가 있으면 리뷰 정보를 받아옴
      상단에 있는 리뷰 개수, 평균 평점, 정렬 */}
      {spotDetail && (
        <SpotReview
          key={spotDetail.restaurant_id}
          spotId={spotDetail.restaurant_id}
          spotName={spotDetail.restaurant_name}
          spotReviewNum={spotDetail.review_count}
          spotGrade={spotDetail.avg_grade}
        />
      )}
      <div className={styles.gap1} />
      {/* 사용자가 입력한 리뷰 리스트 */}
    </>
  );
};

export default ReviewPage;
