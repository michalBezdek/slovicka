document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');
    const cardContainer = document.getElementById('card-container');

    loadCards();

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const englishWord = document.getElementById('name').value;
        const czechTranslation = document.getElementById('email').value;
        const explanation = document.querySelector('textarea').value;
        const card = { englishWord, czechTranslation, explanation };
        saveCard(card);
        form.reset();
        loadCards(); 
    });

    function loadCards() {
        const cards = JSON.parse(localStorage.getItem('cards')) || [];
        cardContainer.innerHTML = '';
        cards.forEach((card, index) => {
            const cardElement = createCardElement(card, index);
            cardContainer.appendChild(cardElement);
        });
    }

    function createCardElement(card, index) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.index = index;

        const front = document.createElement('div');
        front.classList.add('front');
        front.textContent = card.englishWord;

        const back = document.createElement('div');
        back.classList.add('back');
        back.innerHTML = `
            <p><strong>Český překlad:</strong> ${card.czechTranslation}</p>
            <p><strong>Vysvětlení:</strong> ${card.explanation}</p>
        `;

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Smazat';

        deleteBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            const indexToRemove = parseInt(cardElement.dataset.index);
            removeCard(indexToRemove);
        });

        cardElement.appendChild(front);
        cardElement.appendChild(back);
        cardElement.appendChild(deleteBtn);

        cardElement.addEventListener('click', () => {
            cardElement.classList.toggle('active');
        });

        return cardElement;
    }

    function saveCard(card) {
        let cards = JSON.parse(localStorage.getItem('cards')) || [];
        cards.push(card);
        localStorage.setItem('cards', JSON.stringify(cards));
    }

    function removeCard(index) {
        let cards = JSON.parse(localStorage.getItem('cards')) || [];
        cards.splice(index, 1);
        localStorage.setItem('cards', JSON.stringify(cards));
        loadCards();
    }
});
