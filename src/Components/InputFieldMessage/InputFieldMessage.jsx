import "./InputFieldMessage.css";

export function InputFieldMessage({onSubmit, value, onChange, idFrom, idTo})
{
    return (
        <form onSubmit = {onSubmit} className = "chat-input-form">
            <input
                type = "text"
                value = {value}
                onChange = {onChange}
                placeholder = {idFrom && idTo
                    ? "Escribe tu mensaje..."
                    : "Define los IDs para chatear"
                }
                disabled = {!idFrom || !idTo}
            />
            <button type = "submit" disabled = {!idFrom || !idTo}>
                ↑
            </button>
        </form>);
}