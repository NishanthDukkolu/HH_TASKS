
    let count = 0;
    function updateDisplay() {
      const counter = document.getElementById("counter");
      counter.innerText = count;
      counter.style.transform = "scale(1.2)";
      setTimeout(() => counter.style.transform = "scale(1)", 200);
    }

    function increase() {
      count++;
      updateDisplay();
    }

    function decrease() {
      count--;
      updateDisplay();
    }

    function reset() {
      count = 0;
      updateDisplay();
    }
