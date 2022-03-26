import React, { useContext, useEffect, useState } from "react";
import { MessageContext } from "../../States/MessageContext";
import { FiMenu } from "react-icons/fi";
import { FcViewDetails } from "react-icons/fc";
import { BiDetail } from "react-icons/bi";
import AddMember from "../Extra-pages/AddMember";

const MessageAreaHeader = ({ toggleSubMenu, toggleChannelDetails }) => {
  const { messageMode } = useContext(MessageContext);
  const [toggleAddChannel, setToggleAddChanel] = useState(false);
  const handleToggleAddChannel = (_) => {
    setToggleAddChanel(!toggleAddChannel);
  };
  console.log(messageMode);
  return (
    <>
      <div className="h-fit flex relative justify-between w-full bg-gray-700 max-h-fit py-4 px-3 font-extrabold text-lg">
        <button className="mr-5" onClick={toggleSubMenu}>
          <FiMenu />
        </button>
        {messageMode.receiver_class == "Channel"
          ? "#" + messageMode.name
          : messageMode.name}

        {typeof messageMode.name != "undefined" ? (
          <button
            onClick={handleToggleAddChannel}
            className="text-xs border-2 p-2 rounded"
          >
            Add member
          </button>
        ) : (
          ""
        )}

        <button className="float-right text-2xl" onClick={toggleChannelDetails}>
          <BiDetail />
        </button>
      </div>
      {toggleAddChannel && typeof messageMode.name != "undefined" ? (
        <div className="absolute w-full bg-red-300">
          <AddMember
            setToggleAddChanel={setToggleAddChanel}
            toggleAddChannel={toggleAddChannel}
            reciever_id={messageMode.receiver_id}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default MessageAreaHeader;
