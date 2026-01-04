import { FormWrapper } from "./FormWrapper";
import { Modal, Checkbox } from "antd";
import { useState } from "react";
import { CheckCircle } from "lucide-react";

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
  const [isConfirmed, setIsConfirmed] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setIsConfirmed(true);
    console.log("Order confirmed");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <FormWrapper title="Confirmation">
      <div className="space-y-4 mt-6 mx-10">
        <legend className="sr-only">Order Confirmation</legend>

        {/* Information Box */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
          <div className="flex gap-3">
            <CheckCircle className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
            <p className="text-black text-sm leading-relaxed">
              Review your details above. Accept the terms to proceed with your
              reservation.
            </p>
          </div>
        </div>

        {/* Terms Checkbox & Button in One Row */}
        <div className="flex items-center justify-between gap-4">
          <label
            htmlFor="confirmation"
            className="flex items-center gap-3 cursor-pointer flex-1"
          >
            <input
              id="confirmation"
              type="checkbox"
              name="confirmation"
              value="I Agree"
              checked={isConfirmed}
              onChange={(e) => setIsConfirmed(e.target.checked)}
              className="w-5 h-5 rounded border-2 border-white/40 checked:border-white checked:bg-blue-500 cursor-pointer transition-colors flex-shrink-0"
              required
              aria-label="Accept terms and conditions"
            />
            <span className="text-black text-sm">
              I agree to the{" "}
              <span className="font-semibold">terms and conditions</span>
            </span>
          </label>

          <button
            type="button"
            onClick={showModal}
            disabled={!isConfirmed}
            className="px-6 py-2.5 text-sm font-semibold bg-white text-blue-600 hover:bg-blue-50 disabled:bg-white/40 disabled:text-black/50 disabled:cursor-not-allowed rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex-shrink-0 whitespace-nowrap"
          >
            {isConfirmed ? "Confirm & Book" : "Accept to Continue"}
          </button>
        </div>

        {/* Confirmation Modal */}
        <Modal
          title="Confirm Your Booking"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Yes, Confirm"
          cancelText="Cancel"
          centered
          okButtonProps={{ className: "bg-blue-600 hover:bg-blue-700" }}
        >
          <div className="space-y-4 py-4">
            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
              <p className="text-gray-800 font-semibold mb-2">
                Final Confirmation
              </p>
              <p className="text-gray-700 text-sm">
                Your booking details have been reviewed. Click{" "}
                <span className="font-bold">"Yes, Confirm"</span> to complete
                your reservation.
              </p>
            </div>
            <p className="text-gray-600 text-xs">
              You will receive a confirmation email with your booking details
              and further instructions.
            </p>
          </div>
        </Modal>
      </div>
    </FormWrapper>
  );
}
