import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
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
    return (
      <div className="flex flex-col items-center gap-2 p-2 m-4 mx-auto border shadow-xl border-base-300 bg-base-200 sm:rounded-lg">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  } else {
    return (
      <>
        <div className="flex items-center justify-between sm:justify-around">
          <button disabled={!pageNum} className="btn btn-primary" onClick={() => setPageNum(prev => prev - 1)}>
            Prev
          </button>
          <div className="flex flex-col w-1/4 gap-3 sm:w-1/5">
            <span className="mx-auto text-sm font-bold sm:text-md md:text-xl">Page {pageNum + 1}</span>
            <select
              className="px-2 py-1 text-sm text-center sm:px-4 sm:py-2 sm:text-md md:text-xl bg-primary"
              onChange={event => setPageSize(parseInt(event.target.value))}
              value={pageSize.toString()}
            >
              <option value="100">Show 100</option>
              <option value="25">Show 25</option>
              <option value="10">Show 10</option>
            </select>
          </div>
          <button className="btn btn-primary" onClick={() => setPageNum(prev => prev + 1)}>
            Next
          </button>
        </div>

        {data?.verses?.map(verse => (
          <div key={verse.id.toString()} className="flex flex-row">
            <div className="px-6 pt-10 pb-8 mt-6 shadow-xl bg-primary sm:mx-auto sm:max-w-11/12 md:w-full sm:rounded-lg sm:px-10">
              <p className="text-lg">
                {verse?.chapterNumber} : {verse?.verseNumber}
              </p>
              <p className="text-2xl">{verse?.verseContent}</p>
            </div>
          </div>
        ))}

        <div className="flex justify-end gap-3 mx-5 mt-5">
          <button className="btn btn-sm" disabled={!pageNum} onClick={() => setPageNum(0)}>
            <ArrowLeftIcon className="w-4 h-4" />
            <ArrowLeftIcon className="w-4 h-4" />
          </button>
          <span>...</span>
          <button className="btn btn-sm" disabled={!pageNum} onClick={() => setPageNum(prev => prev - 1)}>
            <ArrowLeftIcon className="w-4 h-4" />
          </button>
          <span className="self-center font-medium text-primary-content">Page {pageNum + 1}</span>
          <button className="btn btn-sm" onClick={() => setPageNum(prev => prev + 1)}>
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
      </>
    );
  }
};
