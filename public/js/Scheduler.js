// In this application, a team member is responsible in choosing the days they are available for their clients to schedule meetings with them. Each client selects a day or group of days to start with and then add corresponding times to each day that has beeng selected. If they want to set a day off, then they will have to manually go in and change that specified day.

//var socket = io("localhost:3501");

/*
Step 1 Select an individual or group of days that will share the same time(s);
a. create a list of days, where each day is a input type 'checkbox';
b. every input will have a value of a number and a name with the name they are associated with. 

note: These days are automatically selected as available by default and repeated every calendar month and year. Only you have to manually go in and choose to select a day as unavailable.
*/
window.addEventListener("load", select_appointment_days);

function select_appointment_days () {
    
    const list = document.querySelector("#days-of-the-week");

    const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

    days.map((day, idx)=> {
        // create a new element with a value of number and name of the day.
        var apptDay = document.createElement("div");
        apptDay.name = days[idx];
        apptDay.value = false;
        apptDay.className = "days";
        apptDay.innerHTML = `
            <h1> ${days[idx]} </h1>
            <input type='checkbox' name = ${ days[idx] } value = ${ idx } hidden />
            <i name="isChecked" class="fa-regular fa-circle-check" style="font-size: 28px;"></i>
        `;
        apptDay.onclick = function () {
            check_day(this);
        }

        list.appendChild(apptDay);

    });

    create_schedule_days();

}

/*
    Step 2: Add to the schedule all of these days as an object.
    a. we need to do this so that by unchecking a day will not remove it from the array unless we explicitly want to.

*/
function create_schedule_days () {
    var appointments = document.getElementsByClassName("days");
    // map through each one first
    for(var appt of appointments) {
        var day = new Object({
            day: "",
            index: null,
            appointment_times: []
        });
        day.day = appt.childNodes[3].name;
        day.index = appt.childNodes[3].value;
        schedules.push(day);
    }
    // let's check the array
    console.log("schedule:\t" + JSON.stringify(schedules));
}

// highlights a selected or checked day
function check_day (e) {

    var checkedBox = e.childNodes[3];

    var checkedIcon = e.childNodes[5];

    if (e.value === false) {
        e.value = true;
        // set checkbox to true
        checkedBox.checked = true;
        // change the color
        checkedIcon.style.color = "rgb(127, 255, 0)";
    }

    else if (e.value === true) {
        e.value = false;
        // set checkbox to true
        checkedBox.checked = false;
        // change the color
        checkedIcon.style.color = "white";

    }
}


function add_schedule_times (e) {
    var checkBoxes = document.getElementsByClassName("days");
    // only days that are checked.
    for (var j = 0; j < checkBoxes.length; j++) {
        if (checkBoxes[j].value === true) {
            // check results
            //console.log("only " + j + " are checked!");
            // display the time schedule picker
            //document.getElementById("set-schedule-hours").style.display = "flex";
            //open_appointment_times();
        }
    }
}

function close_schedule_times (e) {
    document.querySelector("#set-schedule-hours").style.display = "none";
}

function remove_time_from_schedule (e) {

        // remove from schedules array.
        // map through schedules
        for (var schedule of schedules) {
            //console.log(schedule);
            //console.log(schedule.value);
            //console.log(e.childNodes[3].value);
            if (schedule.index.includes(parseInt(e.childNodes[3].value)) === true) {
                schedules.pop();
            }
        }

}

/*
    Step 3: Select a time for each day selected.
    a. choose a time and then a time of day.
    b. if  a user selects 'pm' over am, 12 will be added to that time to convert it from 12-hr format to 24-hr format for the database.
    c. create an object that looks like so and that appends all of its hours here.
    d. at the end when you are satisfied, you then can click save and it will activate a for loop that maps through each day object in the schedule array and then sends to database to store; it also will place them on the schedule sheet too, the newly added ones.
*/
var schedules = [];


/*
    Step 4.
    a. let's add the time to our days that are in the array schedule.
    b. for every day associated with them, they'll be add to each hour and minute in their array for database.
*/


function set_time (e) {

    var scheduleHours = document.querySelector("input[name='schedule_hours']").value;

    var scheduleMinutes = document.querySelector("input[name='schedule_minutes']").value;

    var selectScheduleTime = document.querySelector("select[name='select_schedule_time']").value;

    var scheduleTime;

    // transform the time to fit into the database properly
    if (selectScheduleTime === "pm") {
        scheduleHours = parseInt(scheduleHours) + 12;
    }

    // parse the lesser hours
    if (scheduleHours < 10) {
        scheduleHours = "0" + scheduleHours;
    }

    // parse the lesser minutes
    if (scheduleMinutes < 10) {
        scheduleMinutes = "0" + scheduleMinutes;
    }
    
    scheduleTime = scheduleHours + ":" + scheduleMinutes;

    console.log("Schedule time " + scheduleTime);

    var checkBoxes = document.getElementsByClassName("days");

    // only days that are checked.
    for (var j = 0; j < checkBoxes.length; j++) {
        if (checkBoxes[j].value === true) {
            
            // display the time schedule picker
            schedules[j].appointment_times.push(scheduleTime);
        }
    }
    // open up the schedules array and append times to  each one.
    /*for (var schedule of schedules) {
        schedule.appointment_times.push(scheduleTime);
    }*/

    // check schedules
    console.log("Schedule:\n" + JSON.stringify(schedules));

    close_appointment_times();

}

/*
    Step 5 Now let's create the dates for a certain amount of years

    // create the years variable
    const years = 5;

    var initial_year = new Date().getFullYear();
    var initial_month = new Date().getMonth();
    var initial_date = new Date().getDate();

    // loop through years
    for (var yr of initial_year) {
        // loop through months
        for (var m of 12) {
            // loop through dates
            dates_per_month(yr, m);
        }
    }

    function dates_per_month (yr, m) {
        return new Date(yr, m, 0);
    }

*/



// opens the form to create a schedule
function open_appointment_form (e) {
    document.querySelector("form[name='schedule_form']").style.display = "flex";   
}

function close_appointment_form (e) {
    document.querySelector("form[name='schedule_form']").style.display = "none";
}

function open_appointment_times () {
    document.querySelector("#set-schedule-hours").style.display = "flex";
}

// closes the form when you do not need to create a schedule
function close_appointment_times () {
    document.querySelector("#set-schedule-hours").style.display = "none";
}


// create a list of times that team is available. 