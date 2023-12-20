import { Autocomplete, Box } from '@mantine/core';
import './SearchBar.scss';
import { IconSearch } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeSearchInputValue, search } from '../../store/reducers/search';

function SearchBar() {
  const icon = <IconSearch />;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const searchTerm = useAppSelector((state) => state.search.searchTerm);
  const errorMsg = useAppSelector((state) => state.search.error);
  const data = useAppSelector((state) => state.search.searchResults);

  const events = data.events
    ? data.events.map((event) => ({
        label: event.title,
        value: event.title,
        url: `/event/${event.title_slug}`,
      }))
    : [];
  const users = data.users
    ? data.users.map((user) => ({
        label: user.username,
        value: user.username,
        url: `/profile/${user.username}`,
      }))
    : [];

  const teams = data.teams
    ? data.teams.map((team) => ({
        label: team.name,
        value: team.name,
        url: `/team/${team.id}`,
      }))
    : [];

  const findItemByUrl = (value: string) => {
    // Combine all items into one array
    const allItems = [...events, ...users, ...teams];

    return allItems.find((item) => item.label === value);
  };

  const handleChangeSearchValue = (newValue: string) => {
    dispatch(changeSearchInputValue(newValue));

    if (newValue.trim() !== '') {
      dispatch(search(newValue));
    }

    const selectedItem = findItemByUrl(newValue);
    if (selectedItem && selectedItem.url) {
      navigate(selectedItem.url);
    }
  };

  return (
    <>
      <Autocomplete
        className="search-bar"
        placeholder="Recherche un event, joueur ..."
        aria-label="Barre de recherche"
        leftSection={icon}
        value={searchTerm}
        onChange={handleChangeSearchValue}
        data={[
          { group: 'Events', items: events },
          { group: 'Utilisateurs', items: users },
          { group: 'Teams', items: teams },
        ]}
      />
      {errorMsg && <Box>{errorMsg}</Box>}
    </>
  );
}

export default SearchBar;
