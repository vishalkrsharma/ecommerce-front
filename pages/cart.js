import Button from '@/components/Button';
import { CartContext } from '@/components/CartContext';
import Input from '@/components/Input';
import Center from '@/components/Center';
import Header from '@/components/Header';
import Table from '@/components/Table';
import axios from 'axios';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import WhiteBox from '@/components/WhiteBox';

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  gap: 40px;
  margin-top: 40px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

export default function CartPage() {
  const { cartProducts, clearCart, addProduct, removeProduct, customerInfo, setCustomerInfo, saveCustomerInfo, deleteCustomerInfo } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    async function getProducts() {
      if (cartProducts.length > 0) {
        const res = await axios.post('/api/cart', { ids: cartProducts });
        const { data } = res;
        setProducts(data);
      } else {
        setProducts([]);
      }
    }
    getProducts();
  }, [cartProducts]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (window?.location.href.includes('success')) {
      setIsSuccess(true);
      clearCart();
    }
  }, [clearCart]);

  const lessOfThisProduct = (id) => {
    removeProduct(id);
  };

  const moreOfThisProduct = (id) => {
    addProduct(id);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  const goToPayment = async () => {
    const res = await axios.post('/api/checkout', {
      ...customerInfo,
      cartProducts,
    });
    const { data } = res;
    if (data.url) {
      window.location = data.url;
    }
  };

  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <WhiteBox>
              <h1>Order Successful</h1>
              <p>We will email when your order will be sent.</p>
            </WhiteBox>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <WhiteBox>
            <h2>Cart</h2>
            {!cartProducts?.length && <div>Your cart is empty</div>}
            {cartProducts?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <ProductInfoCell>
                        <ProductImageBox>{<Image src={product.images[0]} alt='image' height={100} width={100} />}</ProductImageBox>
                        {product.title}
                      </ProductInfoCell>
                      <td>
                        <Button onClick={() => lessOfThisProduct(product._id)}>-</Button>
                        {cartProducts.filter((id) => id === product._id).length}
                        <Button onClick={() => moreOfThisProduct(product._id)}>+</Button>
                      </td>
                      <td>Rs {product.price}</td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>Rs {total}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </WhiteBox>
          <WhiteBox>
            <h2>Order Information</h2>
            <Input type='text' placeholder='Name' value={customerInfo.name} name='name' onChange={(event) => handleChange(event)} />
            <Input type='text' placeholder='Email' value={customerInfo.email} name='email' onChange={(event) => handleChange(event)} />
            <CityHolder>
              <Input type='text' placeholder='City' value={customerInfo.city} name='city' onChange={(event) => handleChange(event)} />
              <Input type='text' placeholder='Postal Code' value={customerInfo.postalCode} name='postalCode' onChange={(event) => handleChange(event)} />
            </CityHolder>
            <Input type='text' placeholder='Street Address' value={customerInfo.streetAddress} name='streetAddress' onChange={(event) => handleChange(event)} />
            <Input type='text' placeholder='Country' value={customerInfo.country} name='country' onChange={(event) => handleChange(event)} />
            <Button black block mb onClick={saveCustomerInfo}>
              Save Information
            </Button>
            <Button black block mb onClick={deleteCustomerInfo}>
              Clear Information
            </Button>
            <Button black block mb onClick={goToPayment}>
              Continue to payment
            </Button>
          </WhiteBox>
        </ColumnsWrapper>
      </Center>
    </>
  );
}
