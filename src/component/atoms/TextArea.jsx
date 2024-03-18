const TextArea = () => {
    return(
        <div>
            <textarea
                id="textarea"
                name="message"
                rows="2"
                className="w-full my-4 px-3 py-2 leading-normal border outline placeholder-black rounded-2xl focus:outline-none focus:ring focus:border-[#4caf50]"
                placeholder="Catatan :"
            />
        </div>
    );
}

export default TextArea;