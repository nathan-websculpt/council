"use client";

import { GetVerses } from "./_components/GetVerses";
import { NextPage } from "next";

const FullyConfirmed: NextPage = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="flex flex-col w-full m-1 md:gap-2 md:p-2 md:m-4 md:shadow-xl md:border md:w-4/5 lg:w-3/5 border-base-300 bg-base-200 sm:rounded-lg">
          <GetVerses />
        </div>
      </div>
    </>
  );
};

export default FullyConfirmed;
