import React, {useEffect, useState} from "react";
import {CreateUser, ListenAllUsers} from "../../Services/FireBase/DataBase.js";
import {useNavigate} from "react-router-dom";
import Dropdown from "../../Components/Dropdown/Dropdown.jsx";
import "./LoginScreen.css";

export default function LoginScreen()
{
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newUser, setNewUser] = useState("");
    const navigate = useNavigate();

    useEffect(() =>
              {
                  return ListenAllUsers(setUsers);
              }, []);

    useEffect(() =>
              {
                  //console.log(`Seleccionado: ${selectedUser}`);
                  if (selectedUser != null)
                      navigate(`/chat/${selectedUser}`, {state: {users}});
              }, [selectedUser]);

    const options = users.map(user => (
        {
            value: user.id,
            label: user.name
        }));

    async function handleCreateUser(e)
    {
        e.preventDefault();
        if (newUser.trim().length === 0)
            return;

        const id = await CreateUser(newUser);
        //console.log(id);

        navigate(`/chat/${id}`, {state: {users}});
    }

    return (
        <div className = "login-container">
            <h3>Seleccione o cree un usuario y luego chatee entre ambos, puede abrir y probar en 2 navegadores</h3>
            <div className = "dropdown-wrapper">
                <Dropdown
                    label = "Elegir un usuario"
                    options = {options}
                    onSelect = {value => setSelectedUser(value.value)}
                />
            </div>
            <hr/>
            <h3>Crear nuevo usuario:</h3>
            <form className = "login-form" onSubmit = {handleCreateUser}>
                <input
                    type = "text"
                    placeholder = "Nombre del usuario"
                    value = {newUser}
                    onChange = {e => setNewUser(e.target.value)}
                />
                <button type = "submit">Crear</button>
            </form>
            {
                selectedUser != null && (
                    <p className = "selected-user">
                        Usuario seleccionado: <b>{selectedUser}</b>
                    </p>
                )
            }
        </div>
    );
}