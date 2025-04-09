import MenuSidebar from "./menu-sidebar.jsx";
import {
  React,
  useCallback,
  useEffect,
  useState,
  Button,
  loadUserGetAllPosition,
  setTimerSide,
  useSelector,
  useDispatch,
  GetCookie,
  useRef,
} from "@/component/management-panel/import-management.js";
import { PenIcon, UserPlusIcon } from "lucide-react";
import { fileInputRestrictionsConstant } from "@/lib/constants.ts";
import { toast } from "@/hooks/use-toast.ts";
import fileService from "@/services-v2/file-service.ts";
import { useMutation, useQuery } from "@tanstack/react-query";
import supplierService from "@/services-v2/supplier-service.ts";
import { useAuth } from "@/context/auth-context.tsx";
import { FileTypeEnum } from "@/types/file-types.ts";
import Spinner from "@/components/ui/spinner.tsx";

function Sidebar() {
  const [openNav, setOpenNav] = useState(true);
  const timer = useSelector((state) => state.product.timerSideBar);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.product.token);
  const chabk = useSelector((state) => state.product.chabk);
  useEffect(() => {
    let timer1;
    if (openNav == true) {
      timer1 = setTimeout(() => {
        dispatch(setTimerSide(true));
      }, 100);
    } else {
      timer1 = setTimeout(() => {
        dispatch(setTimerSide(false));
      }, 30);
    }
    return () => clearTimeout(timer1);
  }, [openNav, dispatch]);

  function deleteCookie(name) {
    document.cookie =
      name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  function clickLogOut() {
    deleteCookie("authToken");
    deleteCookie("role");
    deleteCookie("userId");
    window.location.reload();
  }

  const [roleCookie, setRoleCookie] = useState(GetCookie("role"));
  // *********loadUserGetAllPosition
  const { supplierData, setSupplierData } = useAuth();
  const [nameLogin, setNameLogin] = useState("");
  const [id, setId] = useState("");
  const UserGet = useCallback(() => {
    loadUserGetAllPosition(roleCookie, token, chabk, setId, setNameLogin);
  }, [roleCookie, token, chabk, setId, setNameLogin]);
  useEffect(() => {
    UserGet();
  }, [UserGet, id]);

  const profileFileInputRef = useRef();

  const uploadImageMutation = useMutation({
    mutationKey: ["upload-image"],
    mutationFn: fileService.uploadFile,
    onSuccess: (data) => {
      if (data.isSuccess) {
        setSupplierProfilePhoto.mutate({
          fileId: data.data,
          fileType: FileTypeEnum.SupplierProfile,
          supplierId: supplierData.id,
        });
      } else {
        toast({
          variant: "error",
          description: data.errors[0],
        });
      }
    },
    onError: (error) => {
      toast({
        variant: "error",
        description:
          error.message || "مشکلی در زمان ویرایش اطلاعات به وجود آمده است",
      });
    },
  });

  const setSupplierProfilePhoto = useMutation({
    mutationKey: ["set-profile-photo"],
    mutationFn: supplierService.updateProfilePhoto,
    onSuccess: (data) => {
      if (data.isSuccess) {
        updateSupplier.mutate({
          id: supplierData.id,
        });
        toast({
          variant: "success",
          description: "تصویر پروفایل با موفقیت بروزرسانی شد",
        });
      } else {
        toast({
          variant: "error",
          description: data.errors[0],
        });
      }
    },
    onError: (error) => {
      toast({
        variant: "error",
        description:
          error.message || "مشکلی در زمان ویرایش اطلاعات به وجود آمده است",
      });
    },
  });

  const updateSupplier = useMutation({
    mutationKey: ["get-profile"],
    mutationFn: supplierService.get,
    onSuccess: (data) => {
      if (data.isSuccess) {
        setSupplierData(data.data);
      }
    },
  });

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (!fileInputRestrictionsConstant.acceptedImages.includes(file.type)) {
      toast({
        variant: "error",
        description: fileInputRestrictionsConstant.imageTypeError,
      });
      return;
    }

    if (file.size >= fileInputRestrictionsConstant.acceptedFileSize) {
      toast({
        variant: `حجم فایل انتخابی نباید بیشتر از ${fileInputRestrictionsConstant.acceptedFileSize}مگابایت باشد `,
        description: fileInputRestrictionsConstant.imageTypeError,
      });
      return;
    }

    const imageUploadForm = new FormData();
    imageUploadForm.append("File", file);
    imageUploadForm.append("Type", FileTypeEnum.SupplierProfile);
    uploadImageMutation.mutate(imageUploadForm);
  };

  function triggerFileInput() {
    if (profileFileInputRef.current) profileFileInputRef.current.click();
  }

  return (
    <>
      <style>
        {`
      .boxFilter3{
      backdrop-filter:blur(10px);
      }
      `}
      </style>
      <aside
        className={`${
          openNav
            ? "w-[230px] lg:w-[265px] rounded-l-3xl"
            : "w-[60px] lg:w-[80px] rounded-3xl "
        } transition-all min-h-[100vh] duration-300 h-auto flex flex-wrap content-start overflow-hidden bg-custom-gradient-7 boxFilter3`}
      >
        <div className="w-full h-full bg-[rgba(97,97,97,0.42)] py-3 boxFilter3">
          <div className="w-full h-full">
            <figure
              className={`w-full h-[22vh] lg:h-[27vh] flex flex-wrap justify-center ${
                timer ? "content-end" : "content-around"
              }`}
            >
              <div className="w-full flex justify-around">
                <i
                  onClick={() => setOpenNav(!openNav)}
                  className="bi bi-list text-[1rem] lg:text-[1.4rem] text-white cursor-pointer"
                ></i>
                <i
                  onClick={clickLogOut}
                  className="bi bi-box-arrow-left text-[1rem] lg:text-[1.4rem] text-white cursor-pointer"
                  title="LogOut"
                ></i>
              </div>
              <div
                className={`${
                  timer
                    ? "w-[7vh] lg:w-[10vh] h-[7vh] lg:h-[10vh]"
                    : "w-[50px] h-[50px]"
                } bg-[#D9D9D9] relative  cursor-pointer rounded-full flex items-center justify-center shadow-inner-custom-2 `}
                onClick={triggerFileInput}
              >
                <input
                  type="file"
                  style={{ display: "none" }}
                  accept={fileInputRestrictionsConstant.acceptedImages.join(
                    ", "
                  )}
                  ref={profileFileInputRef}
                  onChange={handleFileChange}
                  disabled={
                    uploadImageMutation.isPending ||
                    setSupplierProfilePhoto.isPending
                  }
                />
                {uploadImageMutation.isPending ||
                setSupplierProfilePhoto.isPending ? (
                  <Spinner className="size-5 text-gray-400 fill-white" />
                ) : supplierData.profilePhoto?.link ? (
                  <>
                    <img
                      src={supplierData.profilePhoto.link}
                      alt=""
                      className="w-[100%] h-[100%] rounded-full"
                    />
                    <span className="absolute size-4 top-1 right-1 rounded-full border border-white flex items-center justify-center bg-white">
                      <PenIcon className="size-2 text-gray-400 fill-gray-400" />
                    </span>
                  </>
                ) : (
                  <UserPlusIcon
                    className={`${
                      timer ? "lg:size-10 md:size-7" : "size-7"
                    } fill-gray-500 text-gray-500`}
                  />
                )}
              </div>
              <figcaption
                style={{ display: timer ? "flex" : "none" }}
                className="w-full flex flex-wrap justify-center gap-2"
              >
                <h2 className="w-full flex justify-center text-white text-[1.1rem] lg:text-[1.5rem] font-normal">
                  {nameLogin}
                </h2>
                <Button value={"ویرایش اطلاعات"} styleButton={6} />
              </figcaption>
            </figure>
            <article className="w-full px-1 py-5">
              <MenuSidebar timer={timer} />
            </article>
            <div
              className={`w-full h-[8vh] flex gap-2 
           justify-center items-center transition-all duration-300`}
            >
              <div className="hover:border-b-2 hover:text-white transition-all duration-100 cursor-pointer text-[#BABABA]">
                <i className="bi bi-telegram text-[1rem] lg:text-[1.4rem]"></i>
              </div>
              <div className="hover:border-b-2 hover:text-white transition-all duration-100 cursor-pointer text-[#BABABA]">
                <i className="bi bi-instagram text-[1rem] lg:text-[1.4rem]"></i>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
