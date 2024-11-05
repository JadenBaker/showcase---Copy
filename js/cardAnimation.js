const cards = document.querySelectorAll('.card');

// Assign them each an event listener
cards.forEach(card => {
    card.addEventListener('click', function() {
        this.classList.toggle('flip');
    })
});