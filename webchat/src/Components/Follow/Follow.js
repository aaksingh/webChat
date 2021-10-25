import React, { useEffect, useState } from "react";
import { addFriends, friendsList } from "../../api/api";
import follow from "../../Assets/follow.png";
import followed from "../../Assets/followed.png";
import { addFriend } from "../../Redux/actions/friends";
import { useDispatch, useSelector } from "react-redux";

const Follow = ({ friendId, userId }) => {
  const [follows, setFollow] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function friend() {
      let result = await friendsList(friendId, userId);

      if (result.data) {
        dispatch(addFriend(friendId));
        setFollow(true);
      }
    }
    friend();
  }, []);

  const handleRequest = () => {
    try {
      const result = addFriends({ userId, friendId });
      if (result) {
        setFollow(true);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {!follows ? (
        <img src={follow} alt="" onClick={handleRequest} />
      ) : (
        <img src={followed} alt="" />
      )}
    </>
  );
};

export default Follow;
