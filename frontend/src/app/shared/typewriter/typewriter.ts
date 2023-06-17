export class Typewriter {
  private divEl: HTMLElement;
  private text: string;
  private interval: number;
  private delay: number;
  private options: any;
  private type: string;

  constructor(id, options) {
    this.divEl = document.getElementById(id);
    this.interval = options.interval || 100;
    this.delay = options.delay || 0;
    this.options = options;
    this.type = this.options.type;
  }

  run() {
    console.log(this.divEl)
    this.text = this.divEl.innerText;
    this.divEl.style.padding = "0.0000001px";
    this.divEl.innerText = "";

    setTimeout(() => {
      if (this.type === "forward") {
        this.runFowardTypeWritertype();
      }

      if (this.type === "forward-backward") {
        this.runForwardBackwardsTypeWritertype();
      }

      if (this.type === "alternate") {
        this.runAlternateTypeWritertype();
      }

      if (this.type === "flicker") {
        this.runFlicker();
      }
    }, this.delay);
  }

  /**
   * Forward once
   */
  runFowardTypeWritertype() {
    let i = 0;

    const timer = setInterval(() => {
      if (i > this.text.length) {
        clearInterval(timer);
      } else {
        this.divEl.innerHTML = this.text.slice(0, i);
        i++;
      }
    }, this.interval);
  }

  /**
   * Forward and backwards (Once)
   */
  runForwardBackwardsTypeWritertype() {
    let i = 0;
    let flag = 0;

    const timer = setInterval(() => {
      if (flag === 1) {
        i--;
        this.divEl.innerHTML = this.text.slice(0, i);
        i === 0 && clearInterval(timer);
      }
      if (flag === 0) {
        i === this.text.length ? (flag = 1) : null;
        this.divEl.innerHTML = this.text.slice(0, i);
        i++;
      }
    }, this.interval);
  }

  /**
   * Forward and backwards (Infinite)
   */

  runAlternateTypeWritertype() {
    let i = 0;
    let flag = 0;
    const timer = setInterval(() => {
      if (flag == 1) {
        i--;
        this.divEl.innerHTML = this.text.slice(0, i);
        if (i === 0) {
          flag = 0;
        }
      }

      if (flag === 0) {
        i === this.text.length ? (flag = 1) : null;
        this.divEl.innerHTML = this.text.slice(0, i);
        i++;
      }
    }, this.interval);
  }

  /**
   * Flicker
   */
  runFlicker() {
    let flag = true;
    const timer = setInterval(() => {
      flag ? (this.divEl.innerText = "") : (this.divEl.innerText = this.text);
      flag = !flag;
    }, this.interval);
  }
}
