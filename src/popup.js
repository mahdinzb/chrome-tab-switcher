// popup.js

document.addEventListener('DOMContentLoaded', () => {
  const intervalInput = document.getElementById('interval');
  const startBtn = document.getElementById('startBtn');
  const stopBtn = document.getElementById('stopBtn');
  const statusDiv = document.getElementById('status');

  // گرفتن وضعیت اولیه اکستنشن
  chrome.runtime.sendMessage({ action: "get_status" }, (response) => {
    if (response) {
      intervalInput.value = response.interval;
      updateStatus(response.isRunning);
    }
  });

  startBtn.addEventListener('click', () => {
    const intervalValue = intervalInput.value;
    chrome.runtime.sendMessage({ action: "set_interval", interval: intervalValue }, (response) => {
      if (response && response.success) {
        updateStatus(true);
        console.log(response.message);
      } else {
        alert(response ? response.message : 'Error communicating with background script.');
      }
    });
  });

  stopBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: "stop" }, (response) => {
      if (response && response.success) {
        updateStatus(false);
        console.log(response.message);
      } else {
        alert(response ? response.message : 'Error communicating with background script.');
      }
    });
  });

  function updateStatus(isRunning) {
    if (isRunning) {
      statusDiv.textContent = `Status: Running (every ${intervalInput.value}s)`;
      statusDiv.style.color = 'green';
      startBtn.disabled = true;
      stopBtn.disabled = false;
    } else {
      statusDiv.textContent = 'Status: Idle';
      statusDiv.style.color = 'red';
      startBtn.disabled = false;
      stopBtn.disabled = true;
    }
  }
});
