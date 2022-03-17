/**
 * Clock
 *
 */
export class CustomBlockTime {
  constructor(el, format = '24') {
    this.el = el;
    this.format = format;
    this.createEls();
    this.hourEl = this.el.querySelector('.time__hour');
    this.minuteEl = this.el.querySelector('.time__minute');
    this.oldTime = this.getCurrentTime();
    this.updateTime(this.oldTime); // set time once at start
    setInterval(() => { this.loop() }, 5000);
  }

  createEls() {
    const timeHourEl = document.createElement('span');
    const timeSeperatorEl = document.createElement('span');
    const timeMinuteEl = document.createElement('span');
    timeHourEl.classList.add('time__hour');
    timeSeperatorEl.classList.add('time__seperator');
    timeSeperatorEl.innerText = ':';
    timeMinuteEl.classList.add('time__minute');
    this.el.appendChild(timeHourEl);
    this.el.appendChild(timeSeperatorEl);
    this.el.appendChild(timeMinuteEl);
  }

  getCurrentTime(format = this.format) {
    let time = new Date();
    let hour = Number(time.toLocaleString([], {
      timeZone: 'Europe/London',
      hour: 'numeric',
      hour12: false,
    }));

    let minute = time.toLocaleString([], {
      timeZone: 'Europe/London',
      minute: '2-digit',
    });

    minute = parseInt(minute);
    minute = (minute < 10 ? '0' : '') + minute;

    if (format == '12') {
      let mid = hour >= 12 ? 'pm' : 'am';
      minute = minute + mid;
      hour = hour > 12 ? hour - 12 : hour;
    } else {
      hour = parseInt(hour);
      hour = (hour < 10 ? '0' : '') + hour;
    }

    return {
      hour: hour,
      minute: minute,
    }
  }

  updateTime(time) {
    this.hourEl.innerText = time.hour;
    this.minuteEl.innerText = time.minute;
  }

  loop() {
    let newTime = this.getCurrentTime(this.format);
    if (this.oldTime != newTime) {
      this.updateTime(newTime);
    }
  }
}
