import { CategoryCard } from "./CategoryCard/CategoryCard";

import { INITIAL_CATEGORY_CARD_VALUES } from "../../../constants/initialCategoryCardValues";

import styles from "./CollectionList.module.css";

export const CollectionList = () => {
  return (
    <section id={styles["collection-list"]}>
      {Object.entries(INITIAL_CATEGORY_CARD_VALUES).map(
        ([categoryTitle, colorTitle]) => (
          <CategoryCard
            key={categoryTitle}
            categoryTitle={categoryTitle}
            colorTitle={colorTitle}
          />
        )
      )}
    </section>
  );
};
