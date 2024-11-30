import React from "react";

const ImageComponent = ({ id }) => {
  // Dynamická cesta k obrázku
  const imagePath = `img/card${id}.webp`;

  return (
    <div>
      <img src={imagePath} alt={`Obrázek ${id}`} />
    </div>
  );
};

export default ImageComponent;
