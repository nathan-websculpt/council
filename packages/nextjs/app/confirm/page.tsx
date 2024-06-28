"use client";

import { VersesList_Confirm } from "./_components/VersesList_confirm";
import { NextPage } from "next";
import { MainWrapper } from "~~/components/MainWrapper";

const Confirm: NextPage = () => {
  return (
    <>
      <MainWrapper innerComponent={VersesList_Confirm} />
    </>
  );
};

export default Confirm;
