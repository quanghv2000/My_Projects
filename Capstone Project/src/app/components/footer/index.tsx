import React from 'react';
import { Row, Col } from 'antd';
import './style.scss';
import { Link } from 'react-router-dom';

export const Footer: React.FC<any> = () => {
  return (
    <footer id="footer" className="dark">
      <div className="footer-wrap">
        <Row>
          <Col md={6} sm={24} xs={24} className="footer__response">
            <div className="footer-center">
              <h2>Hola Houses</h2>
              <div>
                <a
                  target="_blank "
                  href="https://www.facebook.com/"
                  className="titile__footer"
                >
                  Messenger
                </a>
              </div>
              <div>
                <a href="tel:0914768598" className="titile__footer">
                  Call center
                </a>
              </div>
            </div>
          </Col>
          <Col md={6} sm={24} xs={24} className="footer__response">
            <div className="footer-center">
              <h2>Khám phá địa điểm</h2>
              <div>
                <Link className="titile__footer" to="/suggesstion?type=map">
                  Theo bản đồ
                </Link>
              </div>
              <div>
                <Link className="titile__footer" to="/suggesstion?type=list">
                  Theo danh sách
                </Link>
              </div>
              <div></div>
            </div>
          </Col>
          <Col md={6} sm={24} xs={24} className="footer__response">
            <div className="footer-center">
              <h2>Loại hình</h2>
              <div>
                <Link className="titile__footer" to="/suggesstion?roomType=1">
                  Phòng ngủ chung
                </Link>
              </div>
              <div>
                <Link className="titile__footer" to="/suggesstion?roomType=3">
                  Phòng gác lửng
                </Link>
              </div>
              <div>
                <Link className="titile__footer" to="/suggesstion?roomType=2">
                  Phòng đơn
                </Link>
              </div>
              <div>
                <Link className="titile__footer" to="/suggesstion?roomType=4">
                  Ký túc xá
                </Link>
              </div>
            </div>
          </Col>
          <Col md={6} sm={24} xs={24} className="footer__response">
            <div className="footer-center">
              <h2>
                <img
                  className="title-icon mr-10"
                  src="https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg"
                  alt="AFX Cloud"
                />
                Hỗ trợ
              </h2>
              <div>
                <a href="tel:0914768598" className="titile__footer">
                  0914768598
                </a>
              </div>
              <div>
                <a
                  target="_blank "
                  href="mailto:holahousesvn@gmail.com"
                  className="titile__footer"
                >
                  holahousesvn@gmail.com
                </a>
              </div>
              <div>
                <a
                  target="_blank "
                  href="https://drive.google.com/file/d/1aWnHu1TxjZGsrq6ucu_HSRsJdPWuS1VG/view"
                  className="titile__footer"
                >
                  Điều khoản và điều kiện
                </a>
              </div>
              <div>
                <a
                  target="_blank "
                  href="https://drive.google.com/file/d/1OcOdpqhfgTR3gm5S2zwCKVJzlAVCWqG9/view"
                  className="titile__footer"
                >
                  Chính sách Bảo mật
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="bottom-bar">
        Copyright © HOLA - 2022 All Rights Reserved
      </div>
    </footer>
  );
};
