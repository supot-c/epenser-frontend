<template>
  <div class="container">
    <div :class="wallet.type" :id='wallet.mode' @mouseenter="hover(true)" @mouseleave="hover(false)">
      <div @click="$emit('pickk')">
        <h5>{{ wallet.name }}</h5>
        <p style="max-width:450px;overflow:hidden;">{{ wallet.description }}</p>
        <h1 class="amount"><strong>฿ {{ wallet.amount }}</strong></h1>
      </div>
      <transition name='toolbar'>
        <div class="tools" style="" v-if="tools">
          <b-button variant="link" class="tool text-light" @click="$emit('edit')">edit</b-button>
          <b-button variant="link" class="tool text-light" @click="$emit('delete')">delete</b-button>
        </div>
      </transition>
    </div>
    <transition>
      <div v-if="wallet.mode==='topcard'">
        <div class="dummy">Pull to create new transaction.</div>
      </div>
    </transition>
  </div>

</template>

<script>
export default {
  name: 'wallet',
  props: [
    'wallet' 
  ],
  data () {
    return {
      tools: false
    }
  },
  methods: {
    hover(target){
      this.tools = target; 
    }
  }
}
</script>


<style scoped>
  .tools{
    display: flex;
    justify-content: center;
    align-content: center;
    width: 100%;
    position: absolute;
    transition: all .25s;
    transition-delay: .02s;
    left: 0;
    right: 0;
    /* bottom: 2em; */
  }

  #wallet:hover {
    transform: scale(1.04);
    transition-duration: .5s;
    /* padding-bottom: 3em; */
  }

  #wallet{
    cursor: pointer;
    transition-duration: .25s;
  }

  .toolbar-enter {
    opacity: 0;
  }

  .toolbar-enter-to {
    /* transform: scale(.8); */
    opacity: 100%;
  }

  .toolbar-leave {
    opacity: 100%;
  }
  .toolbar-leave-to {
    opacity: 0;
  }
</style>

<style>
  .saving, .debt ,.other {
    overflow: hidden;
  }
  #wallet, .wallet {
    margin: auto;
    margin-bottom: 2em;
    padding: 2em;
    max-width: 450px;
    border-radius: 2em;
    transition: all 5s;
    /* transition-delay: 5s; */
  }
  #topcard, .topcard {
    margin: auto;
    margin-bottom: 2em;
    margin-top: -1.25em;
    padding: 1em;
    max-width: 600px;
    border-radius: 2em;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    transition: all .5s;
    /* transition-delay: 5s; */
  }

  .saving {
    background-image: linear-gradient(15deg, #29abe2, #b6e8f4);
    color: white;
    box-shadow: 0 1em 2em rgba(8, 44, 85, 0.137), 0 .25em 1em rgba(24, 129, 155, 0.26);
  }

  .debt {
    background-image: linear-gradient(15deg, #ff8f93, #ffbf7e);
    color: white;
    box-shadow: 0 1em 2em rgba(85, 13, 8, 0.137), 0 .25em 1em rgba(155, 109, 24, 0.26);
  }

  .other {
    background-image: linear-gradient(15deg,  #7a62d8, #de64cb);
    color: white;
    box-shadow: 0 1em 2em rgba(85, 8, 55, 0.137), 0 .25em 1em rgba(155, 24, 63, 0.26);
  }

</style>