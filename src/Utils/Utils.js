const formatTimestamp = (timestamp) =>
{
    if (!timestamp) return 'Enviando...';
    return new Date(timestamp).toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
};

const GetAvatarUrl = (id) => `https://randomuser.me/api/portraits/men/${id}.jpg`;

export {formatTimestamp, GetAvatarUrl};