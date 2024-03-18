import { reqSauce } from "../../menu";

const ReqOrder = () => {
    return(
        <form>
            {reqSauce.map((sauce, index) => (
                <div key={index}>
                    <input type="radio" id={sauce.id} name={sauce.name} value={sauce.value} className="mt-2 me-3" />
                    <label htmlFor={sauce.id}>
                        {sauce.value}
                    </label>
                </div>
            ))}
        </form>
    );
}

export default ReqOrder;