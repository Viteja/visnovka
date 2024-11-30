import React from "react";

const ImageIcons = ({ id }) => {
  // Dynamická cesta k obrázku
  const imagePath = `img/icon${id}.png`;

  return (
    <div>
      <img src={imagePath} alt={`Obrázek ${id}`} />
    </div>
  );
};

export default ImageIcons;
