import { Collection } from "./Collection/Collection";

import styles from "./HeroBanner.module.css";

export const HeroBanner = () => {
  return (
    <section id={styles["hero-banner"]}>
      <Collection />
    </section>
  );
};
