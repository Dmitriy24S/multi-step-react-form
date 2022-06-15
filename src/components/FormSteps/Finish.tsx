const Finish = () => {
  return (
    <article className="flex flex-col items-center justify-center">
      {/* Checkmark animation */}
      <div className="checkmark-illustration">
        <svg
          className="checkmark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle
            className="checkmark__circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />
          <path
            className="checkmark_check"
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
          />
        </svg>
      </div>
      <h3 className="uppercase text-green-500 text-xl mt-4 font-bold">
        Congratulations!
      </h3>
      <p className="text-gray-500 font-semibold mt-2">
        Your Account has been created.
      </p>
    </article>
  );
};

export default Finish;
