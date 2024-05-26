const Logo = ({ sizeImg, sizeText }) => {
    return(
        <div className="flex items-center justify-center">
            <img src={"https://ik.imagekit.io/fndsjy/Fortunate_Coffee/FC%20Logo.png?updatedAt=1716675738839"} className={`w-${sizeImg} h-auto`} alt="Logo Fortunate Coffee"></img>
            <h1 className={`flex leading-normal text-[#00864B] text-${sizeText} text-center w-20`}>Fortunate Coffee</h1>
        </div>
    );
}

export default Logo;