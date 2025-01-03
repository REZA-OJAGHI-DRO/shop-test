import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Spinner from "./spinner";

interface ImageViewerModalProps {
  children: React.ReactNode;
  imageUrl: string;
  altText: string;
}

const ImageViewerModal: React.FC<ImageViewerModalProps> = ({
  children,
  imageUrl,
  altText,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[90vw] w-auto">
        <div className="relative w-full h-[80vh] flex items-center justify-center">
          {isLoading && (
            <Spinner
              text="در حال بارگزاری ..."
              textClassName="text-center text-gray-very-dark text-sm"
            />
          )}
          <img
            src={imageUrl}
            alt={altText}
            className="max-w-full max-h-[80vh] w-auto h-auto object-contain"
            style={{ display: isLoading ? "none" : "block" }}
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageViewerModal;
