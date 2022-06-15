import { useContext } from "react";
import { AppContext, AppContextType } from "../../App";

const Details = () => {
  const { userData, handleChange } = useContext(AppContext) as AppContextType;

  return (
    <>
      <label htmlFor="address">Address</label>
      <input
        autoFocus
        placeholder="Address"
        type="text"
        id="address"
        className="border border-gray-300 rounded-md py-2 px-4 mb-4"
        value={userData?.address || ""}
        onChange={handleChange}
        name="address"
      />
      <label htmlFor="city">City</label>
      <input
        placeholder="City"
        type="city"
        id="city"
        minLength={4}
        required
        className="border border-gray-300 rounded-md py-2 px-4"
        value={userData?.city || ""}
        onChange={handleChange}
        name="city"
      />
    </>
  );
};

export default Details;
