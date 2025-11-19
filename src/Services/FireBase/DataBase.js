import {initializeApp} from "firebase/app";
import {getDatabase, ref, push, onValue, set, serverTimestamp} from 'firebase/database';

const firebaseConfig = {
    databaseURL: "https://olive-integrador-react-default-rtdb.firebaseio.com/",
    chatDataBaseName: "Chats",
    usersDataBaseName: "Users"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const GetChatId = (id1, id2) =>
{
    if (!id1 || !id2)
        return null;

    if (isNaN(parseInt(id1)) || isNaN(parseInt(id2)))
        return null;

    return [id1, id2].sort().join('_');
};

function RequestMessages(idFrom, idTo, setMessages)
{
    const chatId = GetChatId(idFrom, idTo);

    if (!chatId)
    {
        setMessages([]);
        return;
    }

    const chatRef = ref(db, `${firebaseConfig.chatDataBaseName}/${chatId}`);

    const unsubscribe = onValue(chatRef, (snapshot) =>
    {
        const data = snapshot.val();

        if (data)
        {
            const messagesArray = Object.keys(data).map(key => (
                {
                    id: key,
                    ...data[key]
                }));

            messagesArray.sort((a, b) => a.date - b.date);
            setMessages(messagesArray);
        }
        else
        {
            setMessages([]);
        }
    });

    return () => unsubscribe();
}

async function SendMessage(idFrom, idTo, newMessage, setNewMessage)
{
    const chatId = GetChatId(idFrom, idTo);

    if (!chatId)
    {
        console.error("Error: No se pudo generar el ID del chat.");
        return;
    }

    const chatRef = ref(db, `${firebaseConfig.chatDataBaseName}/${chatId}`);

    try
    {
        // Note: Podría usar userRequest de Hooks per decidí mantenerlo acá para que todas las funciones relacionadas a
        // Firebase no escapen de esta estructura 
        await push(chatRef, {
            idFrom: idFrom,
            message: newMessage,
            date: serverTimestamp()
        });

        setNewMessage('');
    }
    catch (error)
    {
        console.error("Error al enviar mensaje:", error);
    }
}

function ListenAllUsers(setUsers)
{
    const usersRef = ref(db, firebaseConfig.usersDataBaseName);

    const unsubscribe = onValue(usersRef, (snapshot) =>
    {
        const data = snapshot.val() || {};
        const list = Object.entries(data).map(([id, name]) => (
            {
                id,
                name
            }));

        setUsers(list);
    });

    return () => unsubscribe();
}

async function CreateUser(newName)
{
    const usersRef = ref(db, firebaseConfig.usersDataBaseName);

    return new Promise((resolve, reject) =>
                       {
                           onValue(usersRef, async (snapshot) =>
                           {
                               const data = snapshot.val() || {};

                               const ids = Object.keys(data).map(Number);
                               const newId = ids.length > 0 ? Math.max(...ids) + 1 : 1;

                               try
                               {
                                   await set(ref(db, `${firebaseConfig.usersDataBaseName}/${newId}`), newName);
                                   resolve(newId);
                                   console.log("Created new user");
                               }
                               catch (e)
                               {
                                   reject(e);
                               }
                           }, {onlyOnce: true});
                       });
}

export {ListenAllUsers, CreateUser, RequestMessages, SendMessage};