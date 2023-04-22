import Image from 'next/image';
import Center from './Center';
import styled from 'styled-components';
import Button from './Button';
import { BiCart } from 'react-icons/bi';
import ButtonLink from './ButtonLink';

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 2.5rem;
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 1rem;
`;

const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 40px;

  img {
    scale: 1.25;
    margin-top: 10%;
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 0.75rem;
`;

export default function Featured({ product }) {
  return (
    <Bg>
      <Center>
        <ColumnWrapper>
          <Column>
            <div>
              <Title>{product.title}</Title>
              <Desc>{product.description}</Desc>
              <ButtonsWrapper>
                <ButtonLink href={`/products/${product.id}`} outline={1} white={1} size='l'>
                  Read More
                </ButtonLink>
                <Button primary size='l'>
                  <BiCart />
                  Add to Cart
                </Button>
              </ButtonsWrapper>
            </div>
          </Column>
          <Column>
            <Image src='/featured.png' alt='featured-img' width={264} height={156} />
          </Column>
        </ColumnWrapper>
      </Center>
    </Bg>
  );
}
