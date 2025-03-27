document.addEventListener("DOMContentLoaded", () => {
    const characterBar = document.getElementById("character-bar");
    const detailedInfo = document.getElementById("detailed-info");
    const characterName = document.getElementById("name");
    const characterImage = document.getElementById("image");
    const characterVotes = document.getElementById("vote-count");
    const voteForm = document.getElementById("votes-form");
    const voteInput = document.getElementById("votes");
    const resetButton = document.getElementById("reset-btn");
    const characterForm = document.getElementById("character-form");

    let currentCharacter = null;

    // Fetch characters and populate character bar
      fetch("http://localhost:3000/characters")
        .then(response => response.json())
        .then(characters => {
            characters.forEach(character => addCharacterToBar(character));
        });

    function addCharacterToBar(character) {
        const span = document.createElement("span");
        span.textContent = character.name;
        span.addEventListener("click", () => displayCharacterDetails(character));
        characterBar.appendChild(span);
    }

    function displayCharacterDetails(character) {
        currentCharacter = character;
        characterName.textContent = character.name;
        characterImage.src = character.image;
        characterImage.alt = character.name;
        characterVotes.textContent = character.votes;
    }

    // Handle vote form submission
    voteForm.addEventListener("submit", event => {
        event.preventDefault();
        if (!currentCharacter) return;
        const newVotes = parseInt(voteInput.value) || 0;
        currentCharacter.votes += newVotes;
        characterVotes.textContent = currentCharacter.votes;
        voteInput.value = "";
    });

    // Reset votes button
    resetButton.addEventListener("click", () => {
        if (!currentCharacter) return;
        currentCharacter.votes = 0;
        characterVotes.textContent = 0;
    });

    // Add new character
    if (characterForm) {
        characterForm.addEventListener("submit", event => {
            event.preventDefault();
            const name ="Me"
            const newCharacter = {
                name: event.target["character-name"].value,
                image: event.target["image-url"].value,
                votes: 0
            };
            addCharacterToBar(newCharacter);
            displayCharacterDetails(newCharacter);
        });
    }
});
