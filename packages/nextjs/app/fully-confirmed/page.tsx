"use client";

import { VersesList_FullyConfirmed } from "./_components/VersesList_fullyconfirmed";
import { NextPage } from "next";
import { Wrapper_VerseViewer } from "~~/components/wrappers/Wrapper_VerseViewer";

const FullyConfirmed: NextPage = () => {
  return (
    <>
      <Wrapper_VerseViewer innerComponent={VersesList_FullyConfirmed} />
    </>
  );
};

export default FullyConfirmed;
