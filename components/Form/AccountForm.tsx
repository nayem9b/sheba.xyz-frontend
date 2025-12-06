import { FormWrapper } from "./FormWrapper";
import { Modal } from "antd";
import { useState } from "react";

type AccountData = {
  email: string;
  password: string;
};

type AccountFormProps = AccountData & {
  updateFields: (fields: Partial<AccountData>) => void;
};

export function AccountForm({
  email,
  password,
  updateFields,
}: AccountFormProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    // Logic to confirm the order
    console.log("Order confirmed");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <FormWrapper title="Confirmation">
      <div className="flex justify-center">
     
        <div className="flex justify-center">
          <button
            type="button"
            onClick={showModal}
            className="rounded-lg text-lg border-gray-200 p-4 pe-12 shadow-sm bg-blue-500 text-white hover:bg-blue-600 transition-all"
          >
            Confirm Order
          </button>
        </div>
        <Modal
          title="Confirm Your Order"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="I Agree"
          cancelText="Cancel"
        >
          <p>
            Click on <span className="text-blue-500">I Agree</span> to confirm your
            booking
          </p>
        </Modal>
      </div>
    </FormWrapper>
  );
}
