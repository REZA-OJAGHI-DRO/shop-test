import { useAuth } from "@/context/auth-context";
import { cn, convertDate } from "@/lib/utils";
import { ChatGetChatMessagesResponseType } from "@/types/chat-types";
import { FC } from "react";
import DateObject from "react-date-object";
type Props = {
  chatMessage: ChatGetChatMessagesResponseType;
  contactUserId:string;
};

const ChatMessageCard: FC<Props> = ({ chatMessage , contactUserId }) => {
  const { userData } = useAuth();
  const userIsReceiver = contactUserId === chatMessage.receiverId;
  

  const formattedContent = chatMessage.content.replace(/\n/g, "<br/>");

  return (
    <div
      className={cn(
        "flex w-full flex-wrap",
        userIsReceiver ? "justify-end" : "justify-start",
      )}
    >
      <div
        className={cn(
          "max-w-[70%] flex-shrink-0 p-4",
          userIsReceiver
            ? "rounded-t-lg rounded-br-lg bg-[rgb(129,23,23)] text-xs font-medium text-white"
            : "rounded-b-lg rounded-tl-lg bg-[rgb(243,243,243)] text-xs text-black",
        )}
      >
        <p
          className="text-justify leading-[19px]"
          dangerouslySetInnerHTML={{ __html: formattedContent }}
        ></p>
        <p
          className={cn(
            "text-end text-[10px]",
            userIsReceiver ? "text-neutral-400" : "text-neutral-500",
          )}
        >
          {convertDate(
            new DateObject(new Date(chatMessage.createdAt)),
            "persian",
            "HH:mm",
          )}
        </p>
      </div>
    </div>
  );
};

export default ChatMessageCard;
