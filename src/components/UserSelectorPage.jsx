import { useNavigate } from "react-router-dom";
import {
  useUpdateUserContext,
  useUserContext,
} from "../utils/UserInfoProvider";

const users = [
  { username: "an_user", role: "user" },
  { username: "ente_camerino", role:"ente"},
  { username: "ente_castel_raimondo", role: "ente" },
];
//Page for a fake login, used for presentation
function UserSelectorPage() {
  const setUserInfo = useUpdateUserContext();
  const userInfo = useUserContext();
  const navigate = useNavigate();

  function handleClick(user) {
    let token;
    if (user === false) token = {isAuth: false, username: "", role:"" };
    else token = { isAuth: true, username: user.username, role: user.role };
    setUserInfo(token);
    navigate("/");
    
  }

  return (
    <div className="text-center content-center align-center justify-center flex flex-col">
      <h1 className="text-3xl">Seleziona utente</h1>
      {userInfo.isAuth ? (
        <button
          type="button"
          className="text-md w-fit mx-auto my-2 bg-white border rounded border-red-600 text-red-800 hover:text-white hover:bg-red-600"
          onClick={() => {
            handleClick(false);
          }}
        >
          Logout
        </button>
      ) : (
        <>
          {" "}
          <button
            type="button"
            className="text-md w-fit mx-auto my-2 bg-white border rounded border-lime-600 text-lime-800 hover:text-white hover:bg-lime-600"
            onClick={() => {
              handleClick(users[0]);
            }}
          >
            {users[0].username} : {users[0].role}
          </button>
          <button
            type="button"
            className="text-md w-fit mx-auto my-2 bg-white border rounded border-sky-600 text-sky-800 hover:text-white hover:bg-sky-600"
            onClick={() => {
              handleClick(users[1]);
            }}
          >
            {users[1].username} : {users[1].role}
          </button>
          <button
            type="button"
            className="text-md w-fit mx-auto my-2 bg-white border rounded border-sky-600 text-sky-800 hover:text-white hover:bg-sky-600"
            onClick={() => {
              handleClick(users[2]);
            }}
          >
            {users[2].username} : {users[2].role}
          </button>
        </>
      )}
    </div>
  );
}

export default UserSelectorPage;
