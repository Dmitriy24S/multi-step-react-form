import { useContext } from "react";
import { AppContext, AppContextType } from "../../App";

const Details = () => {
  const { register, errors } = useContext(AppContext) as AppContextType;

  return (
    <>
      {/* Address */}
      <label htmlFor="address">Address</label>
      <input
        autoFocus
        placeholder="Address"
        type="text"
        id="address"
        className="border border-gray-300 rounded-md py-2 px-4 mb-4"
        name="address"
        {...register("address")}
      />
      {errors.address && (
        <p className="form-message mb-5 -mt-4">{errors.address?.message}</p>
      )}
      {/* City */}
      <label htmlFor="city">City</label>
      <input
        placeholder="City"
        type="city"
        id="city"
        className="border border-gray-300 rounded-md py-2 px-4"
        name="city"
        {...register("city")}
      />
      {errors.city && (
        <p className="form-message mb-5">{errors.city?.message}</p>
      )}
    </>
  );
};

export default Details;
