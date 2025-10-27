// Create update popup elements
function createUpdatePopup() {
    // Use a footer button if present, otherwise create the floating button
    let button = document.querySelector('#updates-footer-button') || document.querySelector('.updates-footer-btn');
    let createdFloating = false;
    if (!button) {
        // Create floating button
        button = document.createElement('button');
        button.className = 'show-updates-button';
        button.textContent = 'عرض التحديثات 🚀';
        document.body.appendChild(button);
        createdFloating = true;
    }

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'update-popup-overlay';
    
    // Create container
    const container = document.createElement('div');
    container.className = 'update-popup-container';
    
    // Create close button
    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.innerHTML = '×';
    
    // Create title
    const title = document.createElement('h1');
    title.className = 'update-title';
    title.textContent = 'تحديثات الموقع 🎮';
    
    // Create content container
    const content = document.createElement('div');
    content.className = 'update-content';
    
    // Load and parse the update instructions
    fetch('update-instructions.md')
        .then(response => response.text())
        .then(markdown => {
            content.innerHTML = parseMarkdown(markdown);
        });
    
    // Assemble the popup
    container.appendChild(closeButton);
    container.appendChild(title);
    container.appendChild(content);
    overlay.appendChild(container);
    document.body.appendChild(overlay);
    
    // Add event listeners
    button.addEventListener('click', () => {
        overlay.classList.add('active');
        playOpenSound();
    });
    
    closeButton.addEventListener('click', () => {
        overlay.classList.remove('active');
        playCloseSound();
    });
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
            playCloseSound();
        }
    });
}

