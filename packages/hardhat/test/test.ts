import { expect } from "chai";
import { ethers } from "hardhat";
import { John } from "../typechain-types";

describe("Deploying contract .....", function () {
  let john: John;
  let owner: HardhatEthersSigner;
  let memberOne: HardhatEthersSigner;
  let numberOfVerses = 0;
  before(async () => {
    const [one, two] = await ethers.getSigners();
    owner = one;
    memberOne = two;
    const johnFactory = await ethers.getContractFactory("John");
    john = (await johnFactory.deploy(owner.address, [owner.address, memberOne.address])) as John;
    await john.waitForDeployment();
  });

  it("\n\nContract Owner transferred successfully upon deployment...", async function () {
    await expect(await john.owner()).to.equal(owner.address);
    console.log("\tcontract owner: ", await john.owner());
  });

  describe("\n\nTesting Verse Saves", function () {
    it("\nShould allow OWNER to store a new verse", async function () {
      const cNum: bigint[] = [BigInt("1")];
      const vNum: bigint[] = [BigInt("1")];
      const vContent: string[] = ["verse 1"];

      const tx = await john.connect(owner).addBatchVerses(vNum, cNum, vContent);
      await tx.wait();

      await expect(tx)
        .to.emit(john, "Verse")
        .withArgs(owner.address, BigInt(numberOfVerses + 1), vNum[0], cNum[0], vContent[0])
        .then(() => {
          numberOfVerses++;
        });
    });

    it("\nShould allow a member to store a new verse", async function () {
      const cNum: bigint[] = [BigInt("1")];
      const vNum: bigint[] = [BigInt("2")];
      const vContent: string[] = ["verse 2"];

      const tx = await john.connect(memberOne).addBatchVerses(vNum, cNum, vContent);
      await tx.wait();

      await expect(tx)
        .to.emit(john, "Verse")
        .withArgs(memberOne.address, BigInt(numberOfVerses + 1), vNum[0], cNum[0], vContent[0])
        .then(() => {
          numberOfVerses++;
        });
    });

    it("\nShould have two verses", async function () {
      await expect(await john.numberOfVerses()).to.equal(2);
    });

    it("\nShould get last verse", async function () {
      console.log(await john.getLastVerseAdded());
    });

    // it("\nShould prevent user from skipping a verse", async function () {
    //   const cNum: bigint[] = [BigInt("1")];
    //   const vNum: bigint[] = [BigInt("4")];
    //   const vContent: string[] = ["verse 4"];

    //   await expect(john.connect(owner).addBatchVerses(vNum, cNum, vContent)).to.be.revertedWith("The contract is preventing you from skipping a verse.");
    //   console.log('verse count: ', await john.numberOfVerses());
    // });
  });
});
