"use client";

import { NextPage } from "next";
import { ExitEditMode } from "./_components/ExitEditMode";

const EditMode: NextPage = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="flex flex-col w-full m-1 md:gap-2 md:p-2 md:m-4 md:shadow-xl md:border md:w-4/5 lg:w-3/5 border-base-300 bg-base-200 sm:rounded-lg">
          Ready to Exit Edit Mode? All council-members must vote first
          <ExitEditMode />
        </div>
      </div>
    </>
  );
};

export default EditMode;
