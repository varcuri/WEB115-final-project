// Selecting which day to edit
const daySelector = document.getElementById('daySelector');
function resetSelectedIndex() {
    daySelector.selectedIndex = 0;
}

const dayMap = new Map();
const mondayEdit = document.getElementById("mondayEdit");
const tuesdayEdit = document.getElementById("tuesdayEdit");
const wednesdayEdit = document.getElementById("wednesdayEdit");
const thursdayEdit = document.getElementById("thursdayEdit");
const fridayEdit = document.getElementById("fridayEdit");
const saturdayEdit = document.getElementById("saturdayEdit");
const sundayEdit = document.getElementById("sundayEdit");
dayMap.set('monday', mondayEdit);
dayMap.set('tuesday', tuesdayEdit);
dayMap.set('wednesday', wednesdayEdit);
dayMap.set('thursday', thursdayEdit);
dayMap.set('friday', fridayEdit);
dayMap.set('saturday', saturdayEdit);
dayMap.set('sunday', sundayEdit);

function hideAllOtherDays() {
    const selector = document.getElementById("daySelector");
    let selection = selector.value;
    for (let [key, value] of dayMap) {
        if (!value.classList.contains("hidden")) {
            value.classList.add("hidden")
        }
    }
    let sectionToShow = dayMap.get(selection);
    console.log(selection);
    sectionToShow.classList.remove("hidden");
}

window.addEventListener("load", resetSelectedIndex);
daySelector.addEventListener("change", hideAllOtherDays);



// Clear Inputs

inputArray = [];
for (day of "MO TU WE TH FR SA SU".split(" ")){
    for (meal of "breakfast snack1 lunch snack2 dinner".split(" ")) {
        let curInput = document.getElementById(day + "" + meal);
        inputArray.push(curInput);
    }
}
inputArray.push(document.getElementById("name"));
inputArray.push(document.getElementById("email"));
inputArray.push(document.getElementById("goal"));

function clearAllInputs() {
    for (let input of inputArray) {
        input.value = "";
        // Reset selected index
        resetSelectedIndex();
        hideAllOtherDays();
    }
}

const clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", clearAllInputs);


// Use Default Options
function useDefault() {
    mealDataArray = [];
    for (day of "MO TU WE TH FR SA SU".split(" ")){
        for (meal of "breakfast snack1 lunch snack2 dinner".split(" ")) {
            let curInput = document.getElementById(day + "" + meal);
            mealDataArray.push(curInput);
        }
    }
    for (let mealText of mealDataArray) {
        mealText.value = mealText.placeholder;
    }
}
const defaultBtn = document.getElementById("defaultBtn");
defaultBtn.addEventListener("click", useDefault);

// Print/Download Function
function printDownload() {
    const mealTable = document.getElementById("mealTable");
    const printableArea = mealTable.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printableArea;
    window.print();
    document.body.innerHTML = originalContent;
} 

// Build Meal Plan
function createObject() {
    let mealObject = {
        userName: document.getElementById("name").value,
        userEmail: document.getElementById('email').value,
        goal: document.getElementById('goal').value,


        mondayBreakfast: document.getElementById("MObreakfast").value.split(", "),
        mondaySnack1: document.getElementById("MOsnack1").value.split(", "),
        mondayLunch: document.getElementById("MOlunch").value.split(", "),
        mondaySnack2: document.getElementById("MOsnack2").value.split(", "),
        mondayDinner: document.getElementById("MOdinner").value.split(", "),

        tuesdayBreakfast: document.getElementById("TUbreakfast").value.split(", "),
        tuesdaySnack1: document.getElementById("TUsnack1").value.split(", "),
        tuesdayLunch: document.getElementById("TUlunch").value.split(", "),
        tuesdaySnack2: document.getElementById("TUsnack2").value.split(", "),
        tuesdayDinner: document.getElementById("TUdinner").value.split(", "),

        wednesdayBreakfast: document.getElementById("WEbreakfast").value.split(", "),
        wednesdaySnack1: document.getElementById("WEsnack1").value.split(", "),
        wednesdayLunch: document.getElementById("WElunch").value.split(", "),
        wednesdaySnack2: document.getElementById("WEsnack2").value.split(", "),
        wednesdayDinner: document.getElementById("WEdinner").value.split(", "),

        thursdayBreakfast: document.getElementById("THbreakfast").value.split(", "),
        thursdaySnack1: document.getElementById("THsnack1").value.split(", "),
        thursdayLunch: document.getElementById("THlunch").value.split(", "),
        thursdaySnack2: document.getElementById("THsnack2").value.split(", "),
        thursdayDinner: document.getElementById("THdinner").value.split(", "),

        fridayBreakfast: document.getElementById("FRbreakfast").value.split(", "),
        fridaySnack1: document.getElementById("FRsnack1").value.split(", "),
        fridayLunch: document.getElementById("FRlunch").value.split(", "),
        fridaySnack2: document.getElementById("FRsnack2").value.split(", "),
        fridayDinner: document.getElementById("FRdinner").value.split(", "),

        saturdayBreakfast: document.getElementById("SAbreakfast").value.split(", "),
        saturdaySnack1: document.getElementById("SAsnack1").value.split(", "),
        saturdayLunch: document.getElementById("SAlunch").value.split(", "),
        saturdaySnack2: document.getElementById("SAsnack2").value.split(", "),
        saturdayDinner: document.getElementById("SAdinner").value.split(", "),

        sundayBreakfast: document.getElementById("WEbreakfast").value.split(", "),
        sundaySnack1: document.getElementById("WEsnack1").value.split(", "),
        sundayLunch: document.getElementById("WElunch").value.split(", "),
        sundaySnack2: document.getElementById("WEsnack2").value.split(", "),
        sundayDinner: document.getElementById("WEdinner").value.split(", "),
    }
    return mealObject;
}

function listBuilder(array) {
    string = '\t\t<ul>\n'
    if (array && array[0] != "") {
        for (let item of array) {
            let newItem = '\t\t\t<li>' + item + '</li>\n';
            string += newItem;
        }
    }
    string += "\t\t</ul>\n";
    return string;
}

function tableBuilder(mealObject) {
    table_string = "<table id='mealTable'>\n<tr>\n<th></th>\n"
    days = "monday tuesday wednesday thursday friday saturday sunday".split(" ");
    meals = "Breakfast Snack1 Lunch Snack2 Dinner".split(" ");
    for (let day of days) {
        let newItem = "\t<th>" + day + "</th>\n";
        table_string +=  newItem;
    }
    for (let meal of meals) {
        table_string += "</tr>\n<tr>\n";
        table_string += "\t<th>" + meal + "</th>\n";
        for (let day of days) {
            let newMeal = "\t<td>\n" + listBuilder(mealObject[day + "" + meal]) + "\t</td>\n";
            table_string += newMeal;
        } 
    }
    table_string += "</tr>\n</table>";
    return table_string;
}
function makePageTitle(nameString) {
    if (nameString && nameString != "") {
        return nameString + "'s Meal Plan";
    } else {
        return "Your Meal Plan";
    }
}

function makeGoal(goalString) {
    if (goalString && goalString != "") {
        return "<p> <strong>Goal</strong>: "+ goalString + "</p>\n";
    } else {
        return "";
    }
}

function createMealPage(mealObject) {
    mealPage = `
    <!DOCTYPE html>
    <html>
        <head>
            <link rel="stylesheet" href="meal.css"/>
            <title>${makePageTitle(mealObject.userName)}</title>
        </head>
        <body>
            <button id="print" onclick="printDownload()">Print/Download</button>
            <div id="printableArea">
                <h2>${makePageTitle(mealObject.userName)}</h2>
                ${makeGoal(mealObject.goal)}
                ${tableBuilder(mealObject)}
            </div>
            <script>
                function printDownload() {
                    const printContent = document.getElementById("printableArea").innerHTML;
                    let page = document.body.innerHTML;
                    document.body.innerHTML = printContent;
                    window.print();
                    document.body.innerHTML = page;
                } 
            </script>
        </body>
    </html>
    `
    return mealPage;

}

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(email);

}

const createBtn = document.getElementById("create");
createBtn.addEventListener("click", function() {
    obj = createObject();
    if (validateEmail(obj.userEmail)) {
        flyWindow = window.open('about:blank','myPop','width=1200,height=400,left=100,top=100');
        flyWindow.document.write(createMealPage(obj));
    } else {
        const email = document.getElementById("email");
        email.classList.add("invalid");
        email.addEventListener("focus", function() {
            this.classList.remove("invalid");
        });
        window.alert("Please enter a valid email address.");
    }
    console.log(tableBuilder(obj));
});
