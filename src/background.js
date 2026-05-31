// background.js

let currentTabIndex = 0;
let intervalId = null;
let switchInterval = 15000; // پیش‌فرض: 15 ثانیه

chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

// تابعی برای سوییچ کردن به تب بعدی
function switchToNextTab() {
  chrome.tabs.query({ currentWindow: true, pinned: true }, (tabs) => {
    if (tabs.length > 0) {
      // پیدا کردن ایندکس تبی که الان فعال است در لیست تب‌های پین شده
      const activeTab = tabs.find(tab => tab.active);
      let nextIndex = 0;
      
      if (activeTab) {
        const currentIndex = tabs.indexOf(activeTab);
        nextIndex = (currentIndex + 1) % tabs.length;
      }
      
      chrome.tabs.update(tabs[nextIndex].id, { active: true });
    }
  });
}

// تابعی برای شروع سوییچ خودکار
function startAutoSwitcher() {
  if (intervalId === null) {
    currentTabIndex = 0; // ریست کردن ایندکس در لحظه شروع
    intervalId = setInterval(switchToNextTab, switchInterval);
  }
}


// تابعی برای توقف سوییچ خودکار
function stopAutoSwitcher() {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
    console.log('Auto switcher stopped');
  }
}

// دریافت تنظیمات از popup (اگر وجود داشته باشد)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "set_interval") {
    const newInterval = parseInt(request.interval, 10);
    if (!isNaN(newInterval) && newInterval > 0) {
      switchInterval = newInterval * 1000; // تبدیل به میلی‌ثانیه
      stopAutoSwitcher(); // توقف با اینتروال قبلی
      startAutoSwitcher(); // شروع با اینتروال جدید
      sendResponse({ success: true, message: `Interval set to ${newInterval} seconds.` });
    } else {
      sendResponse({ success: false, message: 'Invalid interval value.' });
    }
  } else if (request.action === "start") {
    startAutoSwitcher();
    sendResponse({ success: true, message: 'Auto switcher started.' });
  } else if (request.action === "stop") {
    stopAutoSwitcher();
    sendResponse({ success: true, message: 'Auto switcher stopped.' });
  } else if (request.action === "get_status") {
      sendResponse({ interval: switchInterval / 1000, isRunning: intervalId !== null });
  }
  return true; // برای اینکه sendResponse کار کند
});

// وقتی اکستنشن نصب یا آپدیت میشه، اینتروال پیش‌فرض رو اجرا کن
// startAutoSwitcher(); // اگر میخوای با نصب اکستنشن خودکار شروع بشه
