import { Button } from "@/components/ui/button";
// import { EllipsisVerticalIcon, XIcon } from "lucide-react";
// import ImageIcon from "@/public/assets/icons/image.svg";

// import CustomLink from "@/components/ui/custom-link";
import SendMessageInput from "./send-message-input";
import { FC, useEffect, useRef, useState } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import chatService from "@/services-v2/chat-service";
import { RelationshipMemberTypeEnum } from "@/types/relationship-types";
import Spinner from "@/components/ui/spinner";
import ChatMessageCard from "./chat-message-card";

// import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  shopperUserId: string;
  factorId: string;
};

const ChatFactor: FC<Props> = ({ shopperUserId , factorId }) => {
  const [inputValue, setInputValue] = useState("");
  const [activeTab, setActiveTab] = useState("chat");
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  }

  const contactUserId = getCookie("userId") || "";

  const chatMessages = useQuery({
    queryKey: ["chat-messages"],
    queryFn: () =>
      chatService.getChatMessages({
        filter: {
          contactUserId:"pMYyDvloqDzXcqzgo8pryQ==",
          contactUserType: 1,
          currentUserType: 0,
          // referenceType: 1,
          // reference: null,
        },
        orderPropertyName: "",
        orderType: 1,
        pageIndex: 1,
        pageSize: 10000,
      }),
      enabled: Boolean(contactUserId),
  });

  useEffect(() => {
    if (chatMessages?.data?.data && !chatMessages.isPending)
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
  }, [chatMessages.data]);

  return (
    <>
      <div className="relative w-full">
        {chatMessages.isLoading ? (
          <div className="flex justify-center py-5">
            <Spinner text="در حال دریافت اطلاعات ..." />
          </div>
        ) : chatMessages?.data?.data && chatMessages.data.data.count > 0 ? (
          <div className="w-full space-y-2 pb-[90px] " ref={chatContainerRef}>
            {chatMessages.data.data.data
              .slice()
              .reverse()
              .map((item) => (
                <ChatMessageCard key={item.id} chatMessage={item} contactUserId={contactUserId}/>
              ))}
          </div>
        ) : (
          <p className="text-center text-xs text-v2-neutral-1008">
            موردی برای نمایش وجود ندارد
          </p>
        )}
        <SendMessageInput
          showAnswers={activeTab === "answers"}
          value={inputValue}
          setValue={setInputValue}
          onSubmit={() => chatMessages.refetch()}
          contactType={1}
          contactUserId={shopperUserId}
          factorId={factorId}
        />

      </div>
    </>
  );
};

export default ChatFactor;

{
  /* <div className="fixed top-0 z-20 flex w-full items-center justify-between bg-v2-accent p-4 pt-[18px] text-v2-neutral-1001 shadow-[0_2px_4px_rgba(189,189,189,0.35)]">
          <div className="flex items-center gap-3">
            <figure className="flex size-10 items-center justify-center overflow-hidden rounded-full border-2 border-v2-neutral-1003 bg-v2-neutral-1007">
          <ImageIcon className="size-4" />
        </figure>
            <div className="text-xs">
          {chatList.isPending ? (
            <Skeleton className="h-3 w-16 rounded-sm" />
          ) : (
            <h1 className="mb-[5px] font-medium">{`چت با تامین کننده ${chatItem?.contact?.name || searchParams.get("contactname") || ""}`}</h1>
          )}
          {searchParams.get("refcode") ? (
            <p>{`درباره درخواست ${searchParams.get("refcode")}`}</p>
          ) : null}
        </div>
          </div>
        </div> */
}
