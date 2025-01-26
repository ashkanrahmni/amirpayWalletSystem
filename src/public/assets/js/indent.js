

const indent = async () => {
    const phone = document.getElementById('phone').value;
    await localStorage.setItem('phone', phone);
}