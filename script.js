const   square1 = document.querySelector("#one"),
        square2 = document.querySelector("#two"),
        square3 = document.querySelector("#three"),
        square4 = document.querySelector("#four"),
        bubbleReset = document.querySelector("#bubbleReset"),
        bubbleRun = document.querySelector("#bubbleRun");
        // add more buttons for other displays
var div, bubbleScramble;

// random heights used for the display bars
let heights = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162, 164, 166, 168, 170, 172, 174, 176, 178, 180, 182, 184, 186, 188, 190, 192, 194, 196, 198, 200];

// ****** bubble sort ******

populateDisplays(square1, heights);

// scrambles bubble sort display
bubbleReset.addEventListener("click", () => {
    square1.innerHTML = "";
    bubbleScramble = shuffle(heights);
    console.log(bubbleScramble.length);
    populateDisplays(square1, bubbleScramble);
});
bubbleRun.addEventListener("click", () => {
    // const 
});

// sorts bubble sort display
bubbleRun.addEventListener("click", () => {
    counter = 0, solved = true;
    div = document.querySelectorAll(".item");
    bubbleSort();
});

// ****** helpers *****

// populates provided div with bars
function populateDisplays(div, heights) {
    heights.forEach(num => {
        let bar = document.createElement("div");
        bar.style.height = `${num}px`;
        bar.classList.add("item");
        div.appendChild(bar);
    });
}

// https://bost.ocks.org/mike/shuffle/
// Fisher-Yates Shuffle with an O(n) time complexity
function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}
// iterator that contains sorting algorithm
var counter, solved;
function bubbleSort() {
    let index = counter % (bubbleScramble.length - 1); // alternative to nested loops
    let temp;
    if (bubbleScramble[index] > bubbleScramble[index+1]) {
        temp = bubbleScramble[index];
        bubbleScramble[index] = bubbleScramble[index+1];
        bubbleScramble[index+1] = temp;

        // for display
        div[index].style.height = `${bubbleScramble[index]}px`;
        div[index+1].style.height = `${bubbleScramble[index+1]}px`;
        solved = false;
    }
    if (solved && counter > 1 && index == 0) {
        console.log("here");
        return;
    };
    if (index == 0 && counter > 1) {
        solved = true;
    }
    counter++;
    // bubble sort has a time complexity of O(n^2)
    if (counter < bubbleScramble.length ** 2) {
        setTimeout(bubbleSort, 5);
    }
}