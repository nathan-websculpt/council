import { useEffect, useState } from "react";
import { ConfirmVerse } from "./ConfirmVerse";
import { useApolloClient } from "@apollo/client";
import { useInterval } from "usehooks-ts";
import { useAccount } from "wagmi";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { getJohnMetaData } from "~~/helpers/JohnMeta";
import { GQL_VERSES_For_Confirmation } from "~~/helpers/getQueries";

// has three view modes
//    1. Next-Up View
//      a. shows the user's next verse to confirm
//    2. View All
//      a. shows all verses
//    3. Cascading DDLs
//      a. shows the single verse from selections off of 2 drop-down lists (chapter and verse)

// NOTE:
// isViewAllMode means you are reading from "data"
// !isViewAllMode means you are reading from "filteredVerseList"

export const VersesList_Confirm = () => {
  const [isFirstRun, setIsFirstRun] = useState(true);

  const defaultChapterValue = "Select Chapter";
  const defaultVerseValue = "Select Verse";
  const REFRESH_INTERVAL = 2000; //PRODTODO: 6000

  const client = useApolloClient();
  const userAccount = useAccount();

  const [viewStyleDisplayString, setViewStyleDisplayString] = useState("Next-Up View");
  const [listOfConfirmedIDs, setListOfConfirmedIDs] = useState([]);
  const [filteredVerseList, setFilteredVerseList] = useState([]);
  const [isViewAllMode, setIsViewAllMode] = useState(false);

  const metaData = getJohnMetaData();
  const [versesList, setVersesList] = useState<number[]>([]);
  const [previousSelectedChapter, setPreviousSelectedChapter] = useState(defaultChapterValue);
  const [selectedChapter, setSelectedChapter] = useState(defaultChapterValue);
  const [selectedVerse, setSelectedVerse] = useState(defaultVerseValue);

  const [pageSize, setPageSize] = useState(25);
  const [pageNum, setPageNum] = useState(0);
  const [data, setData] = useState({});
  const [queryLoading, setQueryLoading] = useState(true); // only used on initial load

  const [readyToPoll, setReadyToPoll] = useState(false);

  useEffect(() => {
    setPreviousSelectedChapter(selectedChapter);
  }, [selectedChapter]);

  useEffect(() => {
    if (!isNaN(selectedVerse) && !isViewAllMode) {
      setIsViewAllMode(true);
      setPageNum(0); //TODO: this causes a double-call to preQuery/doQuery; doesn't break, just inefficient.
      return;
    }
    // if the previously selected chapter was also a number (user is swapping chapters in ddl [eg: changing from 1 to 3])
    if (!isNaN(previousSelectedChapter) && !isNaN(selectedChapter)) return;

    if (isNaN(selectedVerse) && isNaN(selectedChapter) && isViewAllMode) setIsViewAllMode(false);
  }, [selectedVerse, selectedChapter]);

  useEffect(() => {
    if (isViewAllMode) setViewStyleDisplayString("View All");
    else {
      setViewStyleDisplayString("Next-Up View");
      setSelectedChapter(defaultChapterValue);
      setSelectedVerse(defaultVerseValue);
      setVersesList([]);
    }
  }, [isViewAllMode]);

  useEffect(() => {
    if (!isFirstRun) preQuery();
    else setIsFirstRun(false);
  }, [pageSize, pageNum, selectedVerse]);

  // prevents double-querying on page load
  useEffect(() => {
    if (!isFirstRun) {
      preQuery();
      if (queryLoading) setQueryLoading(false);
    }
  }, [isFirstRun]);

  const preQuery = async () => {
    if (!isNaN(selectedVerse)) {
      doQuery({
        limit: pageSize,
        offset: pageNum * pageSize,
        searchByChapter: parseInt(selectedChapter),
        searchByVerse: parseInt(selectedVerse),
      });
    } else {
      doQuery({
        limit: pageSize,
        offset: pageNum * pageSize,
      });
    }
  };

  const doQuery = async (options: object) => {
    await client
      .query({
        query: GQL_VERSES_For_Confirmation(selectedChapter, selectedVerse),
        variables: options,
        fetchPolicy: "no-cache",
      })
      .then(d => {
        setData(d.data);
      })
      .catch(e => {
        console.log("GQL_VERSES_For_Confirmation QUERY ERROR: ", e);
      });
  };

  const changeChapter = e => {
    setSelectedChapter(e.target.value.toString());
    setVersesList(getJohnMetaData().find(x => x.ChapterNumber.toString() === e.target.value.toString())?.Verses);
    setSelectedVerse(defaultVerseValue);
  };

  const changeVerse = e => {
    setSelectedVerse(e.target.value.toString());
  };

  useEffect(() => {
    if (data !== undefined && data !== null) {
      // console.log("GQL_VERSES_For_Confirmation Query DATA: ", data);

      // filter to an array of JUST IDs that the user has already confirmed
      // listOfConfirmedIDs
      setListOfConfirmedIDs(
        data?.verses
          ?.filter(e => e.confirmations.some(a => a.confirmedBy.startsWith(userAccount.address?.toLowerCase())))
          .map(e => e.id),
      );
    }
  }, [data]);

  useEffect(() => {
    if (listOfConfirmedIDs !== undefined && listOfConfirmedIDs !== null && listOfConfirmedIDs.length > 0) {
      // filter confirmed verses (listOfConfirmedIDs) OUT of the originally queried list
      setFilteredVerseList(data?.verses?.filter(i => filterOutAlreadyConfirmed(i)));
    } else {
      setFilteredVerseList(data?.verses);
    }
  }, [listOfConfirmedIDs]);

  // used for filteredVerseList (a filter from the originally queried data)
  const filterOutAlreadyConfirmed = item => {
    return !listOfConfirmedIDs.includes(item.id);
  };

  const setViewMode = () => {
    setIsViewAllMode(!isViewAllMode);
  };

  useInterval(() => {
    if (readyToPoll) preQuery();
    else setReadyToPoll(true);
  }, REFRESH_INTERVAL);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-1 mb-12 lg:justify-between lg:flex-row lg:px-12">
        <div className="flex flex-row gap-4 place-items-center">
          {Number.isNaN(parseInt(selectedVerse)) ? (
            <>
              <label className="btn btn-circle btn-primary hover:btn-neutral swap swap-rotate">
                {/* this hidden checkbox controls the state */}
                <input type="checkbox" onChange={setViewMode} checked={isViewAllMode} />

                {/* icons from: https://heroicons.com/solid */}
                {/* BARS 2 icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 swap-off"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 9a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9Zm0 6.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>

                {/* BARS 4 icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 swap-on"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25Zm0 4.5A.75.75 0 0 1 3.75 9h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
              <p className="text-xl">{viewStyleDisplayString}</p>
            </>
          ) : (
            <>
              <button onClick={() => setIsViewAllMode(false)} className="btn btn-circle btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <p className="text-xl">Clear Results</p>
            </>
          )}
        </div>
        <div className="flex flex-row justify-center gap-1 mt-4 md:justify-around lg:mt-0">
          {metaData !== undefined && metaData !== null && (
            <>
              <select
                className="w-32 px-6 py-2 mr-4 text-xs sm:w-44 bg-primary sm:text-sm md:text-md lg:text-lg"
                value={selectedChapter}
                onChange={changeChapter}
              >
                <option>{defaultChapterValue}</option>
                {metaData.map(md => (
                  <option key={md.ChapterNumber.toString() + md.Verses.length.toString()} value={md.ChapterNumber}>
                    {md.ChapterNumber}
                  </option>
                ))}
              </select>

              <select
                className="w-32 px-6 py-2 text-xs sm:w-44 bg-primary sm:text-sm md:text-md lg:text-lg"
                value={selectedVerse}
                onChange={changeVerse}
              >
                <option>{defaultVerseValue}</option>
                {versesList !== undefined && versesList !== null && (
                  <>
                    {versesList?.map(verse => (
                      <option key={verse.VerseNumber} value={verse.VerseNumber}>
                        {verse.VerseNumber}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          disabled={!pageNum}
          className="text-sm btn btn-primary sm:text-md xl:text-xl"
          onClick={() => setPageNum(prev => prev - 1)}
        >
          Prev
        </button>
        <div className="flex flex-col w-1/4 gap-3 sm:w-1/5">
          <span className="mx-auto text-sm font-bold sm:text-md xl:text-xl">Page {pageNum + 1}</span>
          <select
            className="px-2 py-1 text-sm text-center sm:px-4 sm:py-2 sm:text-md xl:text-xl bg-primary"
            onChange={event => setPageSize(parseInt(event.target.value))}
            value={pageSize.toString()}
          >
            <option value="100">Show 100</option>
            <option value="25">Show 25</option>
            <option value="10">Show 10</option>
          </select>
        </div>
        <button className="text-sm btn btn-primary sm:text-md xl:text-xl" onClick={() => setPageNum(prev => prev + 1)}>
          Next
        </button>
      </div>
      {queryLoading ? (
        <>
          <div className="flex flex-col items-center gap-2 p-2 m-4 mx-auto border shadow-xl border-base-300 bg-base-200 sm:rounded-lg">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        </>
      ) : (
        <>
          {isViewAllMode ? (
            <div>
              {data?.verses?.map(verse => (
                <div key={verse.id.toString()} className="flex flex-row">
                  <ConfirmVerse
                    content={verse.verseContent}
                    chapterNum={verse.chapterNumber}
                    verseNum={verse.verseNumber}
                    verseId={verse.id}
                    confirmationCount={verse.confirmationCount}
                    numericalId={BigInt(verse.verseId)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div>
              {filteredVerseList?.map(verse => (
                <div key={verse.id.toString()} className="flex flex-row">
                  <ConfirmVerse
                    content={verse.verseContent}
                    chapterNum={verse.chapterNumber}
                    verseNum={verse.verseNumber}
                    verseId={verse.id}
                    confirmationCount={verse.confirmationCount}
                    numericalId={BigInt(verse.verseId)}
                  />
                </div>
              ))}
            </div>
          )}
        </>
      )}

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
};
