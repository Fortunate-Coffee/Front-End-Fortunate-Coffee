const SearchingText = ({ value, onChange }) => {
    return (
        <div>
            <input 
                type="text" 
                value={value} 
                onChange={onChange}
                className="w-full truncate bg-inherit placeholder:text-black px-2 placeholder:font-medium block hover:border-none focus:outline-none" 
                placeholder="Search" 
            />
        </div>
    );
}

export default SearchingText;
