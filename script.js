var bubbleDisplay = document.querySelectorAll(".display")[0];

// *** bubble sort ***

// most of this section was taken from 
// https://www.geeksforgeeks.org/bubble-sort-visualization-using-javascript/

// Function to generate the array of blocks
function generatearray() {
    for (var i = 0; i < 20; i++) {

        // Return a value from 1 to 250 (both inclusive)--height of container
        var value = Math.ceil(Math.random() * 250);

        // Creating element div
        var array_ele = document.createElement("div");

        // Adding class 'block' to div
        array_ele.classList.add("block");

        // Adding style to div
        array_ele.style.height = `${value}px`;
        // array_ele.style.transform = `translate(${i * 6}px)`; might remove permanently if i can make alternative

        // data attribute to store value
        array_ele.dataset.value = value;

        // Appending created elements to index.html 
        bubbleDisplay.appendChild(array_ele);
    }
}

// Promise to swap two blocks
function swap(el1, el2) {
    return new Promise((resolve) => {

        window.requestAnimationFrame(function () {

            // For waiting for .25 sec
            setTimeout(() => {
                bubbleDisplay.insertBefore(el2, el1);           // make changes here!
                resolve();
            }, 10); //set to 250
        });
    });
}

// Asynchronous BubbleSort function
async function BubbleSort(delay = 100) {
    var blocks = document.querySelectorAll(".block");

    // BubbleSort Algorithm
    for (var i = 0; i < blocks.length; i += 1) {
        for (var j = 0; j < blocks.length - i - 1; j += 1) {

            // To change background-color of the
            // blocks to be compared
            blocks[j].style.backgroundColor = "#FF4949";
            blocks[j + 1].style.backgroundColor = "#FF4949";

            // To wait for .1 sec
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );

            console.log("run");
            var value1 = Number(blocks[j].dataset.value);
            var value2 = Number(blocks[j + 1].dataset.value);

            // To compare value of two blocks
            if (value1 > value2) {
                await swap(blocks[j], blocks[j + 1]);
                blocks = document.querySelectorAll(".block");
            }

            // Changing the color to the previous one
            blocks[j].style.backgroundColor = "#6b5b95";
            blocks[j + 1].style.backgroundColor = "#6b5b95";
        }

        //changing the color of greatest element 
        //found in the above traversal
        blocks[blocks.length - i - 1]
            .style.backgroundColor = "#13CE66";
    }
}

// Calling generatearray function
generatearray();

// Calling BubbleSort function
BubbleSort(10);