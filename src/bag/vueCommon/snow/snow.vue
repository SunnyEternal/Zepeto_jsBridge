<template>
  <span>
    <canvas id="christmasCanvas" style="top: 0px; left: 0px; z-index: 1; position: fixed; pointer-events: none;" ></canvas>
  </span>
</template>

<script>
export default {
  name : 'snow',
  mounted () {
    var snow = function() {
      var b = document.getElementById("christmasCanvas"),
          a = b.getContext("2d"),
          d = window.innerWidth,
          c = window.innerHeight;
          // c = document.querySelector('#app').offsetHeight;
      b.width = d;
      b.height = c;
      var num = 13;
      for(var e = [], b = 0;b < num;b++) {
        e.push({x:Math.random() * d,
                y:Math.random() * c,
                r:Math.random() * 6 + 1,
                d:Math.random() * num})
      }
      var h = 0;
      window.intervral4Christmas = setInterval(function() {
        a.clearRect(0, 0, d, c);
        a.fillStyle = "rgba(255, 255, 255, 0.5)";
        a.shadowBlur = 8;
        a.shadowColor = "rgba(255, 255, 255, 0.9)";
        a.beginPath();
        for(var b = 0;b < num;b++) {
          var f = e[b];
          a.moveTo(f.x, f.y);
          a.arc(f.x, f.y, f.r, 0, Math.PI * 2, !0)
        }
        a.fill();
        h += 0.01;
        for(b = 0;b < num;b++) {
          if(f = e[b], f.y += Math.cos(h + f.d) + 1 + f.r / 2,
            f.x += Math.sin(h) * 2, f.x > d + 5 || f.x < -5 || f.y > c) {
            e[b] = b % 3 > 0 ? {x:Math.random() * d, y:-10, r:f.r, d:f.d} :
            Math.sin(h) > 0 ? {x:-5, y:Math.random() * c, r:f.r, d:f.d} :
            {x:d + 5, y:Math.random() * c, r:f.r, d:f.d}
          }
        }
      }, 46)
  }
  snow();
  }
}
</script>
