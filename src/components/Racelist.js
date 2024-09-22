
import { useState } from 'react';
import races from '../data/races.json';
import { RaceSummary } from './Racesummary';
import Flag from 'react-flagkit'; 
import Select from 'react-select';



export default function Racelist() {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [sortDirection, setSortDirection] = useState('descending');

  const countryOptions = races.reduce((options, race) => {
    if (!options.find(option => option.value === race.countrycode)) {
      options.push({ value: race.countrycode, label: <span><Flag country={race.countrycode} /></span> });
    }
    return options;
  }, []);




  const handleCountryChange = (selectedOptions) => {
    setSelectedCountries(selectedOptions.map(option => option.value));
  };



  const filteredTracks = races.filter(race => {
    const meetsCountryCriteria = selectedCountries.length === 0 || selectedCountries.includes(race.countrycode);
    return meetsCountryCriteria;
  });

    // Sort the filtered tracks based on the selected sort option and direction
    const sortedTracks = filteredTracks.sort((a, b) => {
        let comparison = 0;
        switch (sortOption) {
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
      <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="form-select form-select-lg mb-1"
            aria-label=".form-select-lg example"
        >
            <option value="">Sortuj</option>
            <option value="date">Data</option>
            <option value="country">Kraj</option>
        </select>
        <button
            onClick={() => toggleSortDirection()}
            className="btn border-black text-black bg-transparent hover:bg-transparent hover:border-oceanBlue hover:text-oceanBlue mb-1 ml-2"
        >
            {sortDirection === 'ascending' ? '↑' : '↓'}
        </button>
      {sortedTracks.map((race, index) => (
        <RaceSummary key={race.rank} {...race} />
      ))}
    </div>
  );
}

