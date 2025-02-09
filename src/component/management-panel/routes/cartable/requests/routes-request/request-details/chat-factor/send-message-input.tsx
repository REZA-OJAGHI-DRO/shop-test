import { XIcon } from "lucide-react";
import PaperclipIcon from "@/assets/icons/v2/paperclip.svg";
import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import ArrowUpIcon from "@/assets/icons/v2/arrow-up.svg";
import SearchIcon from "@/assets/icons/v2/search.svg";
import { useMutation } from "@tanstack/react-query";
import chatService from "@/services-v2/chat-service";
import { RelationshipMemberTypeEnum } from "@/types/relationship-types";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
// import { useSearchParams } from "next/navigation";

type Props = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  onSubmit: () => void;
  showAnswers: boolean;
  contactType: number;
  contactUserId: string;
  factorId: string;
};

const SendMessageInput: FC<Props> = ({
  value,
  setValue,
  showAnswers,
  onSubmit,
  contactType,
  contactUserId,
  factorId
}) => {
  // const searchParams = useSearchParams();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const maxRows = 3;

  useEffect(() => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, maxRows * 30)}px`;
  }, [value]);

  const sendMessage = useMutation({
    mutationKey: ["send-message"],
    mutationFn: chatService.sendMessage,
    onSuccess: (data) => {
      if (data.isSuccess) {
        onSubmit();
      }
    },
  });

  function handleSendMessage() {
    if (value)
      sendMessage.mutate({
        attachments: [],
        currentUserType: 0,
        messageContent: value,
        receiverType: 1,
        receiverUserId: contactUserId,
        reference: factorId || undefined,
        referenceType: 1 || undefined,
      });
    setValue("");
  }

  return (
    <div className="fixed -bottom-[1px] right-0 h-[75px] w-full border-t border-[rgba(230,75,75,0.65)] bg-neutral-100 px-4 shadow-[0_-4px_15px_rgba(189,189,189,0.35)] ">
      <div className="flex h-full w-full items-center gap-3">
        <Button
          variant={"icon"}
          className={`flex size-10 items-center justify-center rounded-full p-0 transition-all duration-200 ${value === "" ? "bg-[#E64B4B]/10" : "bg-gradient-to-br from-[#F17170] to-[#E64B4B]"}`}
          onClick={handleSendMessage}
          disabled={sendMessage.isPending}
        >
          {sendMessage.isPending ? (
            <Spinner className="size-4" />
          ) : showAnswers ? (
            // <SearchIcon
            //   // className={`size-5 transition-all duration-200 ${value === "" ? "text-[#E64B4B]" : "text-v2-neutral-1001"}`}
            //   />
              <img src={SearchIcon} alt="Search Icon" 
                       className={`size-5 transition-all duration-200 ${value === "" ? "text-[#E64B4B]" : "text-v2-neutral-1001"}`}
              />
          ) : (
            <img src={ArrowUpIcon} alt="Arrow Up" 
                className={`size-5 transition-all duration-200 ${value === "" ? "text-[#E64B4B]" : "text-v2-neutral-1001"}`}
            />

            // <ArrowUpIcon
            //   // className={`size-5 transition-all duration-200 ${value === "" ? "text-[#E64B4B]" : "text-v2-neutral-1001"}`}
            // />
          )}
        </Button>

        <div className="flex h-full flex-1 items-center overflow-hidden py-3">
          <textarea
            ref={textareaRef}
            rows={1}
            className="no-scrollbar max-h-[55px] w-full border-none bg-transparent text-xs font-medium text-v2-primary-1008 focus:outline-none"
            placeholder={
              showAnswers
                ? "کلید واژه مورد نظر خود را درج نمایید"
                : "ارسال پیام ..."
            }
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              } else if (e.key === "Enter" && e.shiftKey) {
                e.preventDefault();
                setValue((prevValue) => prevValue + " \n ");
              }
            }}
          />
        </div>

        <div className="transition-all duration-150">
          {value === "" ? (
            <>{!showAnswers && false && <PaperclipIcon />}</>
          ) : (
            <div
              className="flex size-[21px] items-center justify-center rounded-full bg-[#61616A] text-v2-neutral-1001"
              onClick={() => setValue("")}
            >
              <XIcon className="size-4" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SendMessageInput;
