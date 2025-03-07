import { useEffect, useState } from "react";
import CardDetail from "./components/CardDetail";
import Cards from "./components/Cards";
import "./App.css";

function App() {
  const [Characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [page, setPage] = useState(1);
  const [charOffset, setCharOffset] = useState(1);
  
  useEffect(() => {
    fetchCharacters(page);
    setCharOffset((page-1)*10+1); // this is basically the same thing I did earlier lol
    // but I did find out that #17 from the api does not load and somehow shifts all of the id's by one
    // because it loads as #18
  }, [page])
  
  const fetchCharacters = async (page) => {
    // let s = await fetch(`https://swapi.dev/api/people/schema`);
    // console.log(s);
    let res = await fetch(`https://swapi.dev/api/people/?page=${page}`);
    let data = await res.json();
    console.log(data);
    setCharacters(data.results);
  }
  
  const fetchCharacterDetails = async (index) => {
    console.log(index+charOffset);
    let res = await fetch(`https://swapi.dev/api/people/${index+charOffset}`);
    // let res = await fetch(`https://swapi.dev/api/people/?search=${index}}`);
    let data = await res.json();
    console.log(index,data.name,res);
    (data && setSelectedCharacter(data)) || setSelectedCharacter(null);
  }
  
  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
    setSelectedCharacter(null);
  }
  
  const handleBack = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
      setSelectedCharacter(null);
    }
  }
  
  return (
    <div className="App">
      <h1>Star Wars Characters</h1>
      <div className="main-container ">
        <div>
          <Cards
            characters={Characters}
            onCharacterClick={fetchCharacterDetails}
          />
          <div>
            <button onClick={handleBack} disabled={page === 1}>Back</button>
            <button onClick={handleNext}>Next</button>
            {selectedCharacter && <CardDetail character={selectedCharacter} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
