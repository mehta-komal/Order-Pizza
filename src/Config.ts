const Config = {
    apikeycart: process.env.REACT_APP_CART || "http://192.168.171.62:4001/cart",
    apikeydata: process.env.REACT_APP_DATA || "http://192.168.171.62:4001/data",
    apikeyuserdata: process.env.REACT_APP_USERDATA || "http://192.168.171.62:4001/Userdata",
    apikeyorder: process.env.REACT_APP_ORDER || "http://192.168.171.62:4001/Order",
  };
  
  export default Config;
  