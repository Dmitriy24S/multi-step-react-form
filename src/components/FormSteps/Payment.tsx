import { useContext } from "react";
import { AppContext, AppContextType } from "../../App";

const Payment = () => {
  const { userData, handleChange } = useContext(AppContext) as AppContextType;

  return (
    <>
      <label htmlFor="cardname">Name on card</label>
      <input
        autoFocus
        placeholder="Name on card"
        type="text"
        id="cardname"
        className="border border-gray-300 rounded-md py-2 px-4 mb-4"
        value={userData?.cardname || ""}
        onChange={handleChange}
        name="cardname"
      />
      <label htmlFor="credit-card">Credit Card</label>
      <input
        placeholder="Credit Card #"
        type="creditcard"
        id="creditcard"
        minLength={4}
        required
        className="border border-gray-300 rounded-md py-2 px-4"
        value={userData?.creditcard || ""}
        onChange={handleChange}
        name="creditcard"
      />
    </>
  );
};

export default Payment;
