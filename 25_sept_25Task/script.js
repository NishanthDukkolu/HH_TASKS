
    function updateClock() {
      let now = new Date();

      let hours = now.getHours();
      let minutes = now.getMinutes();
      let seconds = now.getSeconds();


      let ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      document.getElementById("clock").innerText = `${hours}:${minutes}:${seconds} ${ampm}`;
    }
     
     setInterval(updateClock, 1000);
     updateClock();