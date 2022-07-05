// In this application a client can book a consultation and make a payment.

// var socket = io();

var Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

var Days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

var Schedules = [
    
    {
        day: "Sunday",
        index: 0,
        booking_times: [
        "09:00:00", "9:45:00", "10:15:00", "10:30:00", "15:45:00", "16:00:00"
        ]
    },
    {
        day: "Mon",
        index: 1,
        booking_times: [
            "9:00:00", "09:00:00", "10:45:00", "11:15:00", "13:30:00", "13:30:00", "13:30:00", "15:45:00", "18:00:00"
        ]
    },
    {
        day: "Tues",
        index: 2,
        booking_times: [
            "13:00:00", "09:15:00", "11:30:00", "10:30:00", "15:45:00", "16:00:00"
        ]
    }
]
var date = new Date();

window.addEventListener("load", DatePicker);

function DatePicker () {
    var BookingDates = document.querySelector("#BookingDates");
    var Month;
    var Day = date.getDay();
    var Dates = date.getDate();
    for (var j = 0; j < 5; j++) {
        Dates = Dates + 1;
        Day = new Date(date.getFullYear(), date.getMonth(), Dates).getDay();
        // create a component
        var BookDate = document.createElement("div");
        BookDate.className = "booking-dates";
        BookDate.name = Days[Day];
        BookDate.value = Day;
        BookDate.innerHTML+= `
            <h1> ${ Dates } </h1>
            <span> ${ Days[Day] } </span>
            <input type="checkbox" name="${ Days[Day] }" value=${ Day } hidden />
            <i name="isChecked" class="fa-regular fa-circle-check" style="font-size: 16px;"></i>
        `;
        BookingDates.appendChild(BookDate);
    }
    TimePicker();
}

function UpdateDatePicker (e) {

}

function TimePicker () {
    var BookingTimes = document.querySelector("#BookingTimes");
    // since this is the default, I just only want the first one.
    var BookingDates = document.getElementsByClassName("booking-dates")[0];
    var BookingDateName = BookingDates.name;
    var BookingDateIndex = BookingDates.value;
    //console.log("name: " + BookingDateName + "\tindex: " + BookingDateIndex);
    // map through the array in schedules
    Schedules.map(schedule => {
        if (schedule['index'] === BookingDateIndex) {
            // map through appointments
            schedule['booking_times'].sort().map(booking => {
                // HOURS: convert hours to 12 hour format
                if (booking.split(":")[0] > 11) {
                    booking.split(":")[0] = (booking.split(":")[0] - 12);
                }
                // MINUTES: when first digits are too small
                /*if (booking.split(":")[1] < 10) {
                    booking.split(":")[1] = "0" + booking.split(":")[1];
                    console.log("minutes: " + booking);
                }*/
                // change the right time of the day
                /*if (booking.split(":")[0] < 12 || booking.split(":")[0] === 24) {
                    console.log("morning time");
                    booking.split(":")[1] = booking.split(":")[1] + " am";
                }
                else if (booking.split(":")[0] >= 12 || booking.split(":")[0] < 23) {
                    console.log("evening time");
                    booking.split(":")[1] = booking.split(":")[1] + " pm";
                }*/
                // check results
                console.log("book times:\t" + booking);

                // create each component
                var BookTimes = document.createElement("div");
                BookTimes.className = "bookings  container d-flex align-items-center justify-content-center";
                BookTimes.innerHTML = `
                    <!-- Consultants Name -->
                    <article class=" container d-flex flex-column align-items-center justify-content-center">
                        <span> Jessica Altricia </span>
                        <span> Financial Consultant </span>
                    </article>
                    <!-- Dates -->
                    <div class=" container d-flex flex-column align-items-center justify-content-center">
                        <span class="book-month"> ${ Months[ new Date().getMonth() ] } </span>
                        <h1 class="book-date"> ${ BookingDates.childNodes[1].innerHTML } </h1>
                        <span class="book-day"> ${ BookingDateName } </span>
                    </div>
                    <!-- Times -->
                    <div class="book-time-container container d-flex flex-column align-items-center justify-content-center">
                        <h1 class="book-time"> ${ booking.split(":")[0] } : ${ booking.split(":")[1].split(":")[0] } </h1>
                    </div>

                    <button type="button" name="book_now"> Book Now </button>
                `;
                BookingTimes.appendChild(BookTimes);
            })
        }
        else {
            return
        }
    })
}

function UpdateTimePicker (e) {

}
// Render before the client a list of days that they can select from
function AddBookingsList () {
    var BookingsList = document.querySelector("#BookingsList");

}