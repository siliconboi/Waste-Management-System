import styles from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
const Header =()=>{

  let navigate = useNavigate(); 

  const changeRoutes = ()=>{
    let path = `/signup`; 
    navigate(path);
    }
  const changeRouteb = ()=>{
    let path = `/store`; 
    navigate(path);
    }

    return(
        <div className={styles.header}>
        <div
          className={styles.navBar}
        ><ul><li><Link to="/">Home</Link></li><li><Link to="/collect">Collect</Link></li></ul></div>
        <img
          className={styles.copyOfAbstractModernMobile}
          alt=""
          src="logo.png"
        />

        <button className={styles.button1}>
          <div className={styles.signUp} onClick={changeRoutes}>sign up</div>
        </button>
        <button className={styles.button2}>
          <div className={styles.signUp1} onClick={changeRouteb}>Check Store</div>
        </button>

      </div>
    )
}

export default Header;
