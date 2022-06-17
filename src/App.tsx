import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import Account from "./components/FormSteps/Account";
import Details from "./components/FormSteps/Details";
import Finish from "./components/FormSteps/Finish";
import Payment from "./components/FormSteps/Payment";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const accountSchema = yup.object({
  username: yup
    .string()
    .trim()
    .min(4)
    .max(12)
    .matches(/^[a-zA-Z0-9]+$/, "only letters and numbers")
    .required(),
  password: yup
    .string()
    .trim()
    .min(4)
    .max(14)
    .matches(/^[a-zA-Z0-9]+$/, "only letters and numbers")
    .required(),
});

const detailsSchema = yup.object({
  address: yup
    .string()
    .trim()
    .min(4)
    .max(14)
    .matches(/^[a-zA-Z0-9 ]+$/, "only letters and numbers")
    .required(),
  city: yup
    .string()
    .trim()
    .min(4)
    .max(14)
    .matches(/^[a-zA-Z0-9 ]+$/, "only letters and numbers")
    .required(),
});

const paymentSchema = yup.object({
  cardname: yup.string().trim().min(4).max(14).required(),
  creditcard: yup
    .string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(8)
    .max(14)
    .required(),
});

export const AppContext = createContext({});

export interface AppContextType {
  userData: UserDataType;
  setUserData: React.Dispatch<React.SetStateAction<string | number>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register: any;
  handleSubmit: any;
  watch: any;
  errors: any;
}

export interface UserDataType {
  username?: string | undefined;
  password?: string | undefined;
  address?: string | undefined;
  city?: string | undefined;
  cardname?: string | undefined;
  creditcard?: number | undefined;
}

function App() {
  // const [userData, setUserData] = useState<UserDataType | null>(null);
  const [formContextSchema, setFormContextSchema] = useState<any>(null);
  const [step, setStep] = useState(1);

  // React Hook Form / Yup
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserDataType>({
    resolver: yupResolver(formContextSchema),
  });

  // Form steps
  let totalSteps = [
    { stepNum: 1, title: "Account information" },
    { stepNum: 2, title: "Personal Details" },
    { stepNum: 3, title: "Payment" },
    { stepNum: 4, title: "Finish" },
  ];

  // Show form related to current step
  const displayStepForm = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return <Account />;
      case 2:
        return <Details />;
      case 3:
        return <Payment />;
      case 4:
        return <Finish />;
    }
  };

  // finish form - reset form to beginning
  const handleFinish = () => {
    setStep(1);
    // setUserData(null);
    reset();
    console.log("form submitted ✅");
  };

  const nextStep = () => {
    console.log("next ⏭");
    if (step < 4) {
      setStep((prev) => prev + 1);
    }
    // finish form - reset form to beginning
    if (step === 4) {
      handleFinish();
    }
  };

  const prevStep = () => {
    console.log("back ⏮");
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  // input change
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setUserData({ ...userData, [name]: value });
  // };

  // Form validation schema depending on form step page
  useEffect(() => {
    const displayFormSchema = (stepNumber: number) => {
      switch (stepNumber) {
        case 1:
          return setFormContextSchema(accountSchema);
        case 2:
          return setFormContextSchema(detailsSchema);
        case 3:
          return setFormContextSchema(paymentSchema);
        case 4:
          return null;
      }
    };
    displayFormSchema(step);
  }, [step]);

  // const onSubmit: SubmitHandler<UserDataType> = (data: any, e: any) => {
  //   console.log(data);
  //   console.log("next ⏭");
  //   nextStep();
  // };

  const onSubmit = (data: any, e: any) => {
    console.log(data);
    console.log("next ⏭");
    nextStep();
  };

  return (
    <AppContext.Provider
      value={{
        // userData,
        // setUserData,
        register,
        watch,
        errors,
      }}
    >
      <div className="App">
        <section className="bg-slate-50 rounded-xl shadow-md w-full max-w-[36rem] md:w-1/2 md:min-w-[36rem] text-black px-4 py-12 xs:px-8 sm:px-12">
          {/* Progress bar */}
          <div className="progress-bar flex items-center mb-20">
            {/* Steps */}
            {totalSteps.map((item, index) => {
              return (
                // Step
                <div
                  key={index + 1}
                  className={`progress-step flex items-center ${
                    index > 0 && "w-full"
                  }`}
                >
                  {/* progress line between checkpoints */}
                  {index > 0 && (
                    <div
                      className={`progress-line  flex-auto border-t-2 transition duration-300
                  ${
                    index + 1 === step || index < step // old/current form step = green, future steps = gray
                      ? ` border-green-600`
                      : "border-slate-300"
                  }`}
                    ></div>
                  )}

                  {/* Step number / checkmark done */}
                  <span
                    className={`relative text-md rounded-full h-12 transition duration-300 ease-in-out
                    w-12 flex items-center justify-center border-2 border-gray-300 ${
                      index + 1 === step || index < step // old/current form step = green, future steps = gray
                        ? "border-green-600 text-white bg-green-600 font-bold "
                        : "text-slate-600"
                    }`}
                  >
                    {index + 1 < step || step === 4 ? "✓" : index + 1}
                    {/* if passed step then checkmark, or if it is last step checkmark, otherwise uncompleted = show step number */}
                    {/* Title */}
                    <div className="step-title absolute top-[115%] w-16 text-xs font-medium uppercase text-gray-400 text-center">
                      {item.title}
                    </div>
                  </span>
                </div>
              );
            })}
          </div>
          {/* Form */}
          <form
            className="flex flex-col text-lg gap-1 mt-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {displayStepForm(step)}
            <div className="button-container mt-12 flex justify-around text-lg">
              <button
                type="button"
                disabled={step === 1}
                onClick={prevStep}
                className="bg-transparent uppercase text-sky-600 px-4 py-1 rounded-md hover:bg-sky-100 transition-colors disabled:opacity-50"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-transparent uppercase text-sky-600 px-4 py-1 rounded-md hover:bg-sky-100 transition-colors"
              >
                {step > 3 ? "Finish" : "Next"}
                {/* if it's last button then button text = 'finish' else 'next' */}
              </button>
            </div>
          </form>
        </section>
      </div>
    </AppContext.Provider>
  );
}

export default App;
