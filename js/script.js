var seatSelectLists = document.getElementsByClassName('seatSelectList');
var seat = parseInt(document.getElementById('seat').innerHTML);
var countSeats = parseInt(document.getElementById('countSeats').innerHTML);
var price = parseFloat(document.getElementById('seatPrice').innerHTML);
var totalPrice = parseFloat(document.getElementById('totalPrice').innerHTML);
var discount = 0;

for (var seatSelectList of seatSelectLists) {
    seatSelectList.addEventListener('click', function (event) {
        var seatSelectList = event.target;
        var seatName = seatSelectList.innerHTML;
        var tableNewRow = document.getElementById('tbody');

        if (seatSelectList.classList.contains('bg-green-400')) {
            seatSelectList.classList.remove('bg-green-400');
            seat++;
            countSeats--;
            var rows = tableNewRow.getElementsByTagName('tr');
            for (var i = 0; i < rows.length; i++) {
                var firstCell = rows[i].getElementsByTagName('td')[0];
                if (firstCell && firstCell.innerHTML === seatName) {
                    tableNewRow.removeChild(rows[i]);
                    break;
                }
            }
        } else {
            seat--;
            countSeats++;
            seatSelectList.classList.add('bg-green-400');
            var tr = document.createElement('tr');
            var td1 = document.createElement('td');
            var td2 = document.createElement('td');
            var td3 = document.createElement('td');
            
            td1.innerHTML = seatName;
            td2.innerHTML = 'Economy';
            td3.innerHTML = price;
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tableNewRow.appendChild(tr);
        }

        // Update seat count and total price
        document.getElementById('seat').innerHTML = seat;
        document.getElementById('countSeats').innerHTML = countSeats;
        totalPrice = price * countSeats;
        document.getElementById('totalPrice').innerHTML = totalPrice;
        document.getElementById('grandPrice').innerHTML = totalPrice;

        // Enable/disable promo button
        if (countSeats > 3) {
            document.getElementById('promocode').disabled = false;
            discount = 1;
        } else {
            document.getElementById('promocode').disabled = true;
            discount = 0;
        }
    });
}

document.getElementById('promocode').addEventListener('click', function () {
    if (discount == 1) {
        var promoText = document.getElementById('promoText').value;
        var grandPrice = totalPrice;
        
        if (promoText === 'NEW15') {
            grandPrice = totalPrice * 0.85; // 15% discount
        } else if (promoText === 'COUPLE20') {
            grandPrice = totalPrice * 0.80; // 20% discount
        } else {
            grandPrice = totalPrice; // No discount if invalid code
        }

        document.getElementById('grandPrice').innerHTML = grandPrice;
    }
});

function validateForm() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;

    if (name === '' || email === '' || phone === '') {
        document.getElementById('nextBtn').disabled = true;
    } else {
        document.getElementById('nextBtn').disabled = false;
    }
}

document.getElementById('name').addEventListener('input', validateForm);
document.getElementById('email').addEventListener('input', validateForm);
document.getElementById('phone').addEventListener('input', validateForm);

validateForm();