// Simple markdown parser
function parseMarkdown(markdown) {
    return markdown
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/```html([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
}

// Sound effects
function playOpenSound() {
    const audio = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAASAAAeMwAUFBQUFCIiIiIiIjAwMDAwPD8/Pz8/TExMTExZWVlZWVlnZ2dnZ3R0dHR0dIGBgYGBkJCQkJCQnZ2dnZ2tra2tra21tbW1tcDAwMDAwMzMzMzM2NjY2Nja5ubm5ubm8vLy8vLy//////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAQKAAAAAAAAHjOZTf9/AAAAAAAAAAAAAAAAAAAAAP/7kGQAAANUMEoFPeACNQV40KEYABEY41g5vAAA9RjpZxRwAImU+W8eshaFpAQgALAAYALATx/nYDYCMJ0HITQYYA7AH4c7MoGsnCMU5pnW+OQnBcDrQ9Xx7w37/D+PimYavV8elKUpT5fqx5VjV6vZ38eJR48eRKa9KUp7v396UgPHkQwMAAAAAA//8MAOp39CECAAhlIEEIIECBAgTT1oj///tEQYT0wgEIYxgDC09aIiE7u7u7uIiIz+LtoIQGE/+XAGYLjpTAIOGYYy0ZACoDHABhZz0eGxbFuNFLOrADXAnrgAwsDOCMZtzpgTUkOOubKbMTQwPOA0AhyQLQAoAKgPzpgYFhYGFAAAAA/79MRgGkG3rS1YYay0PQNMdGkFk+W6iorrRnBYGFgYRxkyWqyg4USUZLKIMiJvqAvQAvBAqgB+KAGALz1APwThZvjymRDmUKkE3oCov2zUgbnKEsctli0dRcro1K0dtxvreqP2b2TpAYGAAAAAD/+1BMa1qAAEIQeBzKYGCFlZXpGGFsG8piFxQDaCdqBErzxoQVAB2XSWpCOggIBZJFW4aFSAcQBxALBPTQsOMPWqBxQIGAqNAqHLLZYtFhFSs1Px6OKHhkOhkvsAUAAAD/+5JkCgADbDnVB2ngAEMmaaLnPACNaNFxPaYAENUqbAePEhAAACAgIPI4yY5CYqRXwBICBAaiQrhwEIKx0uBEWHHCwEDEIMAEcDogdEBnFzBIGEIYILweFgUMgUKs5t6YsAxLxmHyRvgggAAAAA//uSZBMAA5A6XW+6hgI7RgeF7LgAEaToUD7qIAEEkq4pCRAAJAYVAPiIch6wTby3EMfBS0CooDDfIAioyRSZdQ5mMALwEFAwwN6owvxk4qGhiAXawYCzAZJ4CaIHqjIhLZn8Jo8klYoJEDgcAAz13JC8YG3HQeiQAAAEAYAA//u0ZBUABHJGzFm2QQJ6A2uNKgqQEWFLcTW5QAk2mSCep6hISyIYY6QSYo7Ze0QwC0YGv/O6oABcyNYYRKpypNkHH0OhkJgFVhN2FxcYCQYQRYgQscAkJyg3Kocn4SAEzDoDCACQgKHwf3fPm6HD8LvgqAUkL6QlM5e0zz0U0n9nANf2AEgGJTk+NR5ICAcAAPe5VklNGRTlf+AAAAAAAAAAAAAAFgAL/pFgAAAAAAA/////+srlHlW2EYhZopKQBgRIQ0ICfx5aFGQmFmYgHALAAsR5GMyjJg5GZSjrAPAAKAAsEpyJRJKHAQGVrAk0QAtlhNmNggA8A7XjYMCZQzHh6kB7gGCgTFAhlAvGeNDFyogJWYTFAMyxr/RlJgY+RsFhwPpuOh4XgOmdh4KAZsgYEcDNmQJKHQ2KQGKRMsAYm1mG2QAo1AAgyVAUEgJ8BogYSQYIBJQnhYMgYhFgRygXqyQQxp27I1VgDglJQhICkAZpBQQWY5CBwJASJgizkki0RogR4QCgSADLbBgSMkAUXIGAAAAAAAAA=');
    audio.volume = 0.4;
    audio.play();
}

function playCloseSound() {
    const audio = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAASAAAeMwAUFBQUFCIiIiIiIjAwMDAwPD8/Pz8/TExMTExZWVlZWVlnZ2dnZ3R0dHR0dIGBgYGBkJCQkJCQnZ2dnZ2tra2tra21tbW1tcDAwMDAwMzMzMzM2NjY2Nja5ubm5ubm8vLy8vLy//////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAQKAAAAAAAAHjOZTf9/AAAAAAAAAAAAAAAAAAAAAP/7kGQAAANUMEoFPeACNQV40KEYABEY41g5vAAA9RjpZxRwAImU+W8eshaFpAQgALAAYALATx/nYDYCMJ0HITQYYA7AH4c7MoGsnCMU5pnW+OQnBcDrQ9Xx7w37/D+PimYavV8elKUpT5fqx5VjV6vZ38eJR48eRKa9KUp7v396UgPHkQwMAAAAAA//8MAOp39CECAAhlIEEIIECBAgTT1oj///tEQYT0wgEIYxgDC09aIiE7u7u7uIiIz+LtoIQGE/+XAGYLjpTAIOGYYy0ZACoDHABhZz0eGxbFuNFLOrADXAnrgAwsDOCMZtzpgTUkOOubKbMTQwPOA0AhyQLQAoAKgPzpgYFhYGFAAAAA/79MRgGkG3rS1YYay0PQNMdGkFk+W6iorrRnBYGFgYRxkyWqyg4USUZLKIMiJvqAvQAvBAqgB+KAGALz1APwThZvjymRDmUKkE3oCov2zUgbnKEsctli0dRcro1K0dtxvreqP2b2TpAYGAAAAAD/+1BMa1qAAEIQeBzKYGCFlZXpGGFsG8piFxQDaCdqBErzxoQVAB2XSWpCOggIBZJFW4aFSAcQBxALBPTQsOMPWqBxQIGAqNAqHLLZYtFhFSs1Px6OKHhkOhkvsAUAAAD/+5JkCgADbDnVB2ngAEMmaaLnPACNaNFxPaYAENUqbAePEhAAACAgIPI4yY5CYqRXwBICBAaiQrhwEIKx0uBEWHHCwEDEIMAEcDogdEBnFzBIGEIYILweFgUMgUKs5t6YsAxLxmHyRvgggAAAAA//uSZBMAA5A6XW+6hgI7RgeF7LgAEaToUD7qIAEEkq4pCRAAJAYVAPiIch6wTby3EMfBS0CooDDfIAioyRSZdQ5mMALwEFAwwN6owvxk4qGhiAXawYCzAZJ4CaIHqjIhLZn8Jo8klYoJEDgcAAz13JC8YG3HQeiQAAAEAYAA//u0ZBUABHJGzFm2QQJ6A2uNKgqQEWFLcTW5QAk2mSCep6hISyIYY6QSYo7Ze0QwC0YGv/O6oABcyNYYRKpypNkHH0OhkJgFVhN2FxcYCQYQRYgQscAkJyg3Kocn4SAEzDoDCACQgKHwf3fPm6HD8LvgqAUkL6QlM5e0zz0U0n9nANf2AEgGJTk+NR5ICAcAAPe5VklNGRTlf+AAAAAAAAAAAAAAFgAL/pFgAAAAAAA/////+srlHlW2EYhZopKQBgRIQ0ICfx5aFGQmFmYgHALAAsR5GMyjJg5GZSjrAPAAKAAsEpyJRJKHAQGVrAk0QAtlhNmNggA8A7XjYMCZQzHh6kB7gGCgTFAhlAvGeNDFyogJWYTFAMyxr/RlJgY+RsFhwPpuOh4XgOmdh4KAZsgYEcDNmQJKHQ2KQGKRMsAYm1mG2QAo1AAgyVAUEgJ8BogYSQYIBJQnhYMgYhFgRygXqyQQxp27I1VgDglJQhICkAZpBQQWY5CBwJASJgizkki0RogR4QCgSADLbBgSMkAUXIGAAAAAAAAA=');
    audio.volume = 0.4;
    audio.play();
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Add required CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'assets/update-popup.css';
    document.head.appendChild(link);
    
    // Create popup after a short delay
    setTimeout(createUpdatePopup, 500);
});