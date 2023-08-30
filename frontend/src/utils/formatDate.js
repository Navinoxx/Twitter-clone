export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) {
        return "Ahora mismo";
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes} min`;
    } else if (diffInHours < 24) {
        return `${diffInHours} h`;
    } else if (diffInDays < 7) {
        return `${diffInDays} d`;
    } else {
        const monthNames = [
            "Ene", "Feb", "Mar",
            "Abr", "May", "Jun", "Jul",
            "Ago", "Sep", "Oct",
            "Nov", "Dic"
        ];

        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();

        return `${day} ${monthNames[monthIndex]} ${year}`;
    }
};

export const formatFullDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};
