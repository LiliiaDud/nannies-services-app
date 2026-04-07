import css from "./Hero.module.css";
import { Link } from "react-router-dom"

export default function Hero() {
  return (
    <section className={css.section_hero}>
      <div className={css.left_container}>
        <div className={css.left_inner}>
          <div className={css.left_text}>
            <h1 className={css.title}>Make Life Easier for the Family:</h1>
            <p className={css.text}>Find Babysitters Online for All Occasions</p>
          </div>
          <Link to="/nannies" className={css.button} aria-label="Go to nannies page">
            Get Started
            <svg className={css.btn_icon}>
              <use href="/sprite.svg#icon-arrow2"></use>
            </svg>
          </Link>
        </div>
      </div>

      <div className={css.right_container}>
        <div className={css.check_block}>
          <div className={css.check_icon}>
            <svg width={30} height={30} >
              <use href="/sprite.svg#icon-fe_check"></use>
            </svg>
          </div>
          <div className={css.check_text}>
            <p className={css.nannies_text}>Experienced nannies</p>
            <p className={css.number}>15,000</p>
          </div>
        </div>
      </div>
    </section>
  );
}