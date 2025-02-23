import React, { useState, useCallback } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Badge,
  Tooltip,
  Collapse,
} from '@mui/material';
import {
  Search as SearchIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { debounce } from 'lodash';

interface SearchBarProps {
  onSearch: (term: string) => void;
  matchCount: number;
  currentMatchIndex: number;
  onNavigateMatch: (direction: 'prev' | 'next') => void;
  className?: string;
}

const SearchContainer = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const SearchContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1),
}));

const SearchField = styled(TextField)(() => ({
  flex: 1,
  '& .MuiInputBase-root': {
    height: 36,
  },
}));

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  matchCount,
  currentMatchIndex,
  onNavigateMatch,
  className = '',
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      onSearch(term);
    }, 300),
    [onSearch]
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = event.target.value;
    setSearchTerm(newTerm);
    debouncedSearch(newTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <SearchContainer className={className}>
      <Collapse in={true} timeout={300}>
        <SearchContent>
          <SearchField
            size="small"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
              endAdornment: searchTerm && (
                <IconButton size="small" onClick={handleClear}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              ),
            }}
          />
          {matchCount > 0 && (
            <>
              <Tooltip title="Previous match">
                <IconButton
                  size="small"
                  onClick={() => onNavigateMatch('prev')}
                  disabled={currentMatchIndex === 0}
                >
                  <KeyboardArrowUpIcon />
                </IconButton>
              </Tooltip>
              <Badge
                badgeContent={`${currentMatchIndex + 1}/${matchCount}`}
                color="primary"
              />
              <Tooltip title="Next match">
                <IconButton
                  size="small"
                  onClick={() => onNavigateMatch('next')}
                  disabled={currentMatchIndex === matchCount - 1}
                >
                  <KeyboardArrowDownIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
        </SearchContent>
      </Collapse>
    </SearchContainer>
  );
}; 