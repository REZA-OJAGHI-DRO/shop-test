import { Icon } from "@iconify/react";

function Button({ type, value, click, styleButton, icon, disabled }) {
  const style = {
    style1:
      "bg-custom-green shadow-custom-1 h-[50px] py-1 w-full hover:scale-95  transition-all duration-300 text-white rounded-2xl px-5 text-[1.3rem] md:text-[2rem] flex justify-center items-center",
    style2:
      "bg-custom-bg-button py-1 shadow-inner-custom-2 h-[50px] py-1 w-[100%] lg:w-[30%]  text-white rounded-2xl px-5 text-[1.2rem] lg:text-[1.5rem] flex justify-center items-center",
    style3:
      "bg-custom-green shadow-custom-6 py-1 w-[100%] lg:w-[30%] h-[50px] py-1 text-white rounded-2xl px-5 text-[1.2rem] lg:text-[1.5rem] flex justify-center items-center",
    style4:
      "bg-custom-gradient-1 shadow-custom-6 h-[50px]  lg:my-0 py-1 w-[100%] lg:w-[30%] hover:scale-95 transition-all duration-300 text-white rounded-2xl px-5 text-[1.2rem] lg:text-[1rem] flex justify-center items-center",
    style5:
      "bg-custom-green shadow-custom-1 w-[100%] h-[50px] xl:h-[40px] hover:scale-95 transition-all py-3 mb-2 sm:py-1 duration-300 text-white rounded-2xl px-5 text-[1.2rem] md:text-[1.2rem] flex justify-center items-center",
    style6:
      "w-fit px-2 rounded-full text-white shadow-custom-7 bg-[rgb(255,255,255,.2)] text-[.9rem] flex justify-center items-center hover:scale-95  transition-all duration-300",
    style7:
      "px-5 h-[35px] bg-[rgb(28,100,242)] rounded-lg hover:scale-95  transition-all duration-300 shadow-custom-6 text-white",
    style8:
      "w-[100%] h-[50px] xl:h-[50px] bg-custom-green shadow-custom-6 py-2 px-2 hover:scale-95  transition-all duration-300 text-white rounded-2xl text-[1.3rem] md:text-[1.3rem] flex justify-center items-center",
    style9:
      " h-[20px] xl:h-[20px] bg-custom-green shadow-custom-6  px-2 hover:scale-95  transition-all duration-300 text-white rounded-2xl text-[.9rem] md:text-[.9rem] flex justify-center items-center",
    style10:
      " w-[100%] h-[35px] bg-custom-green shadow-custom-6 px-2 hover:scale-95  transition-all duration-300 text-white rounded-2xl text-[1.1rem] flex justify-center items-center",
    style11:
      " w-[100%] h-[40px] bg-[#B886FF] shadow-custom-6 px-2 text-white rounded-2xl text-[1.1rem] flex justify-center items-center",
    style12:
      " w-[100%] h-[40px] bg-[#969696] shadow-inner-custom-2 px-2 text-white rounded-2xl text-[1.1rem] flex justify-center items-center",
    style13:
      "w-[150px] h-[40px] xl:h-[40px] bg-red-500 shadow-custom-6 py-2 px-2 hover:scale-95  transition-all duration-300 text-white rounded-2xl text-[1.3rem] md:text-[1.3rem] flex justify-center items-center",
    style14:
      "w-[150px] h-[40px] xl:h-[40px] bg-custom-green shadow-custom-6 py-2 px-2 hover:scale-95  transition-all duration-300 text-white rounded-2xl text-[1.3rem] md:text-[1.3rem] flex justify-center items-center",
    style15:
      " w-[48%] h-[30px] bg-[#B27BFF] shadow-custom-11 px-2 hover:scale-95 transition-all duration-300 text-white rounded-md text-[.8rem] flex justify-center items-center",
    style16:
      " w-[48%] h-[30px] bg-[rgb(217,217,217)] shadow-custom-6 px-2 hover:scale-95  transition-all duration-300 text-zinc-600 rounded-md text-[.8rem] flex justify-center items-center",
    style17:
      "disabled:opacity-70 disabled:scale-100 w-[100%] h-[35px] bg-[#4d4d4d7f] shadow-custom-6 px-2 hover:scale-95  transition-all duration-300 text-zinc-100 rounded-md text-[1rem] flex justify-center items-center",
    style18:
      " w-[100%] h-[35px] bg-[#B27BFF] shadow-custom-11 px-2 hover:scale-95 transition-all duration-300 text-white rounded-md text-[.8rem] flex justify-center items-center",
    style19:
      "bg-custom-bg-button py-1 shadow-inner-custom-2 h-[30px] py-1 w-[45%] text-white rounded-2xl px-5 text-[1rem] flex justify-center items-center",
    style20:
      "bg-custom-green shadow-custom-6 py-1 w-[45%]  h-[30px] py-1 text-white rounded-2xl px-5 text-[1rem]  flex justify-center items-center",
    style21:
      " w-[40px] h-[40px] bg-[#B27BFF] shadow-custom-11 hover:scale-95 transition-all duration-300 text-white rounded-md text-[1.8rem] flex justify-center content-center",
    style22:
      "disabled:opacity-70 disabled:scale-100 w-[100%] h-[40px] bg-custom-green shadow-custom-6 px-2 hover:scale-95  transition-all duration-300 text-zinc-100 rounded-md text-[1rem] flex justify-center items-center",
    style23:
      " w-[100%] h-[35px] bg-custom-green shadow-custom-6 px-2 hover:scale-95  transition-all duration-300 text-zinc-100 rounded-md text-[1rem] flex justify-center items-center",
    style24:
      " w-[100%] h-[35px] bg-[#B27BFF] shadow-inner-custom-2 px-2 text-white rounded-md text-[.8rem] flex justify-center items-center",
    style25:
      " h-[35px] disabled:opacity-70 disabled:scale-100 bg-[#23405D] shadow-inner-custom-1 px-6 hover:scale-95  transition-all duration-300 text-white rounded-md text-[.7rem] flex justify-center items-center",
    style26:
      " h-[35px] disabled:opacity-70 disabled:scale-100 shadow-inner-custom-1 px-6 hover:scale-95  transition-all duration-300 text-[#23405D] border-2 border-[#23405D] rounded-md text-[.7rem] flex justify-center items-center",
  };
  return (
    // <div className='bg-custom-bg-2'></div>
    <button
      type={type ? type : "button"}
      onClick={click}
      disabled={disabled}
      className={
        styleButton == 1
          ? style.style1
          : styleButton == 2
          ? style.style2
          : styleButton == 3
          ? style.style3
          : styleButton == 4
          ? style.style4
          : styleButton == 5
          ? style.style5
          : styleButton == 6
          ? style.style6
          : styleButton == 7
          ? style.style7
          : styleButton == 8
          ? style.style8
          : styleButton == 9
          ? style.style9
          : styleButton == 10
          ? style.style10
          : styleButton == 11
          ? style.style11
          : styleButton == 12
          ? style.style12
          : styleButton == 13
          ? style.style13
          : styleButton == 14
          ? style.style14
          : styleButton == 15
          ? style.style15
          : styleButton == 16
          ? style.style16
          : styleButton == 17
          ? style.style17
          : styleButton == 18
          ? style.style18
          : styleButton == 19
          ? style.style19
          : styleButton == 20
          ? style.style20
          : styleButton == 21
          ? style.style21
          : styleButton == 22
          ? style.style22
          : styleButton == 23
          ? style.style23
          : styleButton == 24
          ? style.style24
          : styleButton == 25
          ? style.style25
          : style.style26
      }
    >
      {value}{" "}
      <Icon
        icon="typcn:plus"
        className={`${icon == true ? "flex" : "hidden"}`}
      ></Icon>
    </button>
  );
}

export default Button;
