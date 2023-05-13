import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';

const ImageButtons = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const ImageButton = styled(Image)`
  border: 1px solid #aaa;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
`;

export default function ProductImages({ images }) {
  const [index, setIndex] = useState(0);
  return (
    <>
      <Image src={images[index]} alt='image' width={250} height={250} />
      <ImageButtons>
        {images.map((image, idx) => (
          <div key={idx}>
            <ImageButton src={image} alt='image' width={50} height={50} onClick={() => setIndex(idx)} />
          </div>
        ))}
      </ImageButtons>
    </>
  );
}
