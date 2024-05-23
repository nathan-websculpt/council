import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export const ExitEditMode = () => {
  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("John");
  
  const writeAsync = async () => {
    try {
      await writeYourContractAsync({
        functionName: "voteToExitEditMode",
      });
    } catch (e) {
      console.error("Error calling voteToExitEditMode on contract:", e);
    }
  };

  return (
    <>
      <div className="flex gap-1 mt-5">
        <button className="btn btn-primary" onClick={() => writeAsync()}>
          VOTE TO EXIT EDIT-MODE
        </button>
      </div>
    </>
  );
};
