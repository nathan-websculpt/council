"use client";

import { VersesList_Confirm } from "./_components/VersesList_confirm";
import { NextPage } from "next";
import { MainWrapper } from "~~/components/MainWrapper";

const Confirm: NextPage = () => {
  return (
    <>
      {/* <div className="flex items-center justify-center">
        <div className="flex flex-col w-full gap-2 p-2 m-4 border shadow-xl md:w-4/5 lg:w-3/5 border-base-300 bg-base-200 sm:rounded-lg">
          <VersesList_Confirm />
        </div>
      </div> */}

      <MainWrapper innerComponent={VersesList_Confirm} />
    </>
  );
};

export default Confirm;
