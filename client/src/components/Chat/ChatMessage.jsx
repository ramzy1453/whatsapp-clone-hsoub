import cn from "classnames";
import moment from "moment";

export default function ChatMessage({ content, createdAt, isSender }) {
  return (
    <div
      className={cn("flex", {
        "justify-end": isSender,
        "justify-start": !isSender,
      })}
    >
      <div className="max-w-xl">
        <div
          className={cn("py-2 px-3 rounded-xl flex items-end space-x-2", {
            "bg-[#005C4B]": isSender,
            "bg-[#202C33]": !isSender,
          })}
        >
          <p
            className="text-white"
            dangerouslySetInnerHTML={{ __html: content.replace("\n", "<br>") }}
          />
          <p className="text-[#B0BAC0] text-xs flex-1">
            {moment(createdAt).format("hh:mm A")}
          </p>
        </div>
      </div>
    </div>
  );
}
