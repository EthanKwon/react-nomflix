import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  font-size: 12px;
`;

const Image = styled.div`
  height: 70%;
  background-image: url(${props => props.bgUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  margin: 10px 0;
`;

const Name = styled.span`
  display: block;
`;

const Country = styled.span`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
`;

const Production = ({ id, logo, name, country }) => (
  <Container key={id}>
    <Image
      bgUrl={
        logo
          ? `https://image.tmdb.org/t/p/w300${logo}`
          : require("../assets/noimage.png")
      }
    />
    <Name>{name > 15 ? `${name.substring(0, 18)}...` : name}</Name>
    <Country>{country ? country : "Not Found"}</Country>
  </Container>
);

Production.propTypes = {
  id: PropTypes.number,
  logo: PropTypes.string,
  name: PropTypes.string,
  country: PropTypes.string
};

export default Production;
