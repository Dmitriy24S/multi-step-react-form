import { useContext } from "react";
import { AppContext, AppContextType } from "../../App";

const Account = () => {
  const { userData, handleChange } = useContext(AppContext) as AppContextType;

  return (
    <>
      <label htmlFor="username">Username</label>
      <input
        autoFocus
        placeholder="Username"
        type="text"
        id="username"
        className="border border-gray-300 rounded-md py-2 px-4 mb-4"
        value={userData?.username || ""}
        onChange={handleChange}
        name="username"
      />
      <label htmlFor="password">Password</label>
      <input
        placeholder="Password"
        type="password"
        id="password"
        minLength={4}
        required
        className="border border-gray-300 rounded-md py-2 px-4"
        value={userData?.password || ""}
        onChange={handleChange}
        name="password"
      />
    </>
  );
};

export default Account;
