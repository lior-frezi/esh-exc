import styled from "styled-components";
import { CATEGORIES, Category, getUrl } from "../Lib/swapApi";
import { useEffect, useState } from "react";
import { debounce } from "../Lib/debounce";
import axios from "axios";
import { PuffLoader } from "react-spinners";
import { PeopleData, PeopleGrid } from "./PeopleGrid";
import backButtonImage from "../assets/wm-back.svg";

const Body = styled.div<{ $isClickable?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #6183a6;
  border-radius: 10px;

  ${({ $isClickable }) =>
    $isClickable &&
    `cursor: pointer;
    line-height: 1.2;
    &:hover {
      background-color: #688db2;
    }`}
`;

const Title = styled.h2`
  font-size: 18pt;
  padding: 0;
  margin: 5px 0;
  display: flex;
  align-items: flex-start;
`;

const LoadingContainer = styled.div`
  display: flex;
  font-size: 18pt;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 3.6em;
`;

const BackButton = styled.button`
  background-color: transparent;
  width: 42px;
  border-width: 0px;
  &:hover {
    cursor: pointer;
  }
`;

export type CategoryViewerParams = {
  category: Category;
  searchText: string;
  isBrief?: boolean;
  onClick: (category?: Category) => void;
  onBackClick: () => void;
  className?: string;
};

type Result = { name?: string; url: string; title: string };

function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function CategoryViewer({
  category,
  searchText,
  onClick,
  onBackClick,
  isBrief,
  className,
}: CategoryViewerParams) {
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<Result[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    setIsLoading(true);

    debounce(() => {
      axios
        .get(getUrl(category, searchText), { signal })
        .then((response) => {
          if (!signal.aborted) {
            setResults(response.data.results);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          if (!signal.aborted) {
            setError(error);
            setIsLoading(false);
          }
        });
    })();

    return () => {
      controller.abort();
    };
  }, [category, searchText]);

  return (
    <Body
      className={className}
      onClick={() => isBrief && onClick(category)}
      $isClickable={isBrief && !!onClick}
    >
      <Title>
        {!isBrief && (
          <BackButton onClick={onBackClick}>
            <img src={backButtonImage} />
          </BackButton>
        )}
        {capitalize(category)}
      </Title>
      {isLoading && (
        <LoadingContainer>
          <PuffLoader />
        </LoadingContainer>
      )}
      {error && <div>error: {error?.toString()}</div>}
      {!isLoading &&
        !error &&
        (isBrief
          ? results
              .slice(0, 3)
              .map((result) => (
                <div key={result.url}>{result.name || result.title}</div>
              ))
          : category === CATEGORIES.people && (
              <PeopleGrid
                data={results as unknown as PeopleData[]}
                onBackClick={onBackClick}
              />
            ))}
    </Body>
  );
}
