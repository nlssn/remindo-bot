/* TODO:
   I need to intergrate Luxon for proper timezones

   Also the countdown function needs proper work.
   the 12, 12, 0 should be replaced with nextLecture.date but converted to day,hour,minute
*/

/* Run this every hour */
setInterval(() => {
   let now = new Date();
   let in15 = new Date(now.getTime() + 15 * 60000);
   let next = new Date(nextLecture.date);

   if (next > now && next < in15) {
      nextAlert = nextLecture;
      countdown(alert);
      console.log('found one');
   }
}, 60 * 60 * 1000);

/* Count down to next lecture minus five mins */
// https://stackoverflow.com/questions/19088040/how-to-run-a-function-at-specific-time-date
function countdown(cb) {
   (function loop() {
      let now = new Date();
      if (now.getDate() === 12 && now.getHours() === 12 && now.getMinutes() === 0) {
         cb();
      }
      now = new Date();
      var delay = 60000 - (now % 60000);
      setTimeout(loop,delay);
   })();
}

/* Alert the chat about the upcoming lecture */
function alert() {
   if(nextAlert) {
      console.log(nextAlert);
   }
}