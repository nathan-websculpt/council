"use client";

import { VersesList_Search } from "./_components/VersesList_search";
import { NextPage } from "next";
import { MainWrapper } from "~~/components/MainWrapper";

const Search: NextPage = () => {
  return (
    <>
      <MainWrapper innerComponent={VersesList_Search} />
    </>
  );
};

export default Search;
