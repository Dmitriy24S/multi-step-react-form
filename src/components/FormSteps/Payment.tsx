import { useContext } from "react";
import { AppContext, AppContextType } from "../../App";

const Payment = () => {
  const { register, errors } = useContext(AppContext) as AppContextType;

  return (
    <>
      {/* Name on card */}
      <label htmlFor="cardname">Name on card</label>
      <input
        autoFocus
        placeholder="Name on card"
        type="text"
        id="cardname"
        name="cardname"
        className="border border-gray-300 rounded-md py-2 px-4 mb-4"
        {...register("cardname")}
      />
      {errors.cardname && (
        <p className="form-message mb-5 -mt-4">{errors.cardname?.message}</p>
      )}
      {/* Credit Card */}
      <label htmlFor="credit-card">Credit Card</label>
      <input
        placeholder="Credit Card #"
        type="creditcard"
        id="creditcard"
        name="creditcard"
        className="border border-gray-300 rounded-md py-2 px-4"
        {...register("creditcard")}
      />
      {errors.creditcard && (
        <p className="form-message mb-5">{errors.creditcard?.message}</p>
      )}
    </>
  );
};

export default Payment;
