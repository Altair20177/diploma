import "./walletModal.scss";

import { Crypt, TableTypes } from "../../../types";
import Table from "../../generic/table/Table";
import PieChart from "../pieChart/PieChart";
import Modal from "../../generic/Modal";
import { Dispatch, SetStateAction } from "react";
import WalletCard from "./WalletCard";
import WalletRemoveCrypt from "./WalletRemoveCrypt";

export interface WalletModalLayoutProps {
  walletData: Array<Crypt>;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    cryptToDelete: Crypt
  ) => void;
  deleteCrypt: () => void;
  deleteCryptRequest: (index: number) => void;
  error: boolean;
  requestToDelete: boolean;
  deleteAmount: string | number;
  cryptToDelete: Crypt | null;
  setDeleteCryptModalIsOpen: Dispatch<SetStateAction<boolean>>;
  deleteCryptModalIsOpen: boolean;
}

export default function WalletModalLayout({
  walletData,
  onChange,
  deleteCrypt,
  deleteCryptRequest,
  error,
  requestToDelete,
  deleteAmount,
  cryptToDelete,
  setDeleteCryptModalIsOpen,
  deleteCryptModalIsOpen,
}: WalletModalLayoutProps) {
  function createDataForTableWallet(walletData?: Array<Crypt>) {
    const data: { headers: string[]; lines: string[][] } = {
      headers: ["Name", "Amount", "Price", "Total Price", "Remove"],
      lines: [],
    };

    walletData &&
      walletData.forEach((crypt) => {
        const obj = {
          name: crypt.name,
          amount: String(Math.round(crypt.amount * 100000) / 100000),
          price: String((+crypt.price).toFixed(5)) + "$",
          totalPrice: String((crypt.amount * +crypt.price).toFixed(4)) + "$",
        };

        const arr: string[] = [...Object.values(obj)];
        data.lines.push(arr);
      });

    return data;
  }

  return (
    <>
      <Modal
        setIsPopupOpen={setDeleteCryptModalIsOpen}
        isPopupOpen={deleteCryptModalIsOpen}
      >
        <WalletRemoveCrypt
          error={error}
          cryptToDelete={cryptToDelete}
          deleteAmount={deleteAmount}
          onChange={onChange}
          deleteCrypt={deleteCrypt}
        />
      </Modal>
      {walletData.length === 0 ? (
        <p className="wallet__empty">Wallet is Empty</p>
      ) : (
        <div className="modal-body wallet">
          <Table
            type={TableTypes.table_wallet}
            headers={createDataForTableWallet().headers}
            lines={createDataForTableWallet(walletData).lines}
            onCustomClick={deleteCryptRequest}
            fontWeight="table_weight_normal"
            lineHeight="table_height_low"
          />
          {walletData?.length !== 0 ? (
            <div className="modal-pie">
              <PieChart data={walletData} />
            </div>
          ) : (
            <p className="wallet__empty">PieChart is Empty</p>
          )}
        </div>
      )}
      <WalletCard />
    </>
  );
}
