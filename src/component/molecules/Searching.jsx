import SearchingButton from '../atoms/SearchingButton';
import SearchingText from '../atoms/SearchingText';

const Searching = () => {
    return(
        <div className='flex'>
            <SearchingButton />
            <div className="ms-3">
                <SearchingText />
            </div>
        </div>
    )
}

export default Searching;