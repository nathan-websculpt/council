"use client";

import { VersesList_Read } from "./_components/VersesList_read";
import { NextPage } from "next";
import { MainWrapper } from "~~/components/MainWrapper";

const Read: NextPage = () => {
  return (
    <>
      <MainWrapper innerComponent={VersesList_Read} />
    </>
  );
};

export default Read;
