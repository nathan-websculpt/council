import { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { getJohnMetaData } from "~~/helpers/JohnMeta";
import { GQL_VERSES_For_Display_search_by_chapter } from "~~/helpers/getQueries";

export const VersesList_Read = () => {
  const [isFirstRun, setIsFirstRun] = useState(true);

  const client = useApolloClient();
  const [viewStyleDisplayString, setViewStyleDisplayString] = useState("Book View");

  const defaultChapterValue = "Select Chapter";
  const defaultVerseValue = "Select Verse";
  const metaData = getJohnMetaData();
  const [versesList, setVersesList] = useState<number[]>([]);
  const [selectedChapter, setSelectedChapter] = useState(defaultChapterValue);
  const [selectedVerse, setSelectedVerse] = useState(defaultVerseValue);

  const [isListMode, setIsListMode] = useState(false);
  const [pageSize, setPageSize] = useState(25);
  const [pageNum, setPageNum] = useState(0);
  const [data, setData] = useState({});
  const [queryLoading, setQueryLoading] = useState(true);

  useEffect(() => {
    if (!isFirstRun) preQuery();
    else setIsFirstRun(false);
  }, [pageSize, pageNum]);

  // prevents double-querying on page load
  useEffect(() => {
    if (!isFirstRun) preQuery();
  }, [isFirstRun]);

  useEffect(() => {
    if (isListMode) setViewStyleDisplayString("List View");
    else setViewStyleDisplayString("Book View");
  }, [isListMode]);

  const preQuery = async () => {
    setQueryLoading(true);
    if (isNaN(selectedChapter) && isNaN(selectedVerse)) {
      doQuery({
        limit: pageSize,
        offset: pageNum * pageSize,
      });
    } else if (isNaN(selectedVerse)) {
      doQuery({
        limit: pageSize,
        offset: pageNum * pageSize,
        chapterNumberInput: selectedChapter,
        searchByChapterNumber: selectedChapter,
      });
    } else {
      doQuery({
        limit: pageSize,
        offset: pageNum * pageSize,
        chapterNumberInput: selectedChapter,
        verseNumberInput: selectedVerse,
        searchByChapterNumber: selectedChapter,
        searchByVerseNumber: selectedVerse,
      });
    }
  };

  //NOTE: useLazyQuery gets executed again IF ANY of the Options change
  //^^^https://github.com/apollographql/apollo-client/issues/5912#issuecomment-797060422
  //Here, I am just using the Apollo Client directly in order to allow:
  //     - the table to initially load with data
  //     - then, the filtering of the data via the Search Bar
  const doQuery = async (options: object) => {
    console.log("querying");
    setQueryLoading(true);
    const thisChapterQuery = isNaN(selectedChapter) ? "" : selectedChapter;
    const thisVerseQuery = isNaN(selectedVerse) ? "" : selectedVerse;
    await client
      .query({
        query: GQL_VERSES_For_Display_search_by_chapter(thisChapterQuery, thisVerseQuery),
        variables: options,
        fetchPolicy: "no-cache",
      })
      .then(d => {
        setData(d.data);
      })
      .catch(e => {
        console.log("QUERY ERROR: ", e);
      });
    setQueryLoading(false);
  };

  const changeChapter = e => {
    setSelectedChapter(e.target.value.toString());
    setVersesList(getJohnMetaData().find(x => x.ChapterNumber.toString() === e.target.value.toString())?.Verses);
    setSelectedVerse(defaultVerseValue);
  };

  const changeVerse = e => {
    setSelectedVerse(e.target.value.toString());
  };

  const handleToggle = () => {
    setIsListMode(!isListMode);
  };

  const getClicked = () => {
    // need to be at page one
    // a change of page num will also cause a query
    if (pageNum === 0) {
      preQuery();
    } else {
      setPageNum(0);
    }
  };

  return (
    <>
      {/* <div className="flex self-center w-full mb-6">
        {data?.verses?.length > 0 && (
          <>
            <article className="px-4 mx-auto mt-8 mb-12 prose lg:prose-lg md:px-0">
              <h1 className="text-center">Gospel of John (KJV)</h1>
              <blockquote>Contract has not been audited, and it should be considered a proof-of-concept.</blockquote>
              <p>
                Can not currently confirm that this properly represents The Gospel of John (KJV) [neither in-part, nor
                in-full].
              </p>
              <p>
                If you are reading this, you are reading from the blockchain on Optimism Mainnet at Smart Contract
                address:
              </p>
              <p className="break-all">0x29BB1313321dbA27Ad074DD6AD2943040319B439</p>
            </article>
          </>
        )}
      </div> */}

      <div className="flex flex-col items-center justify-center gap-1 mb-12 lg:justify-between lg:flex-row lg:px-12">
        <div className="flex flex-row gap-4 place-items-center">
          <label className="btn btn-circle btn-primary hover:btn-neutral swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" onChange={handleToggle} checked={isListMode} />

            {/* icons from: https://heroicons.com/solid */}
            {/* LIST icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 swap-on">
              <path
                fillRule="evenodd"
                d="M2.625 6.75a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0A.75.75 0 0 1 8.25 6h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.625 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12A.75.75 0 0 1 7.5 12Zm-4.875 5.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>

            {/* BOOK icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 swap-off"
            >
              <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
            </svg>
          </label>
          <p className="text-sm font-bold sm:text-md lg:text-xl">{viewStyleDisplayString}</p>
        </div>
        <div className="flex flex-row justify-center mt-4 sm:justify-around lg:mt-0">
          {metaData !== undefined && metaData !== null && (
            <>
              <select
                className="w-32 px-2 py-2 mr-1 text-xs sm:px-6 sm:py-2 sm:mr-2 bg-primary sm:text-sm md:text-md lg:text-lg sm:w-44"
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
                className="w-32 px-2 py-2 mr-2 text-xs sm:px-6 sm:py-2 sm:mr-4 bg-primary sm:text-sm md:text-md lg:text-lg sm:w-44"
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
          <button
            className="px-4 py-2 text-xs sm:px-6 sm:py-2 sm:px-8 bg-primary sm:text-sm md:text-md lg:text-lg"
            onClick={() => getClicked()}
          >
            GET
          </button>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between sm:justify-around">
          <button disabled={!pageNum} className="btn btn-primary" onClick={() => setPageNum(prev => prev - 1)}>
            Prev
          </button>
          <div className="flex flex-col w-1/4 gap-3 sm:w-1/5 md:w-1/6">
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
        {queryLoading ? (
          <div className="flex flex-col items-center gap-2 p-2 m-4 mx-auto border shadow-xl border-base-300 bg-base-200 sm:rounded-lg">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <>
            {isListMode ? (
              <div className="px-6 pt-10 pb-8 mt-6 shadow-xl bg-primary sm:mx-auto sm:max-w-11/12 md:w-3/4 sm:rounded-lg sm:px-8 md:px-14 lg:px-20 xl:px-22">
                {data?.verses?.map(verse => (
                  <div key={verse.id.toString()} className="flex flex-row gap-6">
                    <p className="text-sm md:text-lg text-nowrap">
                      {verse.chapterNumber} : {verse.verseNumber}
                    </p>
                    <p className="text-md md:text-2xl">{verse.verseContent}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="pt-10 pb-8 pl-4 pr-3 mt-6 shadow-xl bg-primary sm:mx-auto sm:max-w-11/12 lg:w-3/4 sm:rounded-lg sm:px-10 md:pl-10 md:pr-12 xl:pl-16 xl:pr-16 2xl:pl-20 2xl:pr-16">
                {data?.verses?.map(verse => (
                  <span key={verse.id.toString()} className="pl-2 text-sm align-text-bottom">
                    {verse.chapterNumber}:{verse.verseNumber}
                    <span className="pl-2 text-lg align-text-top">{verse.verseContent}</span>
                  </span>
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
      </div>
    </>
  );
};
