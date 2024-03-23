import React, { useState, useEffect } from "react";
import logo_mukat from "../Img/logo_mukat.svg";
import styled from "styled-components";
import "../css/mainpage.css";
import point from "../Img/point.svg";
import mukat from "../Img/mukat.svg";
import logo_mukatlist from "../Img/logo_mukatlist.svg";
import { Link } from "react-router-dom";
import all from "../Img/전체.svg";
import bar from "../Img/술집.svg";
import cafe_dessert from "../Img/카페_디저트.svg";
import korean from "../Img/한식.svg";
import chinese from "../Img/중식.svg";
import western from "../Img/양식.svg";
import japanese from "../Img/일식.svg";
import bunsik from "../Img/분식.svg";
import etc from "../Img/기타.svg";
import axios from "axios";
import { useNavigate, useParams, useHistory } from "react-router-dom";

const Logo = styled.a`
  padding: 10px;
  margin-right: auto;
  margin-left: 10px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  height: 40px;
  background-color: none;
  box-shadow: 0 3px 3px #f1f1f1;
  align-items: center;
  justify-content: center;
`;

const Point = styled.a`
  padding-top: 3px;
  margin-left: auto;
  margin-right: 10px;
`;

const Wrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Univ = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  width: calc(100%-30px);
  margin: 15px;
  height: 180px;
  border: solid #fff3ef 5px;
  border-radius: 2rem;
`;

const UnivName = styled.div`
  display: flex;
  margin-top: 15px;
  height: 20px;
  background-color: #fe6a38;
  width: 120px;
  border: none;
  border-radius: 2rem;
  color: white;
  text-align: center;
  font-size: 10px;
  align-items: center;
  justify-content: center;
`;

const CategoryImage = styled.div`
  border: solid #fff3ef 5px;
  width: 70px;
  height: 70px;
  margin: auto;
  margin-bottom: 8px;
  border-radius: 1rem;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const Category = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/spotlist/${category}`);
  };

  return (
    <>
      <table className="category">
        <tbody>
          <tr>
            <td height="20px">
              <div
                className="categorybutton"
                onClick={() => handleCategoryClick("전체")}
              >
                <CategoryImage>
                  <img width="45px" src={all} alt="all" />
                </CategoryImage>
                <div>전체</div>
              </div>
            </td>
            <td>
              <div
                className="categorybutton"
                onClick={() => handleCategoryClick("술집")}
              >
                <CategoryImage>
                  <img width="35px" src={bar} alt="bar" />
                </CategoryImage>
                <div>술집</div>
              </div>
            </td>
            <td>
              <div
                className="categorybutton"
                onClick={() => handleCategoryClick("카페&디저트")}
              >
                <CategoryImage>
                  <img
                    width="40px"
                    style={{ marginLeft: "2px" }}
                    src={cafe_dessert}
                    alt="cafe_dessert"
                  />
                </CategoryImage>
                <div>카페&디저트</div>
              </div>
            </td>
          </tr>
          <tr>
            <td height="20px">
              <div
                className="categorybutton"
                onClick={() => handleCategoryClick("한식")}
              >
                <CategoryImage>
                  <img width="40px" src={korean} alt="korean" />
                </CategoryImage>
                <div>한식</div>
              </div>
            </td>
            <td>
              <div
                className="categorybutton"
                onClick={() => handleCategoryClick("중식")}
              >
                <CategoryImage>
                  <img width="100px" src={chinese} alt="chinese" />
                </CategoryImage>
                <div>중식</div>
              </div>
            </td>
            <td>
              <div
                className="categorybutton"
                onClick={() => handleCategoryClick("양식")}
              >
                <CategoryImage>
                  <img width="40px" src={western} alt="western" />
                </CategoryImage>
                <div>양식</div>
              </div>
            </td>
          </tr>
          <tr>
            <td height="20px">
              <div
                className="categorybutton"
                onClick={() => handleCategoryClick("일식")}
              >
                <CategoryImage>
                  <img width="40px" src={japanese} alt="japanese" />
                </CategoryImage>
                <div>일식</div>
              </div>
            </td>
            <td>
              <div
                className="categorybutton"
                onClick={() => handleCategoryClick("분식")}
              >
                <CategoryImage>
                  <img width="20px" src={bunsik} alt="bunsik" />
                </CategoryImage>
                <div>분식</div>
              </div>
            </td>
            <td>
              <div
                className="categorybutton"
                onClick={() => handleCategoryClick("기타")}
              >
                <CategoryImage>
                  <img width="45px" src={etc} alt="etc" />
                </CategoryImage>
                <div>기타</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

const MainPage = () => {
  const SearchBar = () => {
    const [search, setSearch] = useState("");
    const onChange = (e) => {
      setSearch(e.target.value);
    };

    const [spots, setSpots] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          // 요청이 시작 할 때에는 error 와 users 를 초기화하고
          setError(null);
          // loading 상태를 true 로 바꿉니다.
          setLoading(true);
          const response = await axios.get(
            `http://43.203.208.221:8079/api/restaurant/${search}`
          );
          console.log(response);
          setSpots(response.data); // 데이터는 response.data 안에 들어있습니다.
        } catch (e) {
          setError(e);
        }
        setLoading(false);
      };

      fetchUsers();
    }, []);

    // 검색어와 일치하는 맛집만 필터링
    const filteredSpots = spots
      ? spots.filter((spot) => {
          return spot.title.toLowerCase().includes(search.toLowerCase());
        })
      : [];

    const handleSubmit = (e) => {
      e.preventDefault();
    };

    return (
      <div onSubmit={handleSubmit}>
        <input
          className="mainsearchbar"
          type="search"
          value={search}
          onChange={onChange}
          placeholder="음식점을 입력해주세요"
        />
        {/* 맛집 목록 출력 */}
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div></div>
        ) : (
          <ul>
            {filteredSpots.map((spot, index) => (
              <li key={index}>{spot.title}</li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <>
      <div style={{ flex: "1" }}>
        <Header>
          <Logo to="..">
            <img src={logo_mukat} alt="logo" />
          </Logo>
          <SearchBar />
          <Point>
            <img src={point} width="25px" alt="point" />
          </Point>
        </Header>
        <Wrapper>
          <Univ>
            <img width="50px" src={mukat} alt="mukat" />
            <img width="100px" src={logo_mukatlist} alt="logo_mukatlist" />
            <UnivName>구름대학교</UnivName> {/* api */}
          </Univ>
        </Wrapper>
        <Category />
      </div>
    </>
  );
};

export default MainPage;
