var seatSelectLists = document.getElementsByClassName('seatSelectList');
var seat = document.getElementById('seat').innerHTML;

var countSeats = document.getElementById('countSeats').innerHTML;
var price = document.getElementById('seatPrice').innerHTML;

for (var seatSelectList of seatSelectLists) {
    seatSelectList.addEventListener('click', function (event) {
        var seatSelectList = event.target;
        var seatName = seatSelectList.innerHTML;
        //console.log(seatName);
        var tableNewRow = document.getElementById('tbody');

        //console.log(seatSelectList);
        if (seatSelectList.classList.contains('bg-green-400')) {
            seatSelectList.classList.remove('bg-green-400');
            seat++;
            countSeats--;
            var rows = tableNewRow.getElementsByTagName('tr');
            for (var i = 0; i < rows.length; i++) {
                var firstCell = rows[i].getElementsByTagName('td')[0];
                if (firstCell && firstCell.innerHTML === seatName) {
                    tableNewRow.removeChild(rows[i]);
                    break;  // Exit loop once the matching row is found
                }
            }


        }
        else {
            seat--;
            countSeats++;
            seatSelectList.classList.add('bg-green-400');
            var tr = document.createElement('tr');
            var td1 = document.createElement('td');

            var td2 = document.createElement('td');

            var td3 = document.createElement('td');
            var totalPrice = document.getElementById('totalPrice').innerHTML;
            td1.innerHTML = seatName;
            td2.innerHTML = 'Economy';
            td3.innerHTML = price;
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tableNewRow.appendChild(tr);

        }

        document.getElementById('seat').innerHTML = seat;
        document.getElementById('countSeats').innerHTML = countSeats;
        totalPrice = price * countSeats;
        document.getElementById('totalPrice').innerHTML = totalPrice;


    });

}
