// fetch data from html page and save to localstorage as a new entry

async function saveData() {
    var ID = document.getElementById("ID");
    var name = document.getElementById("name");
    var contact = document.getElementById("contact");
    var room = document.getElementById("room");
    var hostel = document.getElementById("hostel");
    var departure = document. getElementById("DEPARTURE");
    var returnn = document.getElementById("RETURN");

    // Validate inputs
    if (!ID.value || !name.value || !contact. value || !room.value || ! hostel.value || !departure. value || !returnn.value) {
        alert('Please fill in all fields');
        return;
    }

    // Get existing entries or initialize empty array
    var entries = JSON. parse(localStorage.getItem('leaveEntries') || '[]');
    
    // Create new entry
    var newEntry = {
        id: 'entry_' + Date.now(),
        idno: ID.value,
        name: name.value,
        contact: contact.value,
        room: room.value,
        hostel: hostel.value,
        departure: departure.value,
        return: returnn.value,
        leaveReason: 'Function', // Default reason, can be made dynamic
        status: 'Approved',
        appliedOn:  new Date().toISOString().split('T')[0] // Today's date
    };
    
    // Add new entry to the beginning of the array
    entries.unshift(newEntry);
    
    // Save back to localStorage
    localStorage.setItem('leaveEntries', JSON. stringify(entries));
    
    console.log("New entry saved:", newEntry);
    window.location.href = 'index.html';
}
