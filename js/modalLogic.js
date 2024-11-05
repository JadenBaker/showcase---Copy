const contactBtn = document.getElementById('contactBtn');
const modal = document.getElementById('contactModal');

let openModal = false;

contactBtn.addEventListener('click', () => {
    openModal = !openModal;
    if (openModal) {
        contactModal.classList.add('show');
        contactModal.style.display = 'flex';
    } else {
        contactModal.classList.remove('show');
        contactModal.style.display = 'none';
    }
});