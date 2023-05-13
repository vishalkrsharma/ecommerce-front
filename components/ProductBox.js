import Image from 'next/image';
import styled from 'styled-components';
import Button from './Button';
import { BiCart } from 'react-icons/bi';
import Link from 'next/link';
import { useContext } from 'react';
import { CartContext } from './CartContext';

const ProductWrapper = styled.div``;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 2rem;
  height: 8rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
`;

const Title = styled(Link)`
  font-weight: normal;
  margin: 0;
  color: inherit;
  text-decoration: none;
`;

const ProductInfoBox = styled.div`
  margin-top: 0.75rem;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: 400;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight: 600;
    text-align: left;
  }
`;

export default function ProductBox({ _id, title, description, price, images }) {
  const url = '/product/' + _id;

  const { addProduct } = useContext(CartContext);

  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <Image src={images[0]} alt='image' height={150} width={150} />
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>Rs {price}</Price>
          <Button primary outline size='sm' onClick={() => addProduct(_id)}>
            <BiCart />
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
