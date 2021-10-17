import React from "react";
import logo from '../logo.svg'
import './AboutUs.scss'

const Content = () => {

  return (
    <div className="about-us">
      <div className="container">
        <div className="branding">
          <div className="image"><img src={logo} alt=""/></div>
          <div className="logo">イエメシ</div>
        </div>

        <p>イエメシはテイクアウトに対応しているお店を紹介するためのアプリで、<a href="https://github.com/iemeshi/app">オープンソース</a>で開発されています。</p>
        <p>掲載されている店舗は、コミュニティのみなさんによってメンテナンスされています。</p>

      </div>
    </div>
  );
};

export default Content;
