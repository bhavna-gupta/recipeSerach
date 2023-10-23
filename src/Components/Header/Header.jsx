import styles from "../Header/Header.module.css"
const Header=()=>{
  return (
    <div className={styles.nav}>
    <img src="/logo.png" style={{ height: "50px", width: "50px" , margin:"5px"}}/>
    <h1 className={styles.header}>Recipe-Search</h1>
    </div>
  );
};

export default Header;