import styles from "./Footer.module.css";
import { useTheme } from "../hooks/useTheme";

const Footer = () => {
  const { theme } = useTheme()
  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }
  return (
    <footer>
      <div className={`styles.footerWrapper`}>
        <button className={`btn btn-danger ${styles.top}`} onClick={scrollToTop}>Voltar para o topo</button>
        <div className={`navbar-${theme} bg-${theme} ${styles.footer}`}>
          <div className="container">
            <div className={`row`}>
              <div className="col-sm-12 col-lg-6">
                <img className={`${styles.dhLogo} ${theme === 'dark' ? styles.dhLogoDark : ''}`} src="/images/DH.png" alt='DH-logo' />
              </div>
              <div className={`col-sm-12 col-lg-6 ${styles.icons} ${theme === 'dark' ? styles.iconsDark : ''}`}>
                <img src="/images/ico-facebook.png" alt="ícone do facebook" className={styles.icon} />
                <img src="/images/ico-instagram.png" alt="ícone do instagram" className={styles.icon} />
                <img src="/images/ico-whatsapp.png" alt="ícone do whatsapp" className={styles.icon} />
                <img src="/images/ico-tiktok.png" alt="ícone do tiktok" className={styles.icon} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer >
  )
}

export default Footer