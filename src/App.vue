<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  body {
    background-color: #0a0c13;/*242327*/
    margin:0px;
    width:100%;
    height: 100%;
    /*overflow: scroll;*/
  }
  .el-menu-item.is-active {
    color: #409EFF !important;
    background-color: #3a3b3c !important;
  }
  .el-page-header__content {
    color: #3a8ee6;
  }
  .el-page-header__title {
    font-size: large;
    color: #3a8ee6;
  }
  .el-icon-back {
    color: #3a8ee6;
  }
  .el-icon-back:before {
    font-size: larger;
  }
  .el-page-header__left::after {
    background-color: #3a8ee6;
  }
  .el-row {
    margin-bottom: 20px;
  }
  .el-radio-button__inner {
    background-color: #242327;
    color: #3a8ee6;
    border: none;
  }
  .el-radio-button:first-child .el-radio-button__inner {
    border-left: 0;
  }
  .el-radio-button__orig-radio:checked+.el-radio-button__inner {
    color: #FFF;
    background-color: #4083e0;
    border-color: #4083e0;
    -webkit-box-shadow: -1px 0 0 0 #4083e0;
    box-shadow: -1px 0 0 0 #4083e0;
  }
  .el-date-range-picker__time-header {
    border-bottom: 3px solid #0d1f34;
  }
  .el-picker-panel {
    background-color: #000000;
    color: #c0c4cc;
    border-color: #0D1F34;
    border-width: 2px;
  }
  .el-picker-panel__icon-btn {
    color: #3a8ee6;
  }
  .el-picker-panel__footer {
    border-top: 1px solid #0D1F34;
    padding: 4px;
    text-align: right;
    background-color: #000000;
    position: relative;
    font-size: 0;
  }
  .el-date-range-picker__content.is-left {
    border-right: 1px solid #0D1F34;
  }
  .el-date-table th {
    color: #c0c4cc;
    border-bottom: solid 1px #c0c4cc;
  }
  .el-date-table td.available span:hover {
    color: white;
  }
  .el-date-table td.end-date span, .el-date-table td.start-date span {
    background-color: #0a0c13;
  }
  .el-date-table td.in-range div {
    background-color: #1b2c59;
  }
  .el-date-table td.in-range div:hover {
    background-color: #22356e;
  }
  .el-card__header {
    background-color: #09121b;/*#3c3f41;*/
    border-width: 0;
    border-color: #3198a2;
  }
  .chartGroup {
    /*width: 100%;*/
    display: flex;
    flex-direction: column;
    margin: 20px 0;
    background-color: #0a0c13;
    border-width: 2px;
    border-color: #09121b;
  }
  span {
    color: #3a8ee6;
  }
  .el-tabs {
    border-width: 0;
  }
  .el-tabs__active-bar.is-top {
    background-color: #0a0c13;
    width: -moz-calc(100% - 4px) !important;
    width: -webkit-calc(100% - 4px) !important;
    width: calc(100% - 4px) !important;
    border-style: solid;
    border-left-width: 2px;
    border-right-width: 2px;
    border-color: #3a8ee6;
    border-top: none;
    border-bottom: none;
  }
  .el-tabs__item {
    color: #3a8ee6;
    padding: 0 0;
  }
  .el-tabs__item.is-top {
    width: 100%;
    text-align: center;
  }
  .el-tabs__item.is-active {
    width: 100%;
    height: 100%;
    background: linear-gradient(to left, #3a8ee6, #3a8ee6) left top no-repeat,
                linear-gradient(to bottom, #3a8ee6, #3a8ee6) left top no-repeat,
                linear-gradient(to left, #3a8ee6, #3a8ee6) right top no-repeat,
                linear-gradient(to bottom, #3a8ee6, #3a8ee6) right top no-repeat,
                linear-gradient(to left, #3a8ee6, #3a8ee6) left bottom no-repeat,
                linear-gradient(to bottom, #3a8ee6, #3a8ee6) left bottom no-repeat,
                linear-gradient(to left, #3a8ee6, #3a8ee6) right bottom no-repeat,
                linear-gradient(to left, #3a8ee6, #3a8ee6) right bottom no-repeat;
    background-size: 2px 20px, 20px 2px, 2px 20px, 20px 2px;
  }
  .el-tabs__item::after {
    color: #3a8ee6;
    border-color: #0a0c13;
  }
  .el-tabs>.el-tabs__header {
    background-color: #0a0c13;
    border-color: #3a8ee6;
  }
  .el-tabs__nav-wrap::after {
    background-color: #3a8ee6;
  }
  .el-tabs__nav-wrap::before {
    background-color: #3a8ee6;
  }
  .el-tabs__nav.is-top {
    border-color: #3a8ee6;
  }
  .search .elInput {
    width: 50%;
    height: 40px;
    margin: 0 20px 20px 0;
  }
  .el-button {
    height: 40px;
    background: #0a0c13;
    border: 1px solid #122f5c;
  }
  .el-button--text {
    padding: 7px 15px;
    /*font-weight: bold;*/
  }
  .el-button:hover {
    height: 40px;
    background: #1a2032;
    border: 1px solid #122f5c;
  }
  .el-button:focus {
    background: #1a2032;
    border: 1px solid #122f5c;
  }
  .el-button.is-disabled.is-plain {
    background: #0a0c13;
    border: 1px solid #122f5c;
  }
  .el-button.is-disabled.is-plain:hover {
    background: #1a2032;
    border: 1px solid #122f5c;
  }
  .el-button.is-plain:hover {
    background: #1a2032;
    border: 1px solid #122f5c;
  }
  .el-input__inner {
    color: #3a8ee6;
    background-color: #242327;
  }
  .el-input > input {
    background-color: rgb(18, 47, 92);
    border-style: none;
  }
  .el-input.is-disabled .el-input__inner {
    background-color: #1a2032;
    border-style: none;
  }
  .el-input.readOnly .el-input__inner{
    color: #C0C4CC;
  }
  .el-range-editor {
    border: none;
  }
  .el-range-editor.is-active {
    border: none;
  }
  .el-range-editor.is-active:hover {
    border: none;
  }
  .el-range-editor .el-range-input {
    background-color: rgb(18, 47, 92);
    color: #3a8ee6;
  }
  .el-range-editor--small .el-range-separator {
    color: #f2f6fc;
  }
  .el-range-input {
    background-color: rgb(18, 47, 92);
    color: #3a8ee6;
  }
  .el-table {
    border-style: solid;
    border-color: rgb(18, 47, 92);
    border-width: 1px;
  }
  /*表头样式*/
  .el-table .el-table__header-wrapper tr th{
    background-color: rgb(18, 47, 92)!important;
    color: rgb(255, 255, 255);
  }
  /*每行样式*/
  .el-table .el-table__row{
    background-color: rgb(18, 47, 92);
    color: rgb(255, 255, 255);
  }
  /*hover每行的样式*/
  .el-table .el-table__body tr.current-row > td {
    background-color: #0D1F34 !important;
  }
  .el-table .el-table__body tr:hover > td {
    background-color: #0D1F34 !important;
  }
  /*每行边框的样式*/
  .el-table td,
  .el-table th.is-leaf{
    border-bottom: 1px solid #3a8ee6;
    border-right:1px solid #3a8ee6;
  }
  .el-table::before {
    background-color: #0a0c13;
  }
  .el-table__empty-block {
    background-color: #0D1F34;
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn {
    right: 0;
    top: 0;
  }
  .el-dialog__body {
    padding: 15px;
    border:2px solid #ddd;
    border-image: -webkit-radial-gradient(#2074af,#0a0c13) 2 2;
    border-image: -moz-radial-gradient(#2074af,#0a0c13) 2 2;
    border-image: radial-gradient(#2074af, #343c5d) 2 2;
    background-color: #0a0c13;
  }
</style>
