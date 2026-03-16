"use client";

import { get } from "@/config/api";
import { CheckIcon, MinusIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import React, { createContext, useContext, useEffect, useState } from "react";

const PlanContext = createContext(null);
export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("use usePlan within a PlanProvider.");
  }

  return context;
};

export const PlansSection = ({ isLoggedIn }) => {
  const [locations, setLocations] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [plans, setPlans] = useState(null);

  const contextValue = {
    locations,
    isLoggedIn,
  };

  useEffect(() => {
    (async function () {
      try {
        const response = await get({ url: "/plans" });
        setPlans(response.data?.data);
      } catch (error) {
        console.log("error while fetching plan", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <PlanContext.Provider value={contextValue}>
      <div className="mt-8">
        <div className="flex items-center justify-end gap-2">
          <button
            disabled={isLoading || locations <= 1}
            onClick={() => setLocations((prevState) => prevState - 1)}
            className="size-8 rounded-md flex items-center justify-center bg-neutral-900 text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <MinusIcon size={18} />
          </button>
          <div className="size-8 border border-neutral-200 flex items-center justify-center text-sm rounded-md">
            {locations}
          </div>
          <button
            disabled={isLoading || locations >= 10}
            onClick={() => setLocations((prevState) => prevState + 1)}
            className="size-8 rounded-md flex items-center justify-center bg-neutral-900 text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <PlusIcon size={18} />
          </button>
        </div>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {isLoading
            ? Array.from({ length: 4 }, (_, idx) => idx + 1).map((item) => {
                return (
                  <div
                    key={item}
                    className="h-80 rounded-xl bg-neutral-50 animate-pulse border border-neutral-200"
                  ></div>
                );
              })
            : plans.map((plan) => {
                return <PlanCard key={plan._id} plan={plan} />;
              })}
        </section>
      </div>
    </PlanContext.Provider>
  );
};

const PlanCard = ({ plan }) => {
  const [selectedFeatures, setSelectedFeatures] = useState(() => {
    return plan.features.map((feature) => feature.code);
  });
  const { isLoggedIn, locations } = usePlan();

  const handleFeatureSelection = (feature) => {
    const isExist = selectedFeatures.includes(feature);

    if (isExist) {
      setSelectedFeatures(
        selectedFeatures.filter(
          (selectedFeature) => selectedFeature !== feature,
        ),
      );
    } else {
      setSelectedFeatures((prevFeatures) => [...prevFeatures, feature]);
    }
  };

  const totalPrice = plan.features.reduce((acc, curr) => {
    if (selectedFeatures.includes(curr.code)) {
      acc += curr.price * locations;
    }

    return acc;
  }, 0);

  let billingLabel;

  switch (plan.code) {
    case "DAILY": {
      billingLabel = "day";
      break;
    }

    case "MONTHLY": {
      billingLabel = "mo";
      break;
    }

    case "HALF_YEARLY": {
      billingLabel = "6mo";
      break;
    }

    case "YEARLY": {
      billingLabel = "yr";
      break;
    }
  }

  return (
    <div className="border border-neutral-200 rounded-xl flex flex-col bg-neutral-50 shadow-sm">
      <div className="text-center border-b border-neutral-300 p-4">
        <div>
          <h4 className="text-lg font-medium mb-2">{plan.name}</h4>
          <p className="text-3xl font-medium">
            ₹{totalPrice}/{billingLabel}
          </p>
        </div>
        {isLoggedIn ? (
          <button
            disabled={!totalPrice}
            className="h-10 rounded-lg text-sm font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed bg-neutral-900 text-white w-full mt-4"
          >
            Get started
          </button>
        ) : (
          <Link
            href={"/signin"}
            className="h-10 rounded-lg text-sm font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed bg-neutral-900 text-white w-full mt-4"
          >
            Get started
          </Link>
        )}
      </div>
      <div className="p-4">
        <p className="font-semibold text-center">Features</p>
        <div className="flex flex-col gap-2 mt-4">
          {plan.features.map((feature) => {
            return (
              <div
                key={feature._id}
                data-selected={selectedFeatures.includes(feature.code)}
                onClick={() => handleFeatureSelection(feature.code)}
                className="flex items-center gap-2 group cursor-pointer"
              >
                <button
                  className={
                    "shrink-0 size-4 rounded-sm border border-neutral-400 flex items-center justify-center group-data-[selected=true]:bg-neutral-900 group-data-[selected=true]:text-white group-data-[selected=true]:border-transparent transition-all duration-150 ease-in-out"
                  }
                >
                  <CheckIcon
                    size={18}
                    className={
                      "opacity-0 scale-95 group-data-[selected=true]:scale-100 group-data-[selected=true]:opacity-100 transition-all duration-150 ease-out"
                    }
                  />
                </button>
                <div className="flex-1 text-sm">
                  <p>{feature.name}</p>
                  <p className="text-xs text-neutral-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
