import styles from "./Store.module.css";
import { useEffect, useState } from "react";

const Store = ()=>{
    const [credits,setCredits]=useState(0)
    useEffect(()=>{
    requestCredits();
    },[])
    async function requestCredits(){
        const credit = await fetch('https://waste-management-app-fzkv.onrender.com/api/credits',{
          method:"GET",
          headers:{
          "authentication": sessionStorage.getItem("jwt")
          }
        });
        const json = await credit.json();
           setCredits(json);
           console.log(credits)
    }
    return( <div className={styles.collect5}>
        <div className={styles.background}>
          <div className={styles.background}>
            <div className={styles.backgroundChild} />
          </div>
          <b className={styles.zeroStore}>ZERO store</b>
          <b className={styles.coins}>coins</b>
          <div className={styles.available}>available</div>
          <div className={styles.redeemZeroCoinsContainer}>
            <span className={styles.redeemZero}>{`redeem Zero `}</span>
            <span className={styles.coinsForFor}>
              coins for for exciting products 
            </span>
            <span className={styles.redeemZero}> </span>
            <span className={styles.coinsForFor}>
              or discount vouchers!
            </span>
          </div>
          <img className={styles.section1Child} alt="" src="../vector-5.svg" />
          <div className={styles.section1Item} />
          <div className={styles.div}>{credits}</div>
          <div className={styles.rectangleParent}>
            <div className={styles.frameChild} />
            <img
              className={styles.frameItem}
              alt=""
              src="Rectangle 39.png"
            />
            <div className={styles.homeDecoreMadeContainer}>
              <span className={styles.redeemZero}>home decore (</span>
              <span className={styles.coinsForFor}>
                made up from waste glass bottle
              </span>
              <span className={styles.redeemZero}>)</span>
            </div>
            <div className={styles.redeemParent}>
              
              <div className={styles.div1}>600</div>
            </div>
          </div>
          <div className={styles.rectangleGroup}>
            <div className={styles.frameInner} />
            <img
              className={styles.frameItem}
              alt=""
              src="Rectangle 39 (1).png"
            />
            <div className={styles.homeDecoreMadeContainer}>
              <span className={styles.redeemZero}>home decore (</span>
              <span className={styles.coinsForFor}>
                made up from waste newspaper
              </span>
              <span className={styles.redeemZero}>)</span>
            </div>
            <div className={styles.redeemParent}>
              
              <div className={styles.div1}>500</div>
            </div>
          </div>
          <div className={styles.rectangleContainer}>
            <div className={styles.frameInner} />
            <div className={styles.frameChild} />
            <img
              className={styles.frameItem}
              alt=""
              src="Rectangle 39 (2).png"
            />
            <div className={styles.homeDecoreMadeContainer}>
            
              <span className={styles.redeemZero}>home decore (</span>
              <span className={styles.coinsForFor}>made up from waste</span>
              <span className={styles.redeemZero}>{` `}</span>
              <span className={styles.coinsForFor}>metal</span>
              <span className={styles.redeemZero}>)</span>
            </div>
            <div className={styles.redeemContainer}>
            
              <div className={styles.div1}>1200</div>
            </div>
          </div>
          <div className={styles.frameDiv}>
            <div className={styles.frameChild} />
            <img
              className={styles.frameItem}
              alt=""
              src="Rectangle 39 (3).png"
            />
            <div className={styles.homeDecoreMadeContainer3}>
              <span className={styles.redeemZero}>home decore (</span>
              <span className={styles.coinsForFor}>
                made up from waste plastic
              </span>
              <span className={styles.redeemZero}>)</span>
            </div>
            <div className={styles.redeemParent}>
              
              <div className={styles.div1}>200</div>
            </div>
          </div>
          <div className={styles.rectangleParent1}>
            <div className={styles.frameChild} />
            <img
              className={styles.frameItem}
              alt=""
              src="Rectangle 39 (4).png"
            />
            <div className={styles.homeDecoreMadeContainer}>
              <span className={styles.redeemZero}>home decore (</span>
              <span className={styles.coinsForFor}> made up from E-waste</span>
              <span className={styles.redeemZero}>)</span>
            </div>
            <div className={styles.redeemParent}>
              <div className={styles.div1}>800</div>
            </div>
          </div>
        </div>
      </div>
    )
}
export default Store;
