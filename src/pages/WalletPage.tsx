import { useState } from "react";
import styled from "styled-components";
import checkInputSymbol from "../components/generic/checkInputSymbol";
import WalletModalLayout from "../components/header/wallet/WalletModalLayout";
import { useAppDispatch, useAppSelector } from "../hooks";
import { deleteCryptFromWallet } from "../lib/actions/walletActions";
import { Crypt } from "../types";

export default function WalletPage() {
  const walletData = useAppSelector((state) => state.walletPage);
  const dispatch = useAppDispatch();

  const [deleteCryptModalIsOpen, setDeleteCryptModalIsOpen] =
    useState<boolean>(false);
  const [requestToDelete, setRequestToDelete] = useState<boolean>(false);
  const [deleteAmount, setDeleteAmount] = useState<string>("");
  const [cryptToDelete, setCryptToDelete] = useState<Crypt>(walletData[0]);
  const [error, setError] = useState<boolean>(false);

  function deleteCryptRequest(index: number) {
    setRequestToDelete(true);
    const arrCrypt: Array<Crypt> = walletData.slice(index, index + 1);
    setCryptToDelete(arrCrypt[0]);
    setDeleteCryptModalIsOpen(true);
  }

  function deleteCrypt() {
    setDeleteCryptModalIsOpen(false);
    setError(deleteAmount === "" ? true : false);

    let indexToDelete = null;

    if (!error && deleteAmount !== "") {
      const obj = {
        ...cryptToDelete,
        amountToDelete: +deleteAmount,
      };

      dispatch(deleteCryptFromWallet(obj));
      setDeleteAmount("");

      const correctWallet = JSON.parse(String(localStorage.getItem("wallet")));
      cryptToDelete &&
        correctWallet.forEach((item: Crypt, index: number) => {
          if (item.id === cryptToDelete.id) {
            if (Number(deleteAmount) >= item.amount) indexToDelete = index;
            else item.amount -= Number(deleteAmount);

            item.amount = +item.amount.toFixed(5);
          }
        });

      if (indexToDelete !== null) {
        correctWallet.splice(indexToDelete, 1);
        setRequestToDelete(false);
      }
      localStorage.setItem("wallet", JSON.stringify(correctWallet));

      obj.amount -= +deleteAmount;
      setCryptToDelete(obj);
    }
  }

  const sum = walletData.reduce(
    (prev: number, curr: Crypt) => prev + curr.amount * Number(curr.price),
    0
  );

  const diff = walletData.reduce(
    (prev: number, curr: Crypt) =>
      prev + curr.amount * Number(curr.price) * Number(curr.change) * 0.01,
    0
  );

  function getWalletData() {
    const totalBalance = Math.floor(sum * 100) / 100;
    const diffUSD = Math.floor(diff * 100) / 100;
    const diffPerc = sum !== 0 ? Math.floor((diff / sum) * 10000) / 100 : 0;

    return { totalBalance, diffUSD, diffPerc };
  }

  function onChange(
    e: React.ChangeEvent<HTMLInputElement>,
    cryptToDelete: Crypt
  ) {
    if (
      !checkInputSymbol(e.target.value) ||
      cryptToDelete.amount < +e.target.value
    ) {
      return null;
    }

    setDeleteAmount(e.target.value);
    setError(e.target.value === "" ? true : false);
  }

  return (
    <Wrapper>
      <Title>Your Wallet</Title>
      <BalanceAbout alignCenter>
        Available balance: <span>0</span> USD
      </BalanceAbout>
      <Balance>
        <BalanceAbout>
          Total: <span> {getWalletData().totalBalance}</span> USDT
        </BalanceAbout>
        <BalanceAbout>
          Difference USD: <span>{getWalletData().diffUSD}</span> $
        </BalanceAbout>
        <BalanceAbout>
          Difference percantage: <span>{getWalletData().diffPerc}</span> %
        </BalanceAbout>
      </Balance>

      <WalletModalLayout
        walletData={walletData}
        onChange={onChange}
        error={error}
        deleteCrypt={deleteCrypt}
        deleteCryptRequest={deleteCryptRequest}
        requestToDelete={requestToDelete}
        deleteAmount={deleteAmount}
        cryptToDelete={cryptToDelete}
        deleteCryptModalIsOpen={deleteCryptModalIsOpen}
        setDeleteCryptModalIsOpen={setDeleteCryptModalIsOpen}
      />
    </Wrapper>
  );
}

const Title = styled.p`
  font-size: 28px;
  margin: 50px 0 30px;
  text-align: center;
  font-weight: 600;
`;

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const BalanceAbout = styled.p<{ alignCenter?: boolean }>`
  padding-top: 3px;
  font-size: 18px;
  letter-spacing: 1px;

  ${(p) => p.alignCenter && "text-align: center;"}

  span {
    font-weight: 600;
  }
`;

const Balance = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 30px auto 50px;
`;
