
import { useEffect, useReducer } from "react";

import Header from "./components/Header";
import UserList from "./components/UserList";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "./api/userApi";

import "./index.css";

const initialState = {
  users: [],
  loading: true,
  error: "",
};

function userReducer(state, action) {
  switch (action.type) {
    case "SET_USERS":
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: "",
      };

    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id
            ? action.payload
            : user
        ),
      };

    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter(
          (user) => user.id !== action.payload
        ),
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(
    userReducer,
    initialState
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();

        dispatch({
          type: "SET_USERS",
          payload: Array.isArray(data) ? data : [],
        });
      } catch (error) {
        console.error("Fetch Error:", error);

        dispatch({
          type: "SET_ERROR",
          payload: "Unable to load users. Please try again.",
        });
      }
    };

    fetchUsers();
  }, []);

  const handleAdd = async (user) => {
    try {
      const newUser = await createUser(user);

      dispatch({
        type: "ADD_USER",
        payload: newUser,
      });

      return true;
    } catch (error) {
      console.error("Add Error:", error);
      alert("Unable to add user.");
      return false;
    }
  };

  const handleUpdate = async (id, user) => {
    try {
      const updatedUser = await updateUser(id, user);

      dispatch({
        type: "UPDATE_USER",
        payload: updatedUser,
      });

      return true;
    } catch (error) {
      console.error("Update Error:", error);
      alert("Unable to update user.");
      return false;
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) return;

    try {
      await deleteUser(id);

      dispatch({
        type: "DELETE_USER",
        payload: id,
      });
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Unable to delete user.");
    }
  };

  return (
    <>
      <Header />

      {state.loading ? (
        <div className="loading">Loading users...</div>
      ) : state.error ? (
        <div className="error-message">{state.error}</div>
      ) : (
        <UserList
          users={Array.isArray(state.users) ? state.users : []}
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}

export default App;
