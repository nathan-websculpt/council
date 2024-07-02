import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { LoadingSpinner } from "~~/components/helpers/LoadingSpinner";
import { PaginationBottom } from "~~/components/helpers/PaginationBottom";
import { PaginationTop } from "~~/components/helpers/PaginationTop";
import { GQL_VERSES_Fully_Confirmed } from "~~/helpers/getQueries";

export const VersesList_FullyConfirmed = () => {
  const [pageSize, setPageSize] = useState(25);
  const [pageNum, setPageNum] = useState(0);

  const { loading, error, data } = useQuery(GQL_VERSES_Fully_Confirmed(), {
    variables: {
      limit: pageSize,
      offset: pageNum * pageSize,
    },
    pollInterval: 6000,
  });

  useEffect(() => {
    if (error !== undefined && error !== null) console.log("GQL_VERSES_Fully_Confirmed Query Error: ", error);
  }, [error]);

  useEffect(() => {
    if (data !== undefined && data !== null) console.log("GQL_VERSES_Fully_Confirmed Query DATA: ", data);
  }, [data]);

  if (loading) {
    return <LoadingSpinner />;
  } else {
    return (
      <>
        <PaginationTop pageNum={pageNum} pageSize={pageSize} setPageNum={setPageNum} setPageSize={setPageSize} />

        {data?.verses?.map(verse => (
          <div key={verse.id.toString()} className="flex flex-row">
            <div className="w-full px-6 pt-10 pb-8 mx-auto mt-6 shadow-xl bg-primary md:w-11/12 xl:w-4/5 sm:rounded-lg sm:px-10">
              <p className="text-lg">
                {verse?.chapterNumber} : {verse?.verseNumber}
              </p>
              <p className="text-2xl">{verse?.verseContent}</p>
            </div>
          </div>
        ))}

        <PaginationBottom pageNum={pageNum} setPageNum={setPageNum} />
      </>
    );
  }
};
