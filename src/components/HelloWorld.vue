<template>
  <div>
    <main_>
      <div v-if="this.$store.state.isLogin">
        <div class="d-flex justify-content-center">
          <div class="spinner-border text-light" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
      <div v-else class="main">
        <div class="img">
          <img class="" src="../assets/landing.png" alt="">
        </div>

        <div class="txt">
          <h1>
            Keep track of your epenses on the go.
          </h1>
          <h4>Manage your budget fun and easy</h4>
          <b-button variant="outline-light" @click="$router.push({ name: 'register' })"> Start now for free</b-button>
        </div>

      </div>
    </main_>
  </div>
</template>

<script>
import main_ from './main_'
import wallet from '@/components/wallet'

export default {
  name: 'HelloWorld',
  components: {
    main_,
    wallet
  },
  data () {
    return {
      msg: 'landing page baby',
      wallet: {
        type: 'saving',
        name: 'PS5',
        description: 'saving wallet for the new play station 5.',
        amount: 2222,
        mode: 'wallet'
      },
    }
  },
  methods: {
  },
  mounted: function () {
    if (this.$store.state.isLogin) {
      this.$router.push({ name: 'wallets' })
    }
  }
}
</script>

<style scoped>
  @media (min-width: 800px) {
    .main {
    height: 70vh;

    }
    .img{
      order: 2;
    }
  }

  @media (max-width: 800px) {
    .main {
      flex-wrap: wrap;
      height: 50vh;
    }
    .img{
      max-width: 400px;
      order: 0;
      flex-shrink: 0;
    }
  }

  .main {
    color: white;
    flex-direction: row;
    text-transform: uppercase;
    justify-content:center;
    align-content: stretch;
    display: flex;
  }
  img{
    width: 100%;
  }
  .img {
    flex-basis: auto;
    flex-shrink: 2;
    align-self: center;
    flex-grow: 1;
  }

  .txt {
    order:1;
    flex-basis: 350px;
    flex-shrink: 1;
    flex-grow: 2;
    align-self: center;
  }
</style>
