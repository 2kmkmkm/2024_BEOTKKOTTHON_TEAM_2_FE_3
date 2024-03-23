import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import styles from "../css/reviewwritepage.module.css";
import back from "../Img/back.svg";
import catfoot_off from "../Img/catfoot_off.svg";
import catfoot_on from "../Img/catfoot.svg";
import mukat from "../Img/mukat.svg";
import axios from "axios";

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
      <Spot>{spotDetail.restaurant_id}</Spot>
    </>
  );
};

const Catfoot = () => {
  const array = [0, 1, 2, 3, 4];
  const [score, setScore] = useState([false, false, false, false, false]);
  const [selectedCount, setSelectedCount] = useState(0);

  const handleScore = (index) => {
    const updatedScore = score.map((_, i) => i <= index);
    setScore(updatedScore);
    const count = updatedScore.filter((selected) => selected).length; // 선택된 catfoot 개수 계산
    setSelectedCount(count);
  };

  return (
    <>
      <div>
        {array.map((el, index) => (
          <img
            className={styles.catfoot_img}
            key={index}
            src={score[index] ? catfoot_on : catfoot_off} // 별의 활성화 여부에 따라 이미지 변경
            onClick={() => handleScore(index)} // 클릭 시 해당 별까지의 점수 설정
            alt="catfoot"
          />
        ))}
        <div className={styles.grade2}>
          <span className={styles.grade_num}>{selectedCount}점</span>
          <span className={styles.grade_req}>(필수)</span>
        </div>
      </div>
    </>
  );
};

const Grade = () => {
  return (
    <>
      <div className={styles.grade}>
        <Catfoot />
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
  const [selectedImage, setSelectedImage] = useState(null);

  // 이미지를 선택했을 때 호출되는 함수
  const handleImageChange = (e) => {
    const imageFile = e.target.files[0]; // 선택한 파일
    setSelectedImage(imageFile); // 선택한 파일을 상태에 저장
  };

  // 이미지 미리보기를 표시하는 함수
  const renderPreview = () => {
    if (selectedImage) {
      return <img src={URL.createObjectURL(selectedImage)} alt="preview" />;
    } else {
      return;
    }
  };

  return (
    <>
      <div className={styles.picture}>
        <Picture className={styles.select_pic}>
          <label htmlFor="file">
            <div>사진 선택</div>
          </label>
          <input
            id="file"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.input_pic}
          />
          {renderPreview()}
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
  const [textCount, setTextCount] = useState(0);
  const onTextHandler = (e) => {
    setTextCount(e.target.value.length);
  };

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
            maxLength="1000"
            onChange={onTextHandler}
            className={styles.textarea}
            placeholder="음식, 서비스, 분위기, 위생상태 등의 방문 경험을 적어주세요."
          />
          <div className={styles.wordcount}>
            <span>( {textCount} </span>
            <span>/ 1000자 )</span>
          </div>
        </TextBox>
      </div>
    </>
  );
};

const ReviewWritePage = () => {
  const { spotId } = useParams();
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

  const registerReview = async () => {
    return await axios.post(``, {});
  };

  return (
    <>
      <Header>
        <Link to={`/spotdetail/${spotId}`}>
          <Back>
            <img src={back} alt="back" />
          </Back>
        </Link>
        <SpotName />
        <Back></Back>
        <Back></Back>
      </Header>
      <div className={styles.grade}>
        <Grade />
      </div>
      <div className={styles.gap2} />
      <SelectPicture />
      <ReviewText />
      <Submit />
    </>
  );
};

export default ReviewWritePage;
