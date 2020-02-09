import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import YouTube from "react-youtube";
import Production from "../../Components/Production";

const Container = styled.div`
  width: 80%;
  height: 55%;
`;

const TabMenu = styled.ul`
  display: flex;
  width: 100%;
  height: 15%;
`;

const TabItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  margin: 10px 0;
  font-size: 18px;
  border-bottom: ${props => (props.current === true ? "2px solid #fff" : "")};
  cursor: pointer;
`;

const TabContent = styled.div`
  width: 100%;
  height: 85%;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: ${props => (props.current ? "flex-start" : "center")};
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

const YouTubeBox = styled.div`
  margin: 10px 10px;
`;

const CompanyBox = styled.div`
  width: 300px;
  height: 300px;
  margin: 10px 10px;
`;

const Country = styled.div`
  font-size: 20px;
`;

const NotFound = styled.div`
  font-size: 20px;
`;

const opts = {
  height: "292",
  width: "480",
  playerVars: {
    autoplay: 0
  }
};

const DetailTab = ({
  youtube,
  collection,
  companies,
  countries,
  tabCurrent,
  handleClick
}) => (
  <Container>
    <TabMenu>
      <TabItem value={0} current={tabCurrent[0]} onClick={handleClick}>
        Trailer
      </TabItem>
      <TabItem value={1} current={tabCurrent[1]} onClick={handleClick}>
        Production Company
      </TabItem>
      <TabItem value={2} current={tabCurrent[2]} onClick={handleClick}>
        Countries
      </TabItem>
    </TabMenu>
    <TabContent current={tabCurrent[0] && youtube.results.length !== 0}>
      {tabCurrent[0] ? (
        youtube.results.length !== 0 ? (
          youtube.results.map(video => (
            <YouTubeBox key={video.id}>
              <YouTube videoId={video.key} opts={opts} />
            </YouTubeBox>
          ))
        ) : (
          <NotFound>Not Found</NotFound>
        )
      ) : tabCurrent[1] ? (
        companies &&
        companies.map(company => (
          <CompanyBox>
            <Production
              key={company.id}
              logo={company.logo_path}
              name={company.name}
              country={company.origin_country}
            />
          </CompanyBox>
        ))
      ) : (
        countries &&
        countries.map(country => (
          <Country key={country.iso_3166_1}>{country.name}</Country>
        ))
      )}
    </TabContent>
  </Container>
);

DetailTab.propTypes = {
  youtube: PropTypes.object,
  collection: PropTypes.array,
  companies: PropTypes.array,
  countries: PropTypes.array,
  tabCurrent: PropTypes.array,
  handleClick: PropTypes.func
};

export default DetailTab;
