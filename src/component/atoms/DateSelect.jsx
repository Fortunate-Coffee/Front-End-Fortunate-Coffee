const DateSelect = () => {
    const dates = [
        {text: 'Today'},
        {text: 'Last 7 days'},
        {text: 'Last 15 days'},
        {text: 'Last 30 days'},
        {text: 'Last 3 months'},
    ];

    return(
        <div>
            <label htmlFor="selectOption" className="font-medium me-6 text-[#43745B]">Date</label>
            <select id="selectOption" name="selectOption" className="border border-[#43745B] rounded-xl shadow-xl p-2 px-3 me-2">
                {dates.map((date, index) => (
                    <option key={index} value={date.text}>{date.text}</option>
                ))}
            </select>
        </div>
    );
}

export default DateSelect;