// Load all entries and populate the table
window.onload = function () {
    // Initialize fake data if needed
    if (typeof initializeFakeData === 'function') {
        initializeFakeData();
    }
    
    // Get all entries
    var entries = JSON.parse(localStorage.getItem('leaveEntries') || '[]');
    
    if (entries.length === 0) {
        console.log("No entries found");
        // Hide the table or show a message
        return;
    }
    
    console.log("Loaded entries:", entries);
    
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Function to format date
    function formatDate(dateString) {
        var date = new Date(dateString);
        return date.getDate() + '-' + months[date.getMonth()] + '-' + date.getFullYear();
    }
    
    // Get the table body
    var tableBody = document.querySelector('#ctl00_ContentPlaceHolder1_DG1 tbody');
    if (!tableBody) {
        console.error("Table body not found");
        return;
    }
    
    // Clear existing rows except the header
    var rows = tableBody.querySelectorAll('tr');
    for (var i = rows.length - 1; i >= 1; i--) {
        rows[i].remove();
    }
    
    // Add rows for each entry
    entries.forEach(function(entry, index) {
        var row = document.createElement('tr');
        row.align = 'left';
        row.valign = 'middle';
        row.style.backgroundColor = index % 2 === 0 ? 'White' : '#F0F0F0';
        
        row.innerHTML = `
            <td align="left" valign="top" style="border-color: Black;">${index + 1}</td>
            <td style="border-color:Black;">${entry.idno}</td>
            <td style="border-color:Black;">${entry.name}</td>
            <td style="border-color:Black;">${entry.hostel}</td>
            <td style="border-color:Black;">${entry.room}</td>
            <td style="border-color:Black;">${formatDate(entry.departure)}</td>
            <td style="border-color: Black;">${formatDate(entry. return)}</td>
            <td style="border-color:Black;">${entry.leaveReason}</td>
            <td style="color:DarkGreen;border-color:Black;font-weight:bold;">${entry. status}</td>
            <td style="border-color:Black;">${formatDate(entry.appliedOn)}</td>
            <td style="border-color: Black;">
                <a href="viewdetails.html?id=${entry. id}"><b>View Details</b></a>
            </td>
            <td style="border-color: Black;">
                <a href="#" onclick="modifyPdfForEntry('${entry.id}'); return false;"><b>Download Leave Approval</b></a>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
};
