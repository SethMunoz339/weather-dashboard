// creates a button to clear local storage
document.getElementById('clearButton').addEventListener('click', function() {
    localStorage.clear();
    alert('Search history has been cleared. Refresh the page.');
});