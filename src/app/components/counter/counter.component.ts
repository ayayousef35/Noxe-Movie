import { Component ,Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent  implements OnInit, OnDestroy {
  @Input() maxCount = 100; // Maximum count for this counter
  count = 0; // Current count
  intervalId: any;

  ngOnInit() {
    // Start counting when the component loads
    this.intervalId = setInterval(() => {
      if (this.count < this.maxCount) {
        this.count++;
      } else {
        this.stopCounting();
      }
    }, 30); // Adjust the interval speed as needed (50ms here)
  }

  stopCounting() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  ngOnDestroy() {
    // Cleanup the interval when the component is destroyed
    this.stopCounting();
  }
}
