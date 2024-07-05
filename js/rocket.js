var index = 0;
var speed = 1000;
var scroller
var image = 0;
var clone = 0;
var timer = null;
var countdownNumber = 10;
var isRunning = false;

document.addEventListener('DOMContentLoaded', () => {
    scroller = document.querySelector('.scroller');
    image = document.querySelector('.scroller-img');

    // Clone the image element and append it to the scroller
    clone = image.cloneNode();
    scroller.appendChild(clone);
});
async function appendImageClone() {
    // Create a promise that resolves when the animation ends
    const animationPromise = new Promise(resolve => {
        const animation = scroller.animate([
            { transform: "translateY(-50%)" },
            { transform: "translateY(0)" }
        ], {
            duration: speed,
        });
        animation.onfinish = () => {
            resolve();
        };
    });

    // Wait for the animation to complete
    await animationPromise;

    index++;
    console.log(`Current index: ${index}`);
}

// Example of calling appendImageClone() multiple times
async function runAnimationMultipleTimes() {
    while (true) {
        if (isRunning) {
            await appendImageClone();
            if (index == 15) {
                scroller.classList.add("skytransition");
            } else if (index == 27) {
                image.src = "kuvat/star_space.jpg";
                clone.src = "kuvat/star_space.jpg";
                console.log("background image changed");
            } else if (speed > 200) {
                speed = speed - 100;
            }
        } else {
            index = 0;
            speed = 1000;
            image.src = "kuvat/sky.jpg";
            clone.src = "kuvat/sky.jpg";
            scroller.classList.remove("skytransition");
            break;  
        }
    }
}

image.onload = () => {
    const imageHeight = image.clientHeight;
    scroller.style.height = `${imageHeight * 2}px`;
};

// Check if the image is already loaded (for cached images)
if (image.complete) {
    image.onload();
}





var changeState = function (state) {
    document.body.className = 'body-state' + state;
    clearInterval(timer);
    countdownNumber = 10;

    document.getElementById('countdown').innerHTML = countdownNumber;

    if (state == 2) {
        timer = setInterval(function () {
            countdownNumber--;
            document.getElementById('countdown').innerHTML = countdownNumber;

            if (countdownNumber > 5 && countdownNumber <= 7) {
                //be nervous
                document.getElementById('nervous').className = 'nervous show';
            } else {
                document.getElementById('nervous').className = 'nervous';
            }

            if (countdownNumber > 1 && countdownNumber <= 3) {
                // can't wait
                document.getElementById('cant-wait').className = 'cant-wait show';
            } else {
                document.getElementById('cant-wait').className = 'cant-wait';
            }

            if (countdownNumber <= 0) {
                isRunning = true;
                changeState(3);
                runAnimationMultipleTimes();
            };
        }, 800);
    } else if (state == 3) {
        var success = setTimeout(function () {

            var randomNumber = Math.round(Math.random() * 10);
            console.log(randomNumber);
            //succes
            if (randomNumber > 5) {
                changeState(4);

            } else {
                changeState(5); // oh no
                isRunning = false;

            }
        }, 4000)
    }
}
// reset speeches
function reset() {
    document.getElementById('cant-wait').className = 'cant-wait';
    document.getElementById('nervous').className = 'nervous';
    isRunning = false;
}

