// Initialize fake data if no entries exist
function initializeFakeData() {
    var entries = JSON.parse(localStorage. getItem('leaveEntries') || '[]');
    
    // Only add fake data if no entries exist
    if (entries.length === 0) {
        var fakeEntries = [
            {
                id: 'entry_' + Date.now() + '_1',
                idno: '2024A1PS0001G',
                name: 'John Doe',
                contact: '9876543210',
                hostel: 'Krishna Bhawan',
                room: '101',
                departure: '2025-08-15',
                return: '2025-08-18',
                leaveReason: 'Family Function',
                status: 'Approved',
                appliedOn: '2025-08-14'
            },
            {
                id: 'entry_' + Date.now() + '_2',
                idno: '2024A1PS0002G',
                name: 'Jane Smith',
                contact: '9123456780',
                hostel: 'Meera Bhawan',
                room: '205',
                departure: '2025-10-20',
                return:  '2025-10-25',
                leaveReason: 'Diwali Festival',
                status: 'Approved',
                appliedOn: '2025-10-18'
            },
            {
                id: 'entry_' + Date.now() + '_3',
                idno: '2024A1PS0003G',
                name: 'Alex Johnson',
                contact: '9988776655',
                hostel: 'Vyas Bhawan',
                room: '312',
                departure: '2025-11-10',
                return: '2025-11-15',
                leaveReason: 'Home Visit',
                status: 'Approved',
                appliedOn:  '2025-11-08'
            }
        ];
        
        localStorage.setItem('leaveEntries', JSON.stringify(fakeEntries));
        console.log('Initialized with fake data');
    }
}

// Run on page load
if (typeof window !== 'undefined') {
    initializeFakeData();
}
