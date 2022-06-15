import React, { createContext, useState } from "react";
import "./App.css";
import Account from "./components/FormSteps/Account";
import Details from "./components/FormSteps/Details";
import Finish from "./components/FormSteps/Finish";
import Payment from "./components/FormSteps/Payment";

export const AppContext = createContext({});

export interface AppContextType {
  userData: UserDataType;
  setUserData: React.Dispatch<React.SetStateAction<string | number>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  const [userData, setUserData] = useState<UserDataType | null>(null);
  const [step, setStep] = useState(1);

  // finish form - reset form to beginning
  const handleFinish = () => {
    setStep(1);
    setUserData(null);
    console.log("form submitted ✅");
  };

  const nextStep = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("next ⏭");
    if (step < 4) {
      setStep((prev) => prev + 1);
    }
    // finish form - reset form to beginning
    if (step === 4) {
      handleFinish();
    }
  };

  const prevStep = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("back ⏮");
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  // input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // form steps
  let totalSteps = [
    { stepNum: 1, title: "Account information" },
    { stepNum: 2, title: "Personal Details" },
    { stepNum: 3, title: "Payment" },
    { stepNum: 4, title: "Finish" },
  ];

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

  return (
    <AppContext.Provider value={{ userData, setUserData, handleChange }}>
      <div className="App">
        <section className="bg-slate-50 rounded-xl shadow-md w-[40rem] text-black p-12">
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
                      className={`progress-line w-full border-t-2 transition duration-300
                  ${
                    index + 1 === step || index < step // old/current form step = green, future steps = gray
                      ? ` border-green-600`
                      : "border-slate-300"
                  }`}
                    ></div>
                  )}

                  {/* Step number / checkmark done */}
                  <span
                    className={`relative text-md rounded-full h-12 transition duration-300 ease-in-out ${
                      index > 0 ? "w-16" : "w-12"
                    } flex items-center justify-center border-2 border-gray-300 ${
                      index + 1 === step || index < step // old/current form step = green, future steps = gray
                        ? "border-green-600 text-white bg-green-600 font-bold "
                        : "text-slate-600"
                    }`}
                  >
                    {index + 1 < step || step === 4 ? "✓" : index + 1}
                    {/* if passed step then checkmark, or if it is last step checkmark, otherwise uncompleted = show step number */}

                    {/* Title */}
                    <div className="step-title absolute mt-24 t-0 w-32 text-xs font-medium uppercase text-gray-400 text-center">
                      {item.title}
                    </div>
                  </span>
                </div>
              );
            })}
          </div>
          {/* Form */}
          <form className="flex flex-col text-lg gap-1" onSubmit={nextStep}>
            {displayStepForm(step)}
            <div className="button-container mt-12 flex justify-around text-lg">
              <button
                disabled={step === 1}
                onClick={prevStep}
                className="bg-transparent uppercase text-sky-600 px-4 py-1 rounded-md hover:bg-sky-100 transition-colors disabled:opacity-50"
              >
                Back
              </button>
              <button
                onClick={nextStep}
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
