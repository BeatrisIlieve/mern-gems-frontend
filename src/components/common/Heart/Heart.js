import { useCallback, memo, useMemo } from "react";

import { useWishlistContext } from "../../../contexts/WishlistContext";
import { useAuthenticationContext } from "../../../contexts/AuthenticationContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";

import styles from "./Heart.module.css";

export const Heart = memo(({ categoryId, colorId }) => {
  const { userId } = useAuthenticationContext();
  const { wishlistItems, add, remove } = useWishlistContext();

  const isLikedByUser = useMemo(() => {
    return wishlistItems.some(
      (item) => item.category._id === categoryId && item.color._id === colorId
    );
  }, [wishlistItems, categoryId, colorId]);

  const handleClick = useCallback(() => {
    if (isLikedByUser) {
      remove(categoryId, colorId, userId);
    } else {
      add(categoryId, colorId, userId);
    }
  }, [isLikedByUser, remove, categoryId, colorId, userId, add]);

  return (
    <FontAwesomeIcon
      data-testid={isLikedByUser ? "solid" : "regular"}
      icon={isLikedByUser ? solidHeart : regularHeart}
      className={styles["heart-icon"]}
      onClick={handleClick}
    />
  );
});
