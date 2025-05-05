import React, { useState } from "react";

const User = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    balance: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  return (
    <div>
      <h2>User Information</h2>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={userInfo.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={userInfo.email}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Balance:
        <input
          type="number"
          name="balance"
          value={userInfo.balance}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default User;
