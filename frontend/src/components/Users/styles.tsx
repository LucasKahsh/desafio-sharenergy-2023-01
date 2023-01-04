import styled from "styled-components";

export const Row = styled.div`
  margin: 0 -5px;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
`;

export const Column = styled.div`
float: left;
width: auto;
padding: 10px 10px 10px 10px;
@media screen and (max-width: 600px) {
  .column {
    width: 100%;
    display: block;
    margin-bottom: 20px;
  }
`;
