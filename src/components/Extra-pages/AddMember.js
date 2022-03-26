import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useCreateChannelProvider } from "../../States/Reducers/CreateChannelProvider";
import { useForm } from "react-hook-form";
import { Alert, AlertIcon, Spinner } from "@chakra-ui/react";
import { useAuthProvider } from "../../States/AuthProvider";
import { useComposeMessageProvider } from "../../States/Reducers/ComposeMessageProvider";
import SearchSuggestions from "../SearchSuggestions";
import env from "react-dotenv";
import axios from "axios";

export default function AddMember({
  toggleAddChannel,
  setToggleAddChanel,
  reciever_id,
}) {
  const [onChangeTitle, setOnchangeTitle] = useState("");
  // const [isLoading, setIsloading] = useState(false);
  // const [{ isCreateMode }, dispatch] = useComposeMessageProvider();
  // const [{ users }] = useComposeMessageProvider();
  // const [error, setError] = useState("");
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [isSuggest, setIsSuggest] = useState(true);
  const [users, setUsers] = useState([]);
  const [{ user }] = useAuthProvider();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    resetField,
  } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = (_) => {
    setToggleAddChanel(false);
  };
  useEffect(() => {
    async function getUsers() {
      try {
        // get all users
        const data = await axios
          .get(`${env.API_URL}/users`, {
            headers: {
              "access-token": user["access-token"],
              client: user.client,
              expiry: user.expiry,
              uid: user.uid,
            },
          })
          .then(({ data }) => data.data);
        // set state
        setUsers(data);
      } catch (err) {
        console.log(err);
      }
    }
    getUsers();
  }, []);
  useEffect(() => {
    // get all the email matching the search value on change
    const filteredEmail =
      users && users.length > 0
        ? users.filter(({ email }) => email.includes(onChangeTitle))
        : {};
    // limit the legnth of results
    const suggestionArray =
      users && users.length > 0 ? filteredEmail.splice(0, 10) : [];
    setUserSuggestions(suggestionArray);
    // toggle the suggestions
    if (onChangeTitle === "" || onChangeTitle.length >= 8) {
      setIsSuggest(false);
    } else {
      setIsSuggest(true);
    }
  }, [onChangeTitle, users]);
  const addMember = (data) => {
    const id =
      users && users.filter(({ email }) => email === data.email)[0]?.id;
    try {
      axios.post(
        `${env.API_URL}/channel/add_member`,
        {
          id: reciever_id,
          member_id: id,
        },
        {
          headers: {
            "access-token": user["access-token"],
            client: user.client,
            expiry: user.expiry,
            uid: user.uid,
          },
        }
      );
      handleToggle();
      resetField("email");
      console.log(reciever_id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col">
      <Modal isOpen={toggleAddChannel} onClose={handleToggle}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add member to channel</ModalHeader>
          <ModalCloseButton />
          <form
            className="flex mx-5 w-full h-full items-end"
            onSubmit={handleSubmit(addMember)}
          >
            <input
              autoComplete="off"
              className="mt-4 h-full bg-gray-100 border outline-none rounded-md p-3 w-6/12 "
              type="email"
              name="email"
              value={onChangeTitle}
              {...register("email", {
                required: "true",
                onChange: (e) => setOnchangeTitle(e.target.value),
              })}
            />
            <button
              className={`${
                onChangeTitle !== ""
                  ? "bg-gray-800 text-white"
                  : "bg-gray-400 text-white"
              } w-1/5 rounded h-full ml-5 transition-all `}
              type="submit"
            >
              Submit
            </button>
            {isSuggest && (
              <SearchSuggestions
                isSuggest={isSuggest}
                setIsSuggest={setIsSuggest}
                setOnchangeTitle={setOnchangeTitle}
                setFocus={setFocus}
                suggestionArray={userSuggestions}
              />
            )}
          </form>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleToggle}>
              Add to channel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
