"use client";

import { VersesList_Confirm } from "./_components/VersesList_confirm";
import { NextPage } from "next";
import { MainWrapper } from "~~/components/MainWrapper";

const Developers: NextPage = () => {
  return (
    <>
      <div className="flex flex-col-reverse justify-between gap-6 xl:flex-row">
        <div className="flex flex-col gap-6 p-2 sm:p4 xl:p-10">
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
            <a
              className="transition-all duration-200 card card-compact hover:bg-primary hover:-translate-y-1"
              href="/add"
              target="_blank"
            >
              <figure className="px-4 pt-4">
                <img
                  loading="lazy"
                  className="border rounded-lg border-base-content bg-base-300 border-opacity-5"
                  alt="Add Verses"
                  src="/img/mock_img/add_verses.png"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Add Verses</h2>
                <p className="text-xs opacity-60">
                  Accordion is used for showing and hiding content but only one item can stay open at a time.
                </p>
              </div>
            </a>
            <a
              className="transition-all duration-200 card card-compact hover:bg-primary hover:-translate-y-1"
              href="/confirm"
              target="_blank"
            >
              <figure className="px-4 pt-4">
                <img
                  loading="lazy"
                  className="border rounded-lg border-base-content bg-base-300 border-opacity-5"
                  alt="Accordion"
                  src="/img/mock_img/confirm_verses.png"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Confirm Verses</h2>
                <p className="text-xs opacity-60">
                  Accordion is used for showing and hiding content but only one item can stay open at a time.
                </p>
              </div>
            </a>
            <a
              className="transition-all duration-200 card card-compact hover:bg-primary hover:-translate-y-1"
              href="/debug"
              target="_blank"
            >
              <figure className="px-4 pt-4">
                <img
                  loading="lazy"
                  className="border rounded-lg border-base-content bg-base-300 border-opacity-5"
                  alt="Accordion"
                  src="/img/mock_img/debug_contract.png"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Debug Contract</h2>
                <p className="text-xs opacity-60">
                  Accordion is used for showing and hiding content but only one item can stay open at a time.
                </p>
              </div>
            </a>
            <a
              className="transition-all duration-200 card card-compact hover:bg-primary hover:-translate-y-1"
              href="/onchain-test"
              target="_blank"
            >
              <figure className="px-4 pt-4">
                <img
                  loading="lazy"
                  className="border rounded-lg border-base-content bg-base-300 border-opacity-5"
                  alt="Accordion"
                  src="/img/mock_img/test_contract.png"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Test Contract</h2>
                <p className="text-xs opacity-60">
                  Accordion is used for showing and hiding content but only one item can stay open at a time.
                </p>
              </div>
            </a>
            <a
              className="transition-all duration-200 card card-compact hover:bg-primary hover:-translate-y-1"
              href="/edit-mode"
              target="_blank"
            >
              <figure className="px-4 pt-4">
                <img
                  loading="lazy"
                  className="border rounded-lg border-base-content bg-base-300 border-opacity-5"
                  alt="Accordion"
                  src="/img/mock_img/edit_mode.png"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Contract Management</h2>
                <p className="text-xs opacity-60">
                  Accordion is used for showing and hiding content but only one item can stay open at a time.
                </p>
              </div>
            </a>
            <a
              className="transition-all duration-200 card card-compact hover:bg-primary hover:-translate-y-1"
              href="/fully-confirmed"
              target="_blank"
            >
              <figure className="px-4 pt-4">
                <img
                  loading="lazy"
                  className="border rounded-lg border-base-content bg-base-300 border-opacity-5"
                  alt="Accordion"
                  src="/img/mock_img/fully_confirmed.png"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Fully Confirmed Verses</h2>
                <p className="text-xs opacity-60">
                  Accordion is used for showing and hiding content but only one item can stay open at a time.
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Developers;
