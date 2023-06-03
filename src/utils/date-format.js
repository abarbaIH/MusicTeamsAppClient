const formatDate = date => {

    const fechaObj = new Date(date);
    const day = fechaObj.getDate().toString().padStart(2, '0');
    const month = (fechaObj.getMonth() + 1).toString().padStart(2, '0');
    const year = fechaObj.getFullYear().toString();

    return `${day}-${month}-${year}`
}

module.exports = { formatDate }