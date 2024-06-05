import { gql } from "@apollo/client";

//for the READ page (while dev is adding book)
export const GQL_VERSES_For_Display = () => {
  return gql`
    query ($limit: Int!, $offset: Int!) {
      verses(orderBy: verseId, orderDirection: asc, first: $limit, skip: $offset) {
        id
        verseId
        chapterNumber
        verseNumber
        verseContent
      }
    }
  `;
};

//for the READ page (after done uploading book - can search by chapter)
export const GQL_VERSES_For_Display_search_by_chapter = (searchInput: string) => {
  if (searchInput.trim().length === 0)
    return gql`
      query ($limit: Int!, $offset: Int!) {
        verses(orderBy: verseId, orderDirection: asc, first: $limit, skip: $offset) {
          id
          verseId
          chapterNumber
          verseNumber
          verseContent
        }
      }
    `;
  else
    return gql`
      query ($limit: Int!, $offset: Int!, $searchBy: String) {
        verses(
          where: { chapterNumber_gte: $searchBy }
          orderBy: verseId
          orderDirection: asc
          first: $limit
          skip: $offset
        ) {
          id
          verseId
          chapterNumber
          verseNumber
          verseContent
        }
      }
    `;
};

//for the SEARCH page
export const GQL_VERSES_For_Display_with_search = (searchInput: string) => {
  if (searchInput.trim().length === 0)
    return gql`
      query ($limit: Int!, $offset: Int!) {
        verses(orderBy: verseId, orderDirection: asc, first: $limit, skip: $offset) {
          id
          verseId
          chapterNumber
          verseNumber
          verseContent
        }
      }
    `;
  else
    return gql`
      query ($limit: Int!, $offset: Int!, $searchBy: String) {
        verses(
          where: { verseContent_contains_nocase: $searchBy }
          orderBy: verseId
          orderDirection: asc
          first: $limit
          skip: $offset
        ) {
          id
          verseId
          chapterNumber
          verseNumber
          verseContent
        }
      }
    `;
};

//for the CONFIRMATION page
//old, as of June 5th, 2024
export const GQL_VERSES_For_Confirmation_OLD = () => {
  return gql`
    query ($limit: Int!, $offset: Int!) {
      verses(orderBy: verseId, orderDirection: asc, first: $limit, skip: $offset) {
        id
        verseId
        chapterNumber
        verseNumber
        verseContent
        confirmationCount
      }
    }
  `;
};

//for the CONFIRMATION page
export const GQL_VERSES_For_Confirmation = () => {
  return gql`
    query ($limit: Int!, $offset: Int!, $userWalletAddress: String) {
      verses(
        where: { or: [{ confirmationCount: 0 }, { confirmations_: { confirmedBy_not: $userWalletAddress } }] }
        orderBy: verseId
        orderDirection: asc
        first: $limit
        skip: $offset
      ) {
        id
        verseId
        chapterNumber
        verseNumber
        verseContent
        confirmationCount
      }
    }
  `;
};

//for the FULLY CONFIRMED page
export const GQL_VERSES_Fully_Confirmed = () => {
  return gql`
    query ($limit: Int!, $offset: Int!) {
      verses(orderBy: verseId, orderDirection: asc, first: $limit, skip: $offset, where: { confirmed: true }) {
        id
        verseId
        chapterNumber
        verseNumber
        verseContent
      }
    }
  `;
};

//returns last verse added
//for use on the Add Verses page
export const GQL_VERSE_Last_Added = () => {
  return gql`
    query {
      verses(first: 1, orderBy: verseId, orderDirection: desc) {
        verseId
        chapterNumber
        verseNumber
        verseContent
      }
    }
  `;
};
