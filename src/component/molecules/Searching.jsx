import SearchingButton from '../atoms/SearchingButton';
import SearchingText from '../atoms/SearchingText';

const Searching = () => {
    return(
        <div className='flex'>
            <SearchingButton />
            <div className="ms-3 w-full">
                <SearchingText />
            </div>
        </div>
    )
}

export default Searching;