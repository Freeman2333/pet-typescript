import React, { useContext, useMemo, useCallback, useEffect } from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { MetaMaskContext } from "../../utils/metamask";
import { Invoice } from "../../redux/invoice/invoice.types";
import { getCurrency } from "../../redux/currency/currency.actions";
import {
  selectCurrencyList,
  selectCurrencyFetching
} from "../../redux/currency/currency.selectors";

interface PayWithMetamaskProps {
  invoice: Invoice;
}

export const PayWithMetamask: React.FC<PayWithMetamaskProps> = ({
  invoice
}) => {
  const dispatch = useDispatch();
  const currencyList = useSelector(selectCurrencyList);
  const isCurrencyFetching = useSelector(selectCurrencyFetching);

  useEffect(() => {
    dispatch(getCurrency());
  }, []);

  const { web3, accounts, error, awaiting, openMetaMask } = useContext(
    MetaMaskContext
  );

  //
  const leftToPay = useMemo(() => {
    const ethCoinIndex = currencyList.findIndex(cl => cl.coin === "ETH");

    if (ethCoinIndex < 0) {
      return null;
    }

    return (invoice.total - invoice.paid) / currencyList[ethCoinIndex].value;
  }, [invoice, currencyList]);

  const payHandler = useCallback(() => {
    web3.eth.sendTransaction({
      from: accounts[0],
      to: "0xf8E242fAceF371789C7e6416300D842Fc88eE433",
      value: web3.utils.toWei(leftToPay!.toString())
    });
  }, [accounts, leftToPay]);

  const renderButton = useMemo(() => {
    if (error && error.message === "MetaMask not installed") {
      return (
        <Button
          href="https://metamask.io/"
          target="_blank"
          rel="noopener noreferrer"
          type="primary"
        >
          Install MetaMask
        </Button>
      );
    } else if (error && error.message === "User denied account authorization") {
      return (
        <Button type="primary" onClick={openMetaMask}>
          Please allow MetaMask to connect.
        </Button>
      );
    } else if (error && error.message === "MetaMask is locked") {
      return (
        <Button type="primary" onClick={openMetaMask}>
          Please allow MetaMask to connect.
        </Button>
      );
    } else if (error) {
      return (
        <Button type="primary" onClick={openMetaMask}>
          UNHANDLED ERROR: {error.message}
        </Button>
      );
    } else if (!web3 && awaiting) {
      return (
        <Button type="primary" onClick={openMetaMask}>
          MetaMask is loading...
        </Button>
      );
    } else if (!web3) {
      return (
        <Button type="primary" onClick={openMetaMask}>
          Please open and allow MetaMask
        </Button>
      );
    } else if (accounts.length === 0) {
      return <Button type="primary">No Wallet 🦊</Button>;
    } else if (isCurrencyFetching || !leftToPay) {
      console.log(isCurrencyFetching);
      console.log(!leftToPay);
      console.log(leftToPay);
      return (
        <Button type="primary" loading disabled>
          Loading exchange rates
        </Button>
      );
    } else {
      return (
        <Button type="primary" onClick={payHandler}>
          Pay: {leftToPay} ETH
        </Button>
      );
    }
  }, [
    web3,
    accounts,
    error,
    awaiting,
    payHandler,
    isCurrencyFetching,
    leftToPay
  ]);

  return renderButton;
};
