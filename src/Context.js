import React, { useEffect, useState, useContext, createContext } from "react";
const crypto = createContext();
const Context = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);
  return (
    <crypto.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </crypto.Provider>
  );
};

export default Context;

export const CryptoState = () => {
  return useContext(crypto);
};
