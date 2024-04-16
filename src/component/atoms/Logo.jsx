const Logo = ({ sizeImg, sizeText }) => {
    return(
        <div className="flex items-center justify-center">
            <img src={"https://i.ibb.co/6PqZqwL/FC-Logo.png"} className={`w-${sizeImg} h-auto`} alt="Logo Fortunate Coffee"></img>
            <h1 className={`flex leading-normal text-[#00864B] text-${sizeText} text-center w-20`}>Fortunate Coffee</h1>
        </div>
    );
}

export default Logo;