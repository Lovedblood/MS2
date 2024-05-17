const year = new Date().getFullYear();
const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer__bottom">
        <div className="container">
          <p>Porsche - © {year}. ALL RIGHTS *should be* RESERVED.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
