import React from "react";
import { Avatar } from '@chakra-ui/react';

const OnlineBuddies = () => {
  return (
    <div className="online-buddies">
      <h2>Online Buddies</h2>
      {/* Replace with avatar images */}
      <div className="buddies">
        <span className="avatar" />
        <span className="avatar" />
        <span className="avatar" />
      </div>
    </div>
  );
};

export default OnlineBuddies;