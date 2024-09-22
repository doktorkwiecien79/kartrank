
import { useState } from 'react';
import tracks from '../data/tracks.json';
import { TrackSummary } from './Tracksummary';
import Flag from 'react-flagkit'; 
import Select from 'react-select';



export default function Tracklist() {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [minScore, setMinScore] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [sortDirection, setSortDirection] = useState('descending');

  const countryOptions = tracks.reduce((options, track) => {
    if (!options.find(option => option.value === track.countrycode)) {
      options.push({ value: track.countrycode, label: <span><Flag country={track.countrycode} /></span> });
    }
    return options;
  }, []);




  const handleCountryChange = (selectedOptions) => {
    setSelectedCountries(selectedOptions.map(option => option.value));
  };

  const handleScoreChange = (e) => {
    setMinScore(e.target.value);
  };

  const filteredTracks = tracks.filter(track => {
    const meetsCountryCriteria = selectedCountries.length === 0 || selectedCountries.includes(track.countrycode);
    const meetsScoreCriteria = !minScore || track.score >= parseInt(minScore, 10);
    return meetsCountryCriteria && meetsScoreCriteria;
  });

    // Sort the filtered tracks based on the selected sort option and direction
    const sortedTracks = filteredTracks.sort((a, b) => {
        let comparison = 0;
        switch (sortOption) {
            case 'score':
            comparison = a.score - b.score;
            break;
            case 'date':
            comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
            break;
            case 'country':
            comparison = a.countrycode.localeCompare(b.countrycode);
            break;
            default:
            // Add a default case to handle when no sort option is selected
            comparison = 0;
        }
        // Reverse the comparison result if sort direction is ascending
        return sortDirection === 'ascending' ? comparison : -comparison;
        });

    const toggleSortDirection = () => {
        setSortDirection(sortDirection === 'ascending' ? 'descending' : 'ascending');
        };

  return (
    <div>
      <Select
        options={countryOptions}
        isMulti
        onChange={handleCountryChange}
        placeholder="Wybierz kraje"
        className="mb-4"
        getOptionLabel={(option) => option.label}
      />
      <input
        type="number"
        value={minScore}
        onChange={handleScoreChange}
        className="form-input"
        placeholder="Podaj minimalną ocenę"
      />
      <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="form-select form-select-lg mb-1"
            aria-label=".form-select-lg example"
        >
            <option value="">Sortuj</option>
            <option value="score">Ocena</option>
            <option value="date">Data</option>
            <option value="country">Kraj</option>
        </select>
        <button
            onClick={() => toggleSortDirection()}
            className="btn border-black text-black bg-transparent hover:bg-transparent hover:border-oceanBlue hover:text-oceanBlue mb-1 ml-2"
        >
            {sortDirection === 'ascending' ? '↑' : '↓'}
        </button>
      {sortedTracks.map((track, index) => (
        <TrackSummary key={track.rank} {...track} />
      ))}
    </div>
  );
}

