<template>
  <div :class="{'saveSucToast': true, 'run': state}" v-show='state'>
    {{text}}
  </div>
</template>
<script>
  export default {
    props: {
      state: {
        type: Boolean,
        default: false
      },
      text: {
        type: String
      }
    }
  }
</script>
<style lang="scss">
.saveSucToast{
  position: fixed;white-space:nowrap;background-color: rgba(0,0,0,.6);z-index: 666;left:50%;top:50%;transform: translate(-50%,-50%);
  color:#fff;border-radius: .4rem;padding:.2rem .4rem;margin-top:1.2rem;opacity:1;}
.saveSucToast.run{
  margin-top:0;opacity: 1;
  animation: toastRun .3s ease-out alternate;
}

@keyframes toastRun{
  0%{
    margin-top:1.2rem;opacity: 0;
  }
  100%{
    margin-top:0;opacity: 1;
  }
}
</style>
