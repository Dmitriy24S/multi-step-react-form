import { useContext } from "react";
import { AppContext, AppContextType } from "../../App";

const Account = () => {
  const {
    // userData,
    // handleChange,
    register,
    // watch,
    errors,
  } = useContext(AppContext) as AppContextType;

  // console.log(watch("username"));

  return (
    <>
      {/* Username */}
      <label htmlFor="username">Username</label>
      <input
        autoFocus
        placeholder="Username"
        type="text"
        id="username"
        name="username"
        className="border border-gray-300 rounded-md py-2 px-4 mb-4"
        {...register("username")}
      />
      {errors.username && (
        <p className="form-message mb-5 -mt-4">{errors.username?.message}</p>
      )}
      {/* Password */}
      <label htmlFor="password">Password</label>
      <input
        placeholder="Password"
        type="password"
        id="password"
        name="password"
        className="border border-gray-300 rounded-md py-2 px-4"
        {...register("password")}
      />
      {errors.password && (
        <p className="form-message mb-5">{errors.password?.message}</p>
      )}
    </>
  );
};

export default Account;
