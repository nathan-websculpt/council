"use client";

import { VersesList_FullyConfirmed } from "./_components/VersesList_fullyconfirmed";
import { NextPage } from "next";
import { MainWrapper } from "~~/components/MainWrapper";

const FullyConfirmed: NextPage = () => {
  return (
    <>
      <MainWrapper innerComponent={VersesList_FullyConfirmed} />
    </>
  );
};

export default FullyConfirmed;
