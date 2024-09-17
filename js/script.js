var seatElements = document.querySelectorAll('.seatSelectList p');

var seat = parseInt(document.getElementById('seat').innerHTML);
var countSeats = parseInt(document.getElementById('countSeats').innerHTML);
var price = parseFloat(document.getElementById('seatPrice').innerHTML);
var totalPrice = parseFloat(document.getElementById('totalPrice').innerHTML);
var discount = 0;

seatElements.forEach(function (seatElement) {
    seatElement.addEventListener('click', function (event) {
        // Only process the click if the target is a <p> element (seat)
        if (event.target.tagName.toLowerCase() === 'p') {
            var seatSelectList = event.target; 
            var seatName = seatSelectList.innerHTML; 
            var tableNewRow = document.getElementById('tbody'); 

            if (seatSelectList.classList.contains('bg-green-500')) {
                
                seatSelectList.classList.remove('bg-green-500');
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
                seatSelectList.classList.add('bg-green-500');

                // Create a new row in the selected seats table
                var tr = document.createElement('tr');
                var td1 = document.createElement('td');
                var td2 = document.createElement('td');
                var td3 = document.createElement('td');

                
                td1.innerHTML = seatName;
                td2.innerHTML = 'Economy';
                td3.innerHTML = price.toFixed(2); 
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tableNewRow.appendChild(tr);
            }

           
            document.getElementById('seat').innerHTML = seat;
            document.getElementById('countSeats').innerHTML = countSeats;
            totalPrice = price * countSeats;
            document.getElementById('totalPrice').innerHTML = totalPrice.toFixed(2); 
            document.getElementById('grandPrice').innerHTML = totalPrice.toFixed(2);

            // Enable/disable promo button based on the number of seats selected
            if (countSeats > 3) {
                document.getElementById('promocode').disabled = false;
                discount = 1;
            } else {
                document.getElementById('promocode').disabled = true;
                discount = 0;
            }
        }
    });
});

// Promo code application logic
document.getElementById('promocode').addEventListener('click', function () {
    if (discount === 1) {
        var promoText = document.getElementById('promoText').value;
        var grandPrice = totalPrice;

        // Apply the promo code
        switch (promoText) {
            case 'NEW15':
                grandPrice = totalPrice * 0.85; 
                document.getElementById('promocode').disabled = true;

                break;
            case 'COUPLE20':
                grandPrice = totalPrice * 0.80; 
                document.getElementById('promocode').disabled = true;

                break;
            default:
                grandPrice = totalPrice;
        }

        // Update the grand price after discount
        document.getElementById('grandPrice').innerHTML = grandPrice.toFixed(2);
    }
});

// Form validation to enable/disable the Next button
function validateForm() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;

    document.getElementById('nextBtn').disabled = name === '' || email === '' || phone === '';
}

document.getElementById('name').addEventListener('input', validateForm);
document.getElementById('email').addEventListener('input', validateForm);
document.getElementById('phone').addEventListener('input', validateForm);

validateForm();

// switch to the payment page
function paymentPage() {
    document.getElementById("home").classList.add("hidden"); 
    document.getElementById("payment").classList.remove("hidden"); 
}
// switch to the MAIN page
function main() {
    document.getElementById("payment").classList.add("hidden");
    document.getElementById("home").classList.remove("hidden");
   
    

}
