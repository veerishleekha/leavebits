// Get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\? &]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Format date for display
function formatDate(dateString) {
    var date = new Date(dateString);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return date.getDate() + '-' + months[date.getMonth()] + '-' + date.getFullYear();
}

// Load and display entry details
window.onload = function() {
    var entryId = getUrlParameter('id');
    
    if (!entryId) {
        alert('No entry ID specified');
        window.location.href = 'index.html';
        return;
    }
    
    // Get all entries from localStorage
    var entries = JSON.parse(localStorage.getItem('leaveEntries') || '[]');
    
    // Find the specific entry
    var entry = entries. find(function(e) { return e.id === entryId; });
    
    if (!entry) {
        alert('Entry not found');
        window.location.href = 'index.html';
        return;
    }
    
    // Populate the details
    document.getElementById('detail-id').textContent = entry.idno;
    document.getElementById('detail-name').textContent = entry.name;
    document.getElementById('detail-contact').textContent = entry.contact;
    document. getElementById('detail-hostel').textContent = entry.hostel;
    document.getElementById('detail-room').textContent = entry.room;
    document.getElementById('detail-departure').textContent = formatDate(entry.departure);
    document.getElementById('detail-return').textContent = formatDate(entry.return);
    document.getElementById('detail-reason').textContent = entry.leaveReason;
    document. getElementById('detail-status').textContent = entry.status;
    document.getElementById('detail-applied').textContent = formatDate(entry.appliedOn);
    
    // Store current entry ID for PDF generation
    window.currentEntryId = entryId;
};

// Download PDF for this specific entry
function downloadPdfForEntry() {
    var entryId = window.currentEntryId;
    if (entryId) {
        modifyPdfForEntry(entryId);
    }
}
