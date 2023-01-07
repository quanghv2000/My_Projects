import { createGlobalStyle } from 'styled-components';
// import { StyleConstants } from './StyleConstants';
/* istanbul ignore next */
export const GlobalStyle = createGlobalStyle`
html{
  margin-top:0;
  padding-top:0;
}
body{
  margin-top:0;
  padding-top:0;
}

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  
  p,
  label {
    line-height: 1.5em;
  }

  input, select, button {
    font-family: inherit;
    font-size: inherit;
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
  }

  .flex{
    display:flex;
  }

  .justify-between{
    justify-content: space-between;
  }

  center{
    justify-content:center;
    align-items: center;
  }

  .mt-5 {
    margin-top:5px;
  }
  .mr-5 {
    margin-right:5px;
  }
  .ml-5 {
    margin-left:5px;
  }
  .mb-5 {
    margin-bottom:5px;
  }

  .mt-10 {
    margin-top: 10px;
  }
  .mr-10 {
    margin-right:10px;
  }
  .ml-10{
    margin-left:10px;
  }
  .mb-10 {
    margin-bottom:10px;
  }

  .mr-20 {
    margin-right:20px;
  }

  .ml-20{
    margin-left:20px;
  }

  .mb-20 {
    margin-bottom:20px;
  }

  .mb-40{
    margin-bottom:40px;
  }

  .mr-30 {
    margin-right:30px;
  }

  .mt-50 {
    margin-top: 50px;
  }
  .mr-50 {
    margin-right:50px;
  }
  .ml-50{
    margin-left:50px;
  }
  .mb-50 {
    margin-bottom:50px;
  }

  pt-50 {
    padding-top: 50px;
  }

  .bold {
    font-weight: bold;
  }

  .size-10{
    font-size: 10pxv
  }

  .size-15{
    font-size: 15pxv
  }
  height-10 {
    height: 10px;
  }

  height-20 {
    height: 20pxv
  }

  .size-20{
    font-size: 20px;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .hidden {
    display: none;
  }

  .color-error {
    color: #ff4d4f;
  }

  .color-success {
    color: #73d13d;
  }

  .table-cursor-pointer-row .ant-table-row {
    cursor : pointer;
  }
  .container {
    position:relative;
    margin-left:auto;
    margin-right:auto;
    padding-right:15px;
    padding-left:15px
  }
  @media (min-width: 476px){
    .container{
      padding-right:15px;
      padding-left:15px
    }
  }
  @media (min-width: 768px){
    .container{
      padding-right:15px;
      padding-left:15px
    }
  }
  @media (min-width: 992px){
    .container{
      padding-right:15px;
      padding-left:15px
    }
  }
  @media (min-width: 1200px){
    .container{
      padding-right:15px;
      padding-left:15px
    }
  }
  @media (min-width: 476px){
    .container{
      width:100%
    }
  }
  @media (min-width: 768px){
    .container{
      width:720px;
      max-width:100%
    }
  }
  @media (min-width: 992px){
    .container{
      width:960px;
      max-width:100%
    }
  }
  @media (min-width: 1200px){
    .container{
      width:1140px;
      max-width:100%
    }
  }
  @media (min-width: 1400px){
    .container{
      width:1340px;
      max-width:100%
    }
  }
`;
