import img from "/img/icon-2.png";
import {
  React,
  WithSupport,
} from '@/component/login-registration-supplier/import-login-registration-supplier'

function FinalRegistration({ stage5 }) {
  return (
    <section
      style={{ display: stage5 == false ? "flex" : "none" }}
      className="w-full h-full flex-wrap justify-center items-center"
    >
      <article className="w-[80%] lg:w-[40%] h-[90%] flex flex-wrap justify-center items-center">
        <div className="w-full h-[80%] flex flex-wrap justify-center content-center">
          <figure className="w-[120px] h-[100px] lg:w-[160px] lg:h-[140px]">
            <img src={img} alt="" className="w-full h-full " />
          </figure>
          <p className="w-full text-center py-2 text-custom-green text-[2rem] lg:text-[2.5rem] font-semibold">
            اطلاعات با موفقیت ثبت شد
          </p>
          <p className="w-full text-center py-2 text-white text-[1.2rem]">
            با توجه به اهمیت اطلاعات ثبت شده توسط شما؛ همکاران ما پس از بررسی
            نسبت به فعال سازی حساب کاربری شما اقدام خواهند کرد
          </p>
        </div>
        <div className="w-full h-[20%] flex flex-wrap justify-center items-center">
          <WithSupport />
        </div>
      </article>
    </section>
  );
}

export default FinalRegistration;
