import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import YouTube from "react-youtube";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  filter: blur(2px);
  opacity: 0.5;
  z-index: -1;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${props => props.imageUrl});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const DataTop = styled.div``;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 2;
  width: 50%;
`;
const DataBottom = styled.div`
  width: 100%;
  height: 50%;
`;

const TapMenu = styled.ul`
  display: flex;
  width: 70%;
  height: 15%;
`;

const TapItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  margin: 10px 0;
  font-size: 18px;
  border-bottom: ${props => (props.current === true ? "2px solid #fff" : "")};
`;

let tapCurrent = [true, false, false];

const TapContent = styled.div`
  width: 100%;
  height: 85%;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  overflow: hidden;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    height: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(20, 20, 20, 0.8);
    transition: background-color 0.1s ease-in-out;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;

const YoutubeBox = styled.div`
  margin: 0 10px;
`;

const opts = {
  height: "292",
  width: "480",
  playerVars: {
    autoplay: 0
  }
};

const clickTapMenu = e => {
  e.preventDefault();
  tapCurrent = [false, false, false];
  tapCurrent[e.target.value] = true;
  console.log(tapCurrent);
};

const DetailPresenter = ({ result, error, loading }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading...</title>
      </Helmet>
      <Loader />
    </>
  ) : error ? (
    <Message />
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          - Nomflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          imageUrl={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noimage.png")
          }
        />
        <Data>
          <DataTop>
            <Title>
              {result.original_title
                ? result.original_title
                : result.original_name}
            </Title>
            <ItemContainer>
              <Item>
                {result.release_date
                  ? result.release_date.substring(0, 4)
                  : result.first_air_date.substring(0, 4)}
              </Item>
              <Divider>•</Divider>
              <Item>
                {result.runtime ? result.runtime : result.episode_run_time[0]}{" "}
                min
              </Item>
              <Divider>•</Divider>
              <Item>
                {result.genres &&
                  result.genres.map((genre, index) =>
                    index === result.genres.length - 1
                      ? genre.name
                      : `${genre.name} / `
                  )}
              </Item>
              <Divider>•</Divider>
              <Item></Item>
            </ItemContainer>
            <Overview>{result.overview}</Overview>
          </DataTop>
          <DataBottom>
            <TapMenu>
              <TapItem value={0} current={tapCurrent[0]} onClick={clickTapMenu}>
                Trailer
              </TapItem>
              <TapItem value={1} current={tapCurrent[1]} onClick={clickTapMenu}>
                Production Company
              </TapItem>
              <TapItem value={2} current={tapCurrent[2]} onClick={clickTapMenu}>
                Countries
              </TapItem>
            </TapMenu>
            <TapContent>
              {result.videos.results &&
                result.videos.results.map(video => (
                  <YoutubeBox key={video.id}>
                    <YouTube
                      videoId={video.key}
                      opts={opts}
                      className="Youtube"
                    />
                  </YoutubeBox>
                ))}
            </TapContent>
          </DataBottom>
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired
};

export default DetailPresenter;
