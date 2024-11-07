type SearchInputProps = {
    placeholder?: string;
    onChange?: (value: string) => void;
    value: string;
};

const SearchInput = ({
    placeholder = 'Search...',
    onChange,
    value,
}: SearchInputProps) => {
    const handleChange = (value: string) => {
        if (onChange) {
            onChange(value);
        }
    };

    return (
        <div className="flex justify-center p-4">
            <input
                type="text"
                placeholder={placeholder}
                onChange={(e) => handleChange(e.target.value)}
                value={value}
                className="border border-gray-300 rounded-lg p-2 w-96"
                data-testid="search-input"
            />
        </div>
    );
};

export { SearchInput, type SearchInputProps };
