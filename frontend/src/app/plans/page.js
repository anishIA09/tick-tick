import { cookies } from "next/headers";
import React from "react";
import { PlansSection } from "./plans-section";

const PlansPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const isLoggedIn = !!token;

  return (
    <div className="h-screen overflow-y-auto p-6 lg:p-10">
      <div className="text-center">
        <h2 className="text-4xl font-medium">Pricing</h2>
        <p className="text-neutral-500 mt-2">Select plan to get started</p>
      </div>
      <PlansSection isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default PlansPage;
