import { FC, useRef } from "react";
import UploadIcon from "@/assets/icons/upload.svg?react";
import TrashIcon from "@/assets/icons/trash.svg?react";
import { cn } from "@/lib/utils";
import { fileInputRestrictionsConstant } from "@/lib/constants";
import { toast } from "@/hooks/use-toast";
import { LockIcon } from "lucide-react";

type Props = {
  selectedFile: File | undefined;
  setSelectedFile: (state: File | undefined) => void;
  acceptedFiles?: "image" | "video";
  className?: string;
  disabled?: boolean;
};

const InputFile: FC<Props> = ({
  selectedFile,
  setSelectedFile,
  disabled = false,
  className,
  acceptedFiles,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setSelectedFile(undefined);
      return;
    }

    if (
      acceptedFiles === "image" &&
      !fileInputRestrictionsConstant.acceptedImages.includes(file.type)
    ) {
      toast({
        variant: "destructive",
        description: fileInputRestrictionsConstant.imageTypeError,
      });
      return;
    }

    if (
      acceptedFiles === "video" &&
      !fileInputRestrictionsConstant.acceptedVideos.includes(file.type)
    ) {
      toast({
        variant: "destructive",
        description: fileInputRestrictionsConstant.videoTypeError,
      });
      return;
    }

    if (file.size >= fileInputRestrictionsConstant.acceptedFileSize) {
      toast({
        variant: "destructive",
        description: `حجم فایل انتخابی نباید بیشتر از ${fileInputRestrictionsConstant.acceptedFileSize}مگابایت باشد `,
      });
      return;
    }

    setSelectedFile(file);
  };

  const removeImage = () => {
    setSelectedFile(undefined);
  };

  function triggerFileInput(e: React.MouseEvent) {
    e.preventDefault();
    if (fileInputRef.current) fileInputRef.current.click();
  }

  return (
    <div
      className={cn(
        "relative flex min-h-[43px] mt-0 flex-shrink-0 items-center rounded-[15px] bg-background text-center text-[#7c7c7c] shadow-[3px_4px_8px_rgba(0,0,0,0.25)] px-5 overflow-hidden",
        disabled ? "bg-secondary/30" : "",
        className
      )}
    >
      <input
        type="file"
        style={{ display: "none" }}
        disabled={disabled}
        accept={
          !acceptedFiles
            ? fileInputRestrictionsConstant.acceptedImages.join(", ")
            : acceptedFiles === "image"
            ? fileInputRestrictionsConstant.acceptedImages.join(", ")
            : acceptedFiles === "video"
            ? fileInputRestrictionsConstant.acceptedVideos.join(", ")
            : fileInputRestrictionsConstant.acceptedeExcels.join(", ")
        }
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <p className="text-sm whitespace-nowrap max-w-[80%] cursor-default overflow-hidden text-ellipsis">
        {!selectedFile ? "فایل را آپلود کنید" : selectedFile.name}
      </p>

      <div
        className={cn(
          "absolute bottom-0 left-5 top-0 flex w-[37px] cursor-pointer items-center justify-center bg-secondary/45 [&_svg]:size-6 text-gray-light group",
          disabled ? "cursor-not-allowed" : ""
        )}
        onClick={selectedFile instanceof File ? removeImage : triggerFileInput}
      >
        {disabled ? (
          <LockIcon />
        ) : selectedFile instanceof File ? (
          <TrashIcon className="transition-all duration-200 group-hover:text-destructive" />
        ) : (
          <UploadIcon className="transition-all duration-200 group-hover:translate-y-1" />
        )}
      </div>
    </div>
  );
};

export default InputFile;
