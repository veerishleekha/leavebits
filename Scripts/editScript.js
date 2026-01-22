// Modified to accept entry ID parameter

async function modifyPdfForEntry(entryId) {
    // Get the specific entry
    var entries = JSON.parse(localStorage.getItem('leaveEntries') || '[]');
    var entry = entries.find(function(e) { return e.id === entryId; });
    
    if (!entry) {
        alert('Entry not found');
        return;
    }
    
    await generatePdfWithData(entry);
}

// Original function for backward compatibility
async function modifyPdf() {
    // Use localStorage values (for backward compatibility)
    var entry = {
        idno: localStorage.getItem("ID"),
        name: localStorage.getItem("name"),
        contact: localStorage.getItem("contact"),
        room: localStorage.getItem("room"),
        hostel: localStorage.getItem("hostel"),
        departure:  localStorage.getItem("DEPARTURE"),
        return: localStorage.getItem("RETURN")
    };
    
    await generatePdfWithData(entry);
}

async function generatePdfWithData(entry) {
    const { degrees, PDFDocument, rgb, StandardFonts } = PDFLib;
    console.log("Generating Pdf for entry:", entry);
    
    // Fetch an existing PDF document
    const url = 'leave.pdf';
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Embed the Helvetica font
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Get the first page of the document
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    var ID = entry.idno;
    var name = entry.name;
    var contact = entry.contact;
    var room = entry.room;
    var hostel = entry.hostel;
    var departure = entry.departure;
    var returnn = entry.return;
    var returnndate = new Date(returnn);
    var departuredate = new Date(departure);

    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var wardens = ['Rajesh Kumar', 'Srinivas Appari', 'Nitin Chaturvedi', 'Krishnendra Shekhawat', 'Meghana Tare', 'Sharad Srivastava', 'Praveen Kumar A. V. ', 'MM Pandey', 'Sharad Shrivastava'];
    var hostels = ['Srinivasa Ramanujan Bhawan', 'Krishna Bhawan', 'Gandhi Bhawan', 'Vishwakarma Bhawan', 'Meera Bhawan', 'Shankar Bhawan', 'Vyas Bhawan', 'Ram Bhawan', 'Budh Bhawan'];

    // Get the width and height of the first page
    const { width, height } = firstPage.getSize();
    console.log(width, height);
    
    firstPage.drawText(ID, {
        x: 302,
        y: 710,
        size: 12. 2,
        font: helveticaFont,
        color: rgb(0, 0, 0)
    });
    firstPage.drawText(name, {
        x: 302,
        y: 688,
        size: 12.2,
        font: helveticaFont,
        color: rgb(0, 0, 0)
    });
    firstPage.drawText(contact, {
        x: 302,
        y: 667,
        size: 12.2,
        font: helveticaFont,
        color: rgb(0, 0, 0)
    });
    firstPage.drawText(hostel, {
        x: 302,
        y: 647,
        size: 12.2,
        font: helveticaFont,
        color: rgb(0, 0, 0)
    });
    firstPage.drawText(room, {
        x: 302,
        y: 627,
        size: 12.2,
        font: helveticaFont,
        color: rgb(0, 0, 0)
    });
    firstPage.drawText(wardens[hostels.indexOf(hostel)], {
        x: 302,
        y: 607,
        size: 12.2,
        font: helveticaFont,
        color: rgb(0, 0, 0)
    });
    firstPage.drawText(departuredate.getDate().toString() + '-' + months[departuredate. getMonth()] + '-' + departuredate.getFullYear(), {
        x: 302,
        y: 587,
        size:  12.2,
        font: helveticaFont,
        color: rgb(0, 0, 0)
    });
    firstPage.drawText(returnndate.getDate().toString() + '-' + months[returnndate.getMonth()] + '-' + returnndate.getFullYear(), {
        x: 302,
        y: 567,
        size: 12.2,
        font: helveticaFont,
        color: rgb(0, 0, 0)
    });
    
    const pdfBytes = await pdfDoc.save();
    download(pdfBytes, ID + '.pdf', 'application/pdf');
}
