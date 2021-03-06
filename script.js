// colors used
var colors = {
    main: "#6b5b95",
    sorted: "#13CE66",
    compare: "#FF4949",
    temp: "orange"
}

// *** bubble sort ***

// most of bubble sort section was taken from 
// https://www.geeksforgeeks.org/bubble-sort-visualization-using-javascript/

// time complexity of O(n^2)

const   bubbleDisplay = document.querySelectorAll(".display")[0],
        bubbleSortBtn = document.querySelector("#bubbleSort");

// Calling generatearray function
generatearray(bubbleDisplay);

bubbleSortBtn.addEventListener("click", async function () {
    this.classList.toggle("disabled");
    await BubbleSort();
    this.classList.toggle("disabled");
});

// Asynchronous BubbleSort function
async function BubbleSort(delay = 100) {
    let blocks = document.querySelectorAll("#one .block");

    // BubbleSort Algorithm
    for (let i = 0; i < blocks.length; i += 1) {
        for (let j = 0; j < blocks.length - i - 1; j += 1) {

            // To change background-color of the
            // blocks to be compared
            blocks[j].style.backgroundColor = colors.compare;
            blocks[j + 1].style.backgroundColor = colors.compare;

            // To wait for .1 sec
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );

            let value1 = Number(blocks[j].dataset.value);
            let value2 = Number(blocks[j + 1].dataset.value);

            // To compare value of two blocks
            if (value1 > value2) {
                await bubbleSwap(blocks[j], blocks[j + 1]);
                blocks = document.querySelectorAll("#one .block");
            }

            // Changing the color to the previous one
            blocks[j].style.backgroundColor = colors.main;
            blocks[j + 1].style.backgroundColor = colors.main;
        }

        //changing the color of greatest element 
        //found in the above traversal
        blocks[blocks.length - i - 1]
            .style.backgroundColor = colors.sorted;
    }
}

// Promise to swap two blocks
function bubbleSwap(el1, el2) {
    return new Promise((resolve) => {

        // For exchanging styles of two blocks
        el1.classList.toggle("leftSwap");
        el2.classList.toggle("rightSwap");

        window.requestAnimationFrame(function () {

            // For waiting for .25 sec
            setTimeout(async () => {
                el1.classList.toggle("leftSwap");
                el2.classList.toggle("rightSwap");
                bubbleDisplay.insertBefore(el2, el1);

                resolve();
            }, 250);
        });
    });
}

// *** selection sort ***

// time complexity of O(n^2)

const   selectionDisplay = document.querySelectorAll(".display")[1],
        selectionSortBtn = document.querySelector("#selectionSort");

// Calling generatearray function
generatearray(selectionDisplay);

selectionSortBtn.addEventListener("click", async function() {
    this.classList.toggle("disabled");
    await selectionSort();
    this.classList.toggle("disabled");
});

async function selectionSort(delay = 100) {
    let blocks = document.querySelectorAll("#two .block");

    for (let i = 0; i < blocks.length-1; i++) {
        // To change background-color of the
        // blocks to be compared
        blocks[i].style.backgroundColor = colors.compare;
        
        let temp = i;
        for (let j = i+1; j < blocks.length; j++) {
            // To change background-color of the
            // blocks to be compared
            blocks[j].style.backgroundColor = colors.compare;
            
            // To wait for .1 sec
            await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, delay)
            );
            
            let value1 = Number(blocks[temp].dataset.value);
            let value2 = Number(blocks[j].dataset.value);
            if (value1 > value2) {
                (temp!==i)?blocks[temp].style.backgroundColor = colors.main:"";
                temp = j;
                blocks[temp].style.backgroundColor = colors.temp;
            }
            else {
                blocks[j].style.backgroundColor = colors.main;
            }

        }
        // swaps the two
        if (temp !== i) {
            await selectionSwap(blocks[i], blocks[temp], temp-i);
            blocks = document.querySelectorAll("#two .block");
            blocks[i].style.backgroundColor = colors.sorted;
            blocks[temp].style.backgroundColor = colors.main;
        }
        else {
            blocks[i].style.backgroundColor = colors.sorted;
        }
    }
    blocks[blocks.length-1].style.backgroundColor = colors.sorted;
}

function selectionSwap(el1, el2, transform) {
    return new Promise((resolve) => {
        // add animations here
        el1.classList.toggle("transition");
        el1.style.transform = `translate(${transform * 18}px)`;
        
        el2.classList.toggle("transition");
        el2.style.transform = `translate(-${transform * 18}px)`;

        window.requestAnimationFrame(function () {

            // For waiting for .25 sec
            setTimeout(async () => {
                // remove animations here
                el1.classList.toggle("transition");
                el1.style.transform = "";

                el2.classList.toggle("transition");
                el2.style.transform = "";
                // swap heights
                let temp = el1.style.height;
                el1.style.height = el2.style.height;
                el2.style.height = temp;
            
                // swap values
                temp = el1.dataset.value;
                el1.dataset.value = el2.dataset.value;
                el2.dataset.value = temp;
                resolve();
            }, 250);
        });
    });
}
// *** Insertion sort ***

// time complexity of O(n^2)

const   insertionDisplay = document.querySelectorAll(".display")[2],
        insertionSortBtn = document.querySelector("#insertionSort");

// Calling generatearray function
generatearray(insertionDisplay);

insertionSortBtn.addEventListener("click", async function() {
    this.classList.toggle("disabled");
    await insertionSort();
    this.classList.toggle("disabled");
});

async function insertionSort(delay = 100) {
    let blocks = document.querySelectorAll("#three .block");

    let j; // used to traverse in reverse
    for (let i = 1; i < blocks.length; i++) {
            j = i - 1;

            // first element is technically always sorted
            blocks[0].style.backgroundColor = colors.sorted;
            // element to be compared with predecessors 
            blocks[i].style.backgroundColor = colors.compare;

            // To wait for .1 sec
            await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, delay)
            );
            let value1 = Number(blocks[j].dataset.value);
            let value2 = Number(blocks[i].dataset.value);
            let height = blocks[i].style.height; // used to change height once element is "inserted"

            // reverse traverser 
            while (j >= 0 && value1 > value2) {
                blocks[j].style.backgroundColor = colors.compare;
                await insertionShuffle(blocks[j+1], blocks[j]);
                j = j - 1;
                if (j >= 0) value1 = Number(blocks[j].dataset.value);
            }
            // if element to be sorted is not sorted do the following
            if (j+1 !== i) {
                // using index to reference proper element in setTimeout
                let index = j+1;
                blocks[index].style.backgroundColor = colors.sorted;
                blocks[index].classList.toggle("transition");
                blocks[index].style.opacity = "";
                blocks[index].style.height = height;
                blocks[index].dataset.value = value2;
                setTimeout(() => {
                    blocks[index].classList.toggle("transition");
                }, 250);
            }
            else {
                blocks[i].style.backgroundColor = colors.sorted;
            }
    }
}

function insertionShuffle(el_dest, el_source) {
    return new Promise((resolve) => {

        // adds animations here
        el_source.classList.toggle("transition");
        el_dest.style.opacity = "0";
        el_source.style.transform = `translate(18px)`;
        
        window.requestAnimationFrame(function () {
            
            // For waiting for .25 sec
            setTimeout(async () => {

                // removes animations here
                el_source.classList.toggle("transition");
                el_dest.style.opacity = "";
                el_source.style.transform = "";
                el_source.style.opacity = "0";

                el_dest.style.height = el_source.style.height;
            
                // moves value
                el_dest.dataset.value = el_source.dataset.value;

                el_dest.style.backgroundColor =  colors.sorted;
                
                resolve();
            }, 250);
        });
    });
}


// *** helpers ***

// Function to generate the array of blocks
function generatearray(container) {
    for (var i = 0; i < 20; i++) {

        // Return a value from 1 to 250 (both inclusive)--height of container
        var value = Math.ceil(Math.random() * 250);

        // Creating element div
        var array_ele = document.createElement("div");

        // Adding class 'block' to div
        array_ele.classList.add("block");

        // Adding style to div
        array_ele.style.height = `${value}px`;
        // data attribute to store value
        array_ele.dataset.value = value;

        // Appending created elements to index.html 
        container.appendChild(array_ele);
    }
}

// Note:
// adding a promise with setTimeout in an async function with for loop prevents
// code blocking