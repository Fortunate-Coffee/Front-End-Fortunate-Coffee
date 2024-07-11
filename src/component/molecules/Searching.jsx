import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchingButton from '../atoms/SearchingButton';
import SearchingText from '../atoms/SearchingText';

const Searching = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    const handleSearchChange = async (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 1) { // Trigger search when the input length is greater than 1
            try {
                const formattedQuery = encodeURIComponent(value.toLowerCase()); // Convert to lowercase and encode URI
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/find-menu/search?query=${formattedQuery}`);
                const result = await response.json();
                if (response.ok) {
                    setResults(result);
                } else {
                    console.error(result.error.message);
                }
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        } else {
            setResults([]);
        }
    };

    const handleResultClick = async (menuName) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/category`);
            const result = await response.json();
            if (response.ok) {
                const categoryName = result.categoryName;
                navigate(`/detail/${encodeURIComponent(categoryName)}/${encodeURIComponent(menuName)}`);
            } else {
                console.error(result.error.message);
            }
        } catch (error) {
            console.error('Error fetching category name:', error);
        }
    };

    return (
        <div className='flex w-[92%] relative'>
            <SearchingButton />
            <div className="ms-3 w-full">
                <SearchingText value={query} onChange={handleSearchChange} />
                {results.length > 0 && (
                    <div className="absolute bg-white shadow-lg w-full max-h-48 overflow-y-auto z-50">
                        {results.map((item) => (
                            <div 
                                key={item.menu_id} 
                                className="p-2 cursor-pointer hover:bg-gray-200" 
                                onClick={() => handleResultClick(item.menu_name)}
                            >
                                {item.menu_name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Searching;
