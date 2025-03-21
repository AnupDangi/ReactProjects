import { useState, useEffect } from "react";
import Suggestions from "./Suggestions";

export default function SearchAutoComplete() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [searchUser, setSearchUser] = useState("");
  const [showDropDown, setshowDropDown] = useState(false);
  const [filteredUsers, setFilteredUser] = useState([]);

  function handleChange(event) {
    const query = event.target.value.toLowerCase();
    setSearchUser(query);
    if (query.length > 1) {
      const filteredData =
        users && users.length
          ? users.filter((item) => item.toLowerCase().indexOf(query) > -1)
          : [];
      setFilteredUser(filteredData);
      setshowDropDown(true);
    } else {
      setshowDropDown(false);
    }
  }

  async function fetchListOfUsers() {
    try {
      setLoading(true);
      const response = await fetch(`https://dummyjson.com/users`);
      const data = await response.json();
      console.log(data);
      if (data && data.users && data.users.length) {
        setUsers(data.users.map((user) => user.firstName));
        setLoading(false);
        setError(null);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(error);
    }
  }

  useEffect(() => {
    fetchListOfUsers();
  }, []);

  console.log(users);

  function handleClick(event){
    console.log(event.target.innerText);
  }

  return (
    <div className="search-autocomplete-container">
      {loading ? (
        <h1>Loading Data ! Please wait!</h1>
      ) : (
        <input
          type="text"
          placeholder="Search Users here..."
          name="search-users"
          value={searchUser}
          onChange={handleChange}
        />
      )}
      {showDropDown && <Suggestions handleclick={handleClick}  data={filteredUsers} />}
    </div>
  );
}
