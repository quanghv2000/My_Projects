import React from 'react';
import styles from './footer.module.scss';

export const UserFooterLayout: React.FC<any> = () => {
  return (
    <footer>
      <div className={`${styles.footerContent} container`}>
        <div className={`${styles.item} ${styles.link}`}>
          <h3 className={styles.footerTitle}>Liên kết</h3>
          <div className={`${styles.link}`}>
            <div className={styles.socials}>
              <img
                src="https://static.chotot.com/storage/default/facebook.svg"
                alt="Facebook"
              />
              <img
                src="https://static.chotot.com/storage/default/youtube.svg"
                alt="Youtobe"
              />
              <img
                src="https://static.chotot.com/storage/default/linkedin.svg"
                alt="Instagram"
              />
            </div>
            <div className={styles.certify}>
              <h3>Chứng nhận</h3>
              <img
                src="https://static.chotot.com/storage/default/certificate.webp"
                alt="Certify"
              />
            </div>
          </div>
        </div>
        <div className={`${styles.item}`}>
          <h3 className={styles.footerTitle}>Hỗ trợ khách hàng</h3>
          <div className={`${styles.support}`}>
            <a href="/">Trung tâm trợ giúp</a>
            <a href="/">An toàn mua bán</a>
            <a href="/">Quy định cần biết</a>
            <a href="/">Quy chế quyền riêng tư</a>
            <a href="/">Liên hệ hỗ trợ</a>
          </div>
        </div>
        <div className={`${styles.item}`}>
          <h3 className={styles.footerTitle}>Về My Project Study</h3>
          <div className={`${styles.about}`}>
            <a href="/">Giới thiệu</a>
            <a href="/">Tuyển dụng</a>
            <a href="/">Truyền thông</a>
            <a href="/">Blog</a>
          </div>
        </div>
        <div className={`${styles.item}`}>
          <h3 className={styles.footerTitle}>Tải ứng dụng My Project Study</h3>
          <div className={`${styles.downloadApp}`}>
            <div className={styles.qrCode}>
              <img
                src="https://static.chotot.com/storage/default/group-qr.webp"
                alt="qrCode"
              />
            </div>
            <div className={styles.appLogo}>
              <img
                src="https://static.chotot.com/storage/default/ios.svg"
                alt="App Store"
              />
              <img
                src="https://static.chotot.com/storage/default/android.svg"
                alt="Google play"
              />
              <img
                src="https://static.chotot.com/storage/default/huawei_app_install.webp"
                alt="AppGallery"
              />
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: 40 }}></div>
    </footer>
  );
};
