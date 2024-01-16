import React, { useContext } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import Config from '../../Config';
import { Button } from '@mui/material';
import { Acontext } from '../../App';

interface AddToCartButtonProps {
  user: any;
  variety: any;
  setCartItems: React.Dispatch<React.SetStateAction<any>>; 
  quantity: number;
  disabled: boolean;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ user, variety, setCartItems, quantity }) => {
  const { isLogin, cartItems } = useContext(Acontext);
  
  const handleAddToCart = () => {
    const generatedUuid = uuidv4();
    const truncatedUuid = generatedUuid.slice(0, 5);
    const usercart = { id: truncatedUuid, userid: user.id, ...variety, quantity };

    const existingItem = cartItems.find((item: { name: any; userid: any; }) => item.name === variety.name && item.userid === user.id);

    if (existingItem) {
      const updatedCartItems = cartItems.map((item: { name: any; userid: any; quantity: number; }) => {
        if (item.name === variety.name && item.userid === user.id) {
          return {
            ...item,
            quantity: item.quantity + quantity
          };
        }
        return item;
      });
      
      setCartItems(updatedCartItems);
      toast.success('Quantity increased in the Cart');

      axios.patch(`${Config.apikeycart}/${existingItem.id}`, { quantity: existingItem.quantity + quantity })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios.post(Config.apikeycart, usercart)
        .then((res) => {
          console.log(res);
          toast.success('Product Added to Cart');
        })
        .catch((error) => {
          console.log(error);
          toast.error('Please Try Again');
        });

      setCartItems((prevCartItems: any) => [...prevCartItems, usercart]);
    }
  };

  return (
    <Button
      variant="outlined"
      color="primary"
      className="add-to-cart-button my-2 mx-2"
      onClick={handleAddToCart}
      disabled={!isLogin}
    >
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
