import { memo } from "react";

import { Title } from "./Title/Title";

import styles from "./DualTitleSection.module.css";

export const DualTitleSection = memo(({ firstTitle, secondTitle, variant }) => {
  return (
    <div className={styles["wrapper"]}>
      <Title title={firstTitle} variant={variant} />
      <Title title={secondTitle} variant={variant} />
    </div>
  );
});
