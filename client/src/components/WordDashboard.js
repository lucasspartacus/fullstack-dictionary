import React, { useState } from 'react';
import './WordDashboard.css';
import heart from '../img/heart.png';
import heartfull from '../img/heart-full.png';
import search from '../img/search.png';
const DICTIONARY_API_BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

const WordDashboard = () => {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [pronunciation, setPronunciation] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [searchedWords, setSearchedWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [activeTab, setActiveTab] = useState('history'); // State to manage active tab
  const [selectedWord, setSelectedWord] = useState(''); // State to manage selected word for detailed view

  const fetchWordDefinition = async (word) => {
    try {
      console.log(`Making request for definition of ${word}...`);
      const response = await fetch(`${DICTIONARY_API_BASE_URL}${word}`);
      const json = await response.json();
      
      // Extract the first definition and pronunciation
      const meanings = json[0]?.meanings || [];
      const phonetics = json[0]?.phonetics || [];
      const firstMeaning = meanings.length > 0 ? meanings[0].definitions[0]?.definition : 'No definition found';
      const firstPhonetic = phonetics.length > 0 ? phonetics[0].text : 'No pronunciation found';
      
      return { definition: firstMeaning, pronunciation: firstPhonetic };
    } catch (error) {
      console.error('Error fetching definition:', error);
      return { definition: 'Error fetching definition', pronunciation: 'Error fetching pronunciation' };
    }
  };

  const getWordDefinition = async () => {
    if (!word) {
      alert('Error: You must enter a word to fetch');
      return;
    }

    const { definition, pronunciation } = await fetchWordDefinition(word);
    setDefinition(definition);
    setPronunciation(pronunciation);

    // Update searched words history
    const newSearchedWords = [...searchedWords, { word, definition, pronunciation }];
    setSearchedWords(newSearchedWords);
    setCurrentIndex(newSearchedWords.length - 1);
  };

  const addToFavorites = () => {
    if (word && definition) {
      setFavorites([...favorites, { word, definition, pronunciation }]);
      setWord('');
      setDefinition('');
      setPronunciation('');
    } else {
      alert('Error: No word definition to add');
    }
  };

  const removeFromFavorites = (wordToRemove) => {
    setFavorites(favorites.filter(fav => fav.word !== wordToRemove));
  };

  const goToLastSearchedWord = () => {
    if (currentIndex > 0) {
      const previousIndex = currentIndex - 1;
      const previousWord = searchedWords[previousIndex];
      setWord(previousWord.word);
      setDefinition(previousWord.definition);
      setPronunciation(previousWord.pronunciation);
      setCurrentIndex(previousIndex);
    }
  };

  const goToNextSearchedWord = () => {
    if (currentIndex < searchedWords.length - 1) {
      const nextIndex = currentIndex + 1;
      const nextWord = searchedWords[nextIndex];
      setWord(nextWord.word);
      setDefinition(nextWord.definition);
      setPronunciation(nextWord.pronunciation);
      setCurrentIndex(nextIndex);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleWordClick = async (word) => {
    setSelectedWord(word);
    const { definition, pronunciation } = await fetchWordDefinition(word);
    setDefinition(definition);
    setPronunciation(pronunciation);
  };

  return (
    <div id="word-dashboard">
      <div id='leftside'>
      <h1>Searc the definition for a word!</h1>
      <div id='navbar'>
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Enter word"
      />
      <img className='imgsearch' height={'50px'} width={'50px'} src={search} alt="search" onClick={getWordDefinition} />
      <img className='imgheart' height={'50px'} width={'50px'} src={heart} alt="heart" onClick={addToFavorites} />

      </div>
      
    <div className='centered-div'>
       <p> {word} <br/> {pronunciation}</p>
    </div>

      <div class="audio-player">
        <audio controls>
            
            Your browser does not support the audio element.
        </audio>
    </div>

      <div id="definition">
        <h1>Meanings:</h1>
        {definition && <p> {definition}</p>}
        {pronunciation && <p><strong>Pronunciation:</strong> {pronunciation}</p>}
      </div>

      <button onClick={goToLastSearchedWord} disabled={currentIndex <= 0}>
        Volta 
      </button>
      <button onClick={goToNextSearchedWord} disabled={currentIndex >= searchedWords.length - 1}>
       Proximo
      </button>
      </div>
      
     <div id='rigthside'>
        <div className="tabs">
          <button
            className={activeTab === 'history' ? 'active' : ''}
            onClick={() => handleTabChange('history')}
          >
            History
          </button>
          <button
            className={activeTab === 'favorites' ? 'active' : ''}
            onClick={() => handleTabChange('favorites')}
          >
            Favorites
          </button>
        </div>

        {activeTab === 'history' && searchedWords.length > 0 && (
          <div id="searched-words">
            <h2>Searched Words</h2>
            <div className="grid">
              {searchedWords.map((entry, index) => (
                <div
                  key={index}
                  className="grid-item"
                  onClick={() => handleWordClick(entry.word)}
                >
                  <strong>{entry.word}</strong>
                  <p>{entry.definition}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'favorites' && favorites.length > 0 && (
          <div id="favorites">
            <h2>Favorites</h2>
            <div className="grid">
              {favorites.map((fav, index) => (
                <div
                  key={index}
                  className="grid-item"
                  onClick={() => handleWordClick(fav.word)}
                >
                  <strong>{fav.word}</strong>
                  <p>{fav.definition}</p>

                  <img height={'50px'} width={'50px'} src={heartfull} alt="heart" onClick={() => removeFromFavorites(fav.word)}/>

                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WordDashboard;
