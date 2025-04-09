
import svg from '/img/svg-1.svg'

function withSupport() {
    return (
        <>
        <button className=" text-[1rem] text-white lg:text-[1rem] flex gap-2 font-semibold">
         <span className="text-custom-green">
             تماس با پشتیبانی
            </span>
            <img src={svg} className="w-[25px] h-[25px]" alt="" />
        </button>
        </>
      );
}

export default withSupport