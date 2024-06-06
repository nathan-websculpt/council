import { useEffect, useState } from "react";
import { ConfirmVerse } from "./ConfirmVerse";
import { useApolloClient } from "@apollo/client";
import { useAccount } from "wagmi";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { getJohnMetaData } from "~~/helpers/JohnMeta";
import { GQL_VERSES_For_Confirmation } from "~~/helpers/getQueries";

export const GetVerses = () => {
  const client = useApolloClient();
  const userAccount = useAccount();
  const [viewStyleDisplayString, setViewStyleDisplayString] = useState("Next-Up View");
  const [listOfConfirmedIDs, setListOfConfirmedIDs] = useState([]);
  const [filteredVerseList, setFilteredVerseList] = useState([]);
  const [isViewAllMode, setIsViewAllMode] = useState(false);

  const metaData = getJohnMetaData();
  const [versesList, setVersesList] = useState<number[]>([]);
  const [selectedChapter, setSelectedChapter] = useState("Select Chapter");
  const [selectedVerse, setSelectedVerse] = useState("Select Verse");

  const [pageSize, setPageSize] = useState(25);
  const [pageNum, setPageNum] = useState(0);
  const [data, setData] = useState({});
  const [queryLoading, setQueryLoading] = useState(false);

  useEffect(() => {
    preQuery();
  }, [pageSize, pageNum, selectedVerse]);

  const preQuery = async () => {
    console.log("selected verse isNaN:",isNaN(parseInt(selectedVerse)));
    if (!isNaN(parseInt(selectedVerse))) {
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
    setQueryLoading(true);
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
    setQueryLoading(false);
  };

  const changeChapter = e => {
    setSelectedChapter(e.target.value.toString());
    setVersesList(getJohnMetaData().find(x => x.ChapterNumber.toString() === e.target.value.toString())?.Verses);
    setSelectedVerse("Select Verse");
  };

  const changeVerse = e => {
    setSelectedVerse(e.target.value.toString());
  };

  useEffect(() => {
    if (data !== undefined && data !== null) {
      console.log("GQL_VERSES_For_Confirmation Query DATA: ", data);

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

  const handleToggle = () => {
    setIsViewAllMode(!isViewAllMode);
  };

  useEffect(() => {
    if (isViewAllMode) setViewStyleDisplayString("View All");
    else setViewStyleDisplayString("Next-Up View");
  }, [isViewAllMode]);

  if (queryLoading) {
    return (
      <div className="flex flex-col items-center gap-2 p-2 m-4 mx-auto border shadow-xl border-base-300 bg-base-200 sm:rounded-lg">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  } else {
    return (
      <>
        <div className="flex flex-col items-center justify-center gap-1 mb-12 lg:justify-between lg:flex-row lg:px-12">
          <div className="flex flex-row gap-4 place-items-center">
            <label className="btn btn-circle btn-primary hover:btn-neutral swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input type="checkbox" onChange={handleToggle} checked={isViewAllMode} />

              {/* icons from: https://heroicons.com/solid */}
              {/* BARS 2 icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 swap-on"
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
                className="size-6 swap-off"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25Zm0 4.5A.75.75 0 0 1 3.75 9h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
            <p className="text-xl">{viewStyleDisplayString}</p>
          </div>
          <div className="flex flex-col justify-center gap-1 mt-4 md:justify-around md:flex-row lg:mt-0">
            {metaData !== undefined && metaData !== null && (
              <>
                <select value={selectedChapter} onChange={changeChapter}>
                  <option>Select Chapter</option>
                  {metaData.map(md => (
                    <option value={md.ChapterNumber}>{md.ChapterNumber}</option>
                  ))}
                </select>

                {versesList !== undefined && versesList !== null && (
                  <>
                    <select value={selectedVerse} onChange={changeVerse}>
                      <option>Select Verse</option>
                      {versesList?.map(verse => (
                        <option value={verse.VerseNumber}>{verse.VerseNumber}</option>
                      ))}
                    </select>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-3 mb-3">
          <span className="my-auto text-lg">Page {pageNum + 1}</span>
          <select
            className="px-4 py-2 text-xl bg-primary"
            onChange={event => setPageSize(parseInt(event.target.value))}
            value={pageSize.toString()}
          >
            <option value="25">Show 25</option>
            <option value="10">Show 10</option>
            <option value="1">Show 1</option>
          </select>
        </div>
        <div className="flex justify-between">
          <button disabled={!pageNum} className="btn btn-primary" onClick={() => setPageNum(prev => prev - 1)}>
            Previous
          </button>
          <button className="btn btn-primary" onClick={() => setPageNum(prev => prev + 1)}>
            Next
          </button>
        </div>

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
