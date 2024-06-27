"use client";

import { VersesList_Search } from "./_components/VersesList_search";
import { NextPage } from "next";
import { MainWrapper } from "~~/components/MainWrapper";

const Search: NextPage = () => {
  return (
    <>
      {/* <div className="flex items-center justify-center">
        <div className="flex flex-col w-full m-1 md:gap-2 md:p-2 md:m-4 md:shadow-xl md:border md:w-4/5 lg:w-3/5 border-base-300 bg-base-200 sm:rounded-lg">
          <VersesList_Search />
        </div>
      </div> */}

      <MainWrapper innerComponent={VersesList_Search} />
    </>
  );
};

export default Search;
