import { FaStar } from 'react-icons/fa';

export const renderStars = (grade, size) => {
  const totalStars = 3;
  const filledColor = "#A25353";
  const emptyColor = "#B3B3B3";

  const stars = [];
  for (let i = 0; i < totalStars; i++) {
    const color = i < grade ? filledColor : emptyColor;
    stars.push(
      <FaStar key={i} size={size} style={{ color }} />
    );
  }

  return stars;
};