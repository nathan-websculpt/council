import { useState } from "react";
import { IntegerVariant, isValidInteger } from "../../../components/scaffold-eth";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

export const GetVerse = () => {
  const [verseIdInput, setVerseIdInput] = useState(1);

  const { data: selectedVerse, isLoading: isVerseLoading } = useScaffoldReadContract({
    contractName: "John",
    functionName: "getVerseByNumber",
    args: [BigInt(verseIdInput)],
  });

  function handleBigIntChange(newVal: string): void {
    const _v = newVal.trim();
    if (_v.length === 0 || _v === "." || isValidInteger(IntegerVariant.UINT256, _v, false)) setVerseIdInput(_v);
  }

  return (
    <>
      <div className="flex gap-1 mt-5">
        <input
          placeholder="number between 1 and 879"
          className="w-full input input-bordered input-accent"
          value={verseIdInput}
          onChange={e => handleBigIntChange(e.target.value)}
        />
      </div>
      {isVerseLoading || selectedVerse === undefined ? (
        <>
          <div className="flex flex-col items-center gap-2 p-2 m-4 mx-auto border shadow-xl border-base-300 bg-base-200 sm:rounded-lg min-h-56 min-w-56">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-row mb-12">
            <div className="px-6 pt-10 pb-8 mt-6 shadow-xl bg-primary sm:mx-auto sm:max-w-11/12 md:w-full sm:rounded-lg sm:px-10">
              <p className="mb-12 text-xl underline">SELECTED VERSE</p>
              <p className="text-md">
                {selectedVerse?.chapterNumber.toString()} : {selectedVerse?.verseNumber.toString()}
              </p>
              <p className="text-lg">{selectedVerse?.verseContent}</p>
              <p className="text-lg">
                Confirmed: <span>{selectedVerse?.confirmed ? "TRUE" : "FALSE"}</span>
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};
