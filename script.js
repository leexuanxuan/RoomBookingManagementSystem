let editRowIndex = null; // Track the row being edited
let srNo = 2; // Serial number for rows

//newly added
let launchedRooms = JSON.parse(sessionStorage.getItem("launchedRooms")) || []; // Retrieve stored rooms or initialize
//  newly added

function submitRow() {
    const data = getFormData();

    // Add a new row to the table
    const table = document.getElementById("bookingTable").getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    
    newRow.insertCell(0).textContent = srNo++;
    newRow.insertCell(1).textContent = data.location;
    newRow.insertCell(2).textContent = data.roomNo;
    newRow.insertCell(3).textContent = data.reservation;
    newRow.insertCell(4).textContent = data.registeredDate;
    newRow.insertCell(5).textContent = data.time;
    newRow.insertCell(6).textContent = data.totalPeople;
    newRow.insertCell(7).textContent = data.promotionalCode;
    newRow.insertCell(8).textContent = data.price;

    const actionsCell = newRow.insertCell(9);
    actionsCell.innerHTML = '<button onclick="editRow(this)">✏️</button> <button onclick="deleteRow(this)">🗑️</button>';
// newly added
    // Save the new room data to launchedRooms array and sessiomStorage
    launchedRooms.push(data); // add new data
    sessionStorage.setItem("launchedRooms", JSON.stringify(launchedRooms));
//newly added
    clearForm();
}

function editRow(button) {
    const row = button.parentElement.parentElement;
    editRowIndex = row.rowIndex - 1;

    const cells = row.cells;
    document.getElementById("location").value = cells[1].textContent;
    document.getElementById("roomNo").value = cells[2].textContent;
    document.getElementById("reservation").value = cells[3].textContent;
    document.getElementById("registeredDate").value = cells[4].textContent;
    document.getElementById("time").value = cells[5].textContent;
    document.getElementById("totalPeople").value = cells[6].textContent;
    document.getElementById("promotionalCode").value = cells[7].textContent;
    document.getElementById("price").value = cells[8].textContent;

    const modal = new bootstrap.Modal(document.getElementById("myModal"));
    modal.show();
}

function updateRow() {
    if (editRowIndex !== null) {
        const data = getFormData();

        // Update the table with new values
        const table = document.getElementById("bookingTable").getElementsByTagName('tbody')[0];
        const row = table.rows[editRowIndex];
        row.cells[1].textContent = data.location;
        row.cells[2].textContent = data.roomNo;
        row.cells[3].textContent = data.reservation;
        row.cells[4].textContent = data.registeredDate;
        row.cells[5].textContent = data.time;
        row.cells[6].textContent = data.totalPeople;
        row.cells[7].textContent = data.promotionalCode;
        row.cells[8].textContent = data.price;

        // Update the launchedRooms array in sessionStorage
        launchedRooms[editRowIndex] = data; // Replace the old data with the new one
        sessionStorage.setItem("launchedRooms", JSON.stringify(launchedRooms));

        // Clear form and close modal
        editRowIndex = null;
        clearForm();
        
        const modal = new bootstrap.Modal(document.getElementById("myModal"));
        modal.hide();
    }
}


function deleteRow(button) {
    const row = button.parentElement.parentElement;
    row.remove();
}

function getFormData() {
    return {
        location: document.getElementById("location").value,
        roomNo: document.getElementById("roomNo").value,
        reservation: document.getElementById("reservation").value,
        registeredDate: document.getElementById("registeredDate").value,
        time: document.getElementById("time").value,
        totalPeople: document.getElementById("totalPeople").value,
        promotionalCode: document.getElementById("promotionalCode").value,
        price: document.getElementById("price").value
    };
}

function clearForm() {
    document.getElementById("bookingForm").reset();
}

function displayLaunchedRooms() {
    const tableBody = document.getElementById("bookingTable").getElementsByTagName('tbody')[0];
    tableBody.innerHTML = "";  // Clear existing table rows

    // Retrieve launched rooms from sessionStorage
    let launchedRooms = JSON.parse(sessionStorage.getItem("launchedRooms")) || [];

    // Loop through the launchedRooms array and add rows to the table
    launchedRooms.forEach((room, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${room.location}</td>
            <td>${room.roomNo}</td>
            <td>${room.reservation}</td>
            <td>${room.registeredDate}</td>
            <td>${room.time}</td>
            <td>${room.totalPeople}</td>
            <td>${room.promotionalCode}</td>
            <td>${room.price}</td>
            <td><button onclick="editRow(this)">✏️</button> <button onclick="deleteRow(this)">🗑️</button></td>
        `;

        tableBody.appendChild(row);
    });
}

// Call this function on page load to populate the table
document.addEventListener("DOMContentLoaded", displayLaunchedRooms);

//new part
    // Function to open the history modal and show room history
    /*function viewRoomHistory(roomNo) {
        const launchedRooms = JSON.parse(sessionStorage.getItem("launchedRooms")) || [];
        const room = launchedRooms.find(r => r.roomNo === roomNo);

        if (room && room.history.length > 0) {
            const historyList = document.getElementById("historyList");
            historyList.innerHTML = ""; // Clear previous history

            // Loop through the history and add it to the list
            room.history.forEach(entry => {
                const listItem = document.createElement("li");
                listItem.textContent = `${entry.status} on ${entry.timestamp}`;
                historyList.appendChild(listItem);
            });
        } else {
            // If there's no history
            document.getElementById("historyList").innerHTML = "<li>No updates available.</li>";
        }

        // Show the modal
        var modal = new bootstrap.Modal(document.getElementById("historyModal"));
        modal.show();
    }

    // Example of adding an event listener to a table row
    document.querySelectorAll(".room-row").forEach(row => {
        row.addEventListener("click", function() {
            const roomNo = this.querySelector(".roomNo").textContent; // Get the room number from the clicked row
            viewRoomHistory(roomNo); // Open the history modal
        });
    });*/
    /*function viewRoomHistory(roomNo) {
        const launchedRooms = JSON.parse(sessionStorage.getItem("launchedRooms")) || [];
        const room = launchedRooms.find(r => r.roomNo === roomNo);
      
        if (room && room.history.length > 0) {
          const historyList = document.getElementById("historyList");
          historyList.innerHTML = ""; // Clear previous history
      
          // Loop through the room history and build the list
          let historyHtml = "";
          room.history.forEach(entry => {
            historyHtml += `<li>${entry.status} on ${entry.timestamp}</li>`;
          });
      
          // Inject the generated HTML into the modal body
          historyList.innerHTML = historyHtml;
        } else {
          document.getElementById("historyList").innerHTML = "<li>No updates available.</li>";
        }
      
        // Show the modal
        var modal = new bootstrap.Modal(document.getElementById("historyModal"));
        modal.show();
      }*/

//end of new part
        // Logout function to redirect to the homepage
function logout() {
    window.location.href = 'index.html';
}

// This will clear all local storage data when the page is loaded.
//window.onload = function() {
//    localStorage.clear();
//};