import { useState } from "react";
import styled from "styled-components";
import { CategoryViewer as RawCategoryViewer } from "./Components/CategoryViewer";
import { CATEGORIES, Category } from "./Lib/swapApi";

const Body = styled.div`
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 18pt;
  background-color: #081e2f;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

const Container = styled.div`
  max-width: 1100px;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #bbe6f6;
  padding: 20px;
`;

const Head = styled.h1`
  align-self: center;
  color: #081e2f;
  line-height: 160%;
`;

const SearchBar = styled.input`
  background: rgb(255, 255, 255);
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 255, 255, 0.7) 7%,
    rgba(255, 255, 255, 0.5) 25%,
    rgba(255, 255, 255, 0.3) 48%,
    rgba(255, 255, 255, 0.5) 55%,
    rgba(255, 255, 255, 0.6) 91%,
    rgba(255, 255, 255, 0.9) 100%
  );
  border-color: #43689c;
  border-width: 0px;
  border-radius: 10px;
  padding: 12px 15px;
  font-size: 18pt;
  max-width: 700px;
  width: 100%;
  align-self: center;
  margin-bottom: 30px;
  box-shadow:
    rgba(0, 106, 255, 0.25) 0px 13px 27px -5px,
    rgba(0, 106, 255, 0.3) 0px 8px 16px -8px;
`;

const CategoryViewer = styled(RawCategoryViewer)<{ isHidden?: boolean }>`
  width: ${({ isBrief }) => (isBrief ? "calc(50% - 5px)" : "100%")};
  margin: 5px 0;

  /* we are hidding non selected categories and not unmounting them
     so they do not re-fetch data when we go back and display them again; */
  ${({ isHidden }) => isHidden && "display:none;"}

  @media screen and (max-width: 550px) {
    width: 100%;
  }
`;

const CategoryContainer = styled.div<{ $shouldStretch: boolean }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-grow: 1;
  align-content: ${({ $shouldStretch }) =>
    $shouldStretch ? "stretch" : "flex-start"};
`;

function App() {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  const handleBackClick = () => {
    setSelectedCategory(undefined);
  };

  return (
    <Body>
      <Container>
        <Head>Search Star Wars</Head>
        <SearchBar
          value={searchText}
          placeholder="Type to Search..."
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <CategoryContainer $shouldStretch={!!selectedCategory}>
          <CategoryViewer
            isHidden={
              selectedCategory && selectedCategory !== CATEGORIES.people
            }
            key={CATEGORIES.people}
            category={CATEGORIES.people}
            isBrief={selectedCategory !== CATEGORIES.people}
            searchText={searchText}
            onClick={setSelectedCategory}
            onBackClick={handleBackClick}
          />
          <CategoryViewer
            isHidden={selectedCategory && selectedCategory !== CATEGORIES.films}
            key={CATEGORIES.films}
            category={CATEGORIES.films}
            isBrief={selectedCategory !== CATEGORIES.films}
            searchText={searchText}
            onClick={setSelectedCategory}
            onBackClick={handleBackClick}
          />
          <CategoryViewer
            isHidden={
              selectedCategory && selectedCategory !== CATEGORIES.planets
            }
            key={CATEGORIES.planets}
            category={CATEGORIES.planets}
            isBrief={selectedCategory !== CATEGORIES.planets}
            searchText={searchText}
            onClick={setSelectedCategory}
            onBackClick={handleBackClick}
          />
          <CategoryViewer
            key={CATEGORIES.species}
            isHidden={
              selectedCategory && selectedCategory !== CATEGORIES.species
            }
            category={CATEGORIES.species}
            isBrief={selectedCategory !== CATEGORIES.species}
            searchText={searchText}
            onClick={setSelectedCategory}
            onBackClick={handleBackClick}
          />
          <CategoryViewer
            key={CATEGORIES.starships}
            isHidden={
              selectedCategory && selectedCategory !== CATEGORIES.starships
            }
            category={CATEGORIES.starships}
            isBrief={selectedCategory !== CATEGORIES.starships}
            searchText={searchText}
            onClick={setSelectedCategory}
            onBackClick={handleBackClick}
          />
          <CategoryViewer
            key={CATEGORIES.vehicles}
            isHidden={
              selectedCategory && selectedCategory !== CATEGORIES.vehicles
            }
            category={CATEGORIES.vehicles}
            isBrief={selectedCategory !== CATEGORIES.vehicles}
            searchText={searchText}
            onClick={setSelectedCategory}
            onBackClick={handleBackClick}
          />
        </CategoryContainer>
      </Container>
    </Body>
  );
}

export default App;
