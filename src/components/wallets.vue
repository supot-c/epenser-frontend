<template>
  <main_ class="contain" id="ttt">
    <transition name='topbar'>
      <div>
        <b-container v-if="!focus">
          <b-row align-h="between" class="pr-3 pl-3 pt-0">
            <b-col cols='0' class="mb-4" style="color: rgb(90,90,90);">
              <h3>Your Wallets</h3>
            </b-col>
            <b-col cols='0'>
              <b-button @click="$router.push({name:'createwallet'})">+</b-button>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </transition>

    <center v-if="!help">
      <b-card class="shadow mb-4 bg-dark text-light" style="max-width:512px;">
        <div class="gg">
          <div>
            <div>
              <b><i>←</i></b>
              Swipe left on receipe or wallet to delete.
            </div>
            <div>
              <i>→</i>
              Swipe right on receipe or wallet to edit.
            </div>
            <small>
              <i class="text-warning">Gesture control currently available on mobile devices only.</i>
            </small>
          </div>
          <b-button @click="dismiss" class="ml-auto w-100 dm" style="align-self:center;">dismiss</b-button>
        </div>
      </b-card>
    </center>

    <transition-group :name="walletanimationname" mode="out-in">
      <span
        v-for="wallet in wallets"
        :key="wallet.id"
        class='list-complete-item'
      >
        <!-- wallet covers -->
        <div
          v-if="!focus"
          v-touch="{
            left: () => confirm(wallet),
            right: () => setupform(wallet)
          }"
        >
          <wallet :wallet='wallet' style="z-index:10;" @edit='setupform(wallet)' @delete='confirm(wallet)' @pickk="select(wallet)"></wallet>
        </div>

        <div v-else>
          <wtopcard @refresh='refresh' :wallet='focus' style="z-index:10;"></wtopcard>
          <!-- <wallet :wallet='focus' style="z-index:10;"></wallet> -->
        </div>
      </span>
    </transition-group>
    <p v-if="wallets != null && wallets.length == 0" class="text-center mt-5 pt-5" style="color:grey;">
      <img
      style="width:7em;margin-bottom:1em;" 
      src="data:image/svg+xml;base64,
PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIC0xMiA1MTIuMDAwMzIgNTEyIiB3aWR0aD0iNTEyIiBjbGFzcz0iIj48Zz48cGF0aCBkPSJtNDU1LjA3NDIxOSAxNzIuNjEzMjgxIDUzLjk5NjA5My01My45OTYwOTNjMi4yMjY1NjMtMi4yMjI2NTcgMy4yNzM0MzgtNS4zNjcxODggMi44MjgxMjYtOC40ODA0NjktLjQ0MTQwNy0zLjExMzI4MS0yLjMyODEyNi01LjgzOTg0NC01LjA4NTkzOC03LjM1NTQ2OWwtNjQuOTE0MDYyLTM1LjY0NDUzMWMtNC44Mzk4NDQtMi42NTYyNS0xMC45MTc5NjktLjg4NjcxOS0xMy41NzgxMjYgMy45NTMxMjUtMi42NTYyNSA0Ljg0Mzc1LS44OTA2MjQgMTAuOTIxODc1IDMuOTUzMTI2IDEzLjU3ODEyNWw1My4yMzQzNzQgMjkuMjMwNDY5LTQ2LjMzOTg0MyA0Ni4zMzU5MzctMTY2LjY2Nzk2OS05MS41MTk1MzEgNDYuMzM1OTM4LTQ2LjMzNTkzOCA0Ni44Mzk4NDMgMjUuNzIyNjU2YzQuODM5ODQ0IDIuNjU2MjUgMTAuOTIxODc1Ljg5MDYyNiAxMy41NzgxMjUtMy45NTMxMjQgMi42NjAxNTYtNC44Mzk4NDQuODkwNjI1LTEwLjkyMTg3Ni0zLjk1MzEyNS0xMy41NzgxMjZsLTUzLjQxNzk2OS0yOS4zMzU5MzdjLTMuODk4NDM3LTIuMTQwNjI1LTguNzQyMTg3LTEuNDQ5MjE5LTExLjg4MjgxMiAxLjY5NTMxM2wtNTQgNTQtNTQtNTRjLTMuMTQ0NTMxLTMuMTQ0NTMyLTcuOTg4MjgxLTMuODMyMDMyLTExLjg4MjgxMi0xLjY5NTMxM2wtMTg0LjkyOTY4OCAxMDEuNTQ2ODc1Yy0yLjc1NzgxMiAxLjUxNTYyNS00LjY0NDUzMSA0LjIzODI4MS01LjA4NTkzOCA3LjM1NTQ2OS0uNDQ1MzEyIDMuMTEzMjgxLjYwMTU2MyA2LjI1NzgxMiAyLjgyODEyNiA4LjQ4MDQ2OWw1My45OTYwOTMgNTMuOTk2MDkzLTUzLjk5NjA5MyA1My45OTIxODhjLTIuMjI2NTYzIDIuMjI2NTYyLTMuMjczNDM4IDUuMzY3MTg3LTIuODI4MTI2IDguNDg0Mzc1LjQ0MTQwNyAzLjExMzI4MSAyLjMyODEyNiA1LjgzOTg0NCA1LjA4NTkzOCA3LjM1MTU2Mmw1NS44ODI4MTIgMzAuNjg3NXYxMDIuNTcwMzEzYzAgMy42NTIzNDMgMS45ODgyODIgNy4wMTE3MTkgNS4xODc1IDguNzY5NTMxbDE4NC45Mjk2ODggMTAxLjU0Mjk2OWMxLjUuODI0MjE5IDMuMTU2MjUgMS4yMzQzNzUgNC44MTI1IDEuMjM0Mzc1czMuMzEyNS0uNDEwMTU2IDQuODEyNS0xLjIzNDM3NWwxODQuOTI5Njg4LTEwMS41NDI5NjljMy4xOTkyMTgtMS43NTc4MTIgNS4xODc1LTUuMTE3MTg4IDUuMTg3NS04Ljc2OTUzMXYtMTAyLjU3MDMxM2w1NS44ODI4MTItMzAuNjgzNTk0YzIuNzU3ODEyLTEuNTE1NjI0IDQuNjQ0NTMxLTQuMjQyMTg3IDUuMDg1OTM4LTcuMzU1NDY4LjQ0NTMxMi0zLjExMzI4Mi0uNjAxNTYzLTYuMjU3ODEzLTIuODI4MTI2LTguNDgwNDY5em0tMTk5LjA3NDIxOSA5MC4xMzI4MTMtMTY0LjE1MjM0NC05MC4xMzY3MTkgMTY0LjE1MjM0NC05MC4xNDA2MjUgMTY0LjE1MjM0NCA5MC4xNDA2MjV6bS02Mi44MzIwMzEtMjQwLjM2NzE4OCA0Ni4zMzIwMzEgNDYuMzM1OTM4LTE2Ni42Njc5NjkgOTEuNTE5NTMxLTQ2LjMzNTkzNy00Ni4zMzU5Mzd6bS0xMjAuMzI4MTI1IDE2Mi42MDkzNzUgMTY2LjY2Nzk2OCA5MS41MTk1MzEtNDYuMzM5ODQzIDQ2LjMzOTg0NC0xNjYuNjcxODc1LTkxLjUxOTUzMXptMzU4LjA4OTg0NCAxODQuNzk2ODc1LTE2NC45Mjk2ODggOTAuNTYyNXYtMTAyLjIyMjY1NmMwLTUuNTIzNDM4LTQuNDc2NTYyLTEwLTEwLTEwcy0xMCA0LjQ3NjU2Mi0xMCAxMHYxMDIuMjIyNjU2bC0xNjQuOTI5Njg4LTkwLjU2MjV2LTg1LjY3MTg3NWwxMDkuMDQ2ODc2IDU5Ljg3ODkwN2MxLjUxMTcxOC44MjgxMjQgMy4xNjc5NjggMS4yMzQzNzQgNC44MDg1OTMgMS4yMzQzNzQgMi41ODk4NDQgMCA1LjE1MjM0NC0xLjAwNzgxMiA3LjA3NDIxOS0yLjkyOTY4N2w1NC01NCA1NCA1NGMxLjkyMTg3NSAxLjkyNTc4MSA0LjQ4NDM3NSAyLjkyOTY4NyA3LjA3NDIxOSAyLjkyOTY4NyAxLjY0MDYyNSAwIDMuMjk2ODc1LS40MDYyNSA0LjgwODU5My0xLjIzNDM3NGwxMDkuMDQ2ODc2LTU5Ljg3ODkwN3ptLTExMi4wOTM3NS00Ni45Mzc1LTQ2LjMzOTg0NC00Ni4zNDM3NSAxNjYuNjY3OTY4LTkxLjUxNTYyNSA0Ni4zNDM3NSA0Ni4zMzU5Mzh6bTAgMCIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojODA4MDgwIiBkYXRhLW9sZF9jb2xvcj0iIzAwMDAwMCI+PC9wYXRoPjxwYXRoIGQ9Im00MDQuODAwNzgxIDY4LjE3NTc4MWMyLjYyODkwNyAwIDUuMTk5MjE5LTEuMDcwMzEyIDcuMDcwMzEzLTIuOTMzNTkzIDEuODU5Mzc1LTEuODU5Mzc2IDIuOTI5Njg3LTQuNDM3NSAyLjkyOTY4Ny03LjA2NjQwNyAwLTIuNjMyODEyLTEuMDcwMzEyLTUuMjEwOTM3LTIuOTI5Njg3LTcuMDcwMzEyLTEuODU5Mzc1LTEuODYzMjgxLTQuNDQxNDA2LTIuOTI5Njg4LTcuMDcwMzEzLTIuOTI5Njg4LTIuNjQwNjI1IDAtNS4yMTA5MzcgMS4wNjY0MDctNy4wNzAzMTIgMi45Mjk2ODgtMS44NzEwOTQgMS44NTkzNzUtMi45Mjk2ODggNC40Mzc1LTIuOTI5Njg4IDcuMDcwMzEyIDAgMi42Mjg5MDcgMS4wNTg1OTQgNS4yMDcwMzEgMi45Mjk2ODggNy4wNjY0MDcgMS44NTkzNzUgMS44NjMyODEgNC40NDE0MDYgMi45MzM1OTMgNy4wNzAzMTIgMi45MzM1OTN6bTAgMCIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojODA4MDgwIiBkYXRhLW9sZF9jb2xvcj0iIzAwMDAwMCI+PC9wYXRoPjxwYXRoIGQ9Im0yNTYgMzE0LjkyNTc4MWMtMi42Mjg5MDYgMC01LjIxMDkzOCAxLjA2NjQwNy03LjA3MDMxMiAyLjkyOTY4OC0xLjg1OTM3NiAxLjg2NzE4Ny0yLjkyOTY4OCA0LjQzNzUtMi45Mjk2ODggNy4wNzAzMTIgMCAyLjYzNjcxOSAxLjA3MDMxMiA1LjIwNzAzMSAyLjkyOTY4OCA3LjA3ODEyNSAxLjg1OTM3NCAxLjg1OTM3NSA0LjQ0MTQwNiAyLjkyMTg3NSA3LjA3MDMxMiAyLjkyMTg3NXM1LjIxMDkzOC0xLjA2MjUgNy4wNzAzMTItMi45MjE4NzVjMS44NTkzNzYtMS44NzEwOTQgMi45Mjk2ODgtNC40NDE0MDYgMi45Mjk2ODgtNy4wNzgxMjUgMC0yLjYzMjgxMi0xLjA3MDMxMi01LjIwMzEyNS0yLjkyOTY4OC03LjA3MDMxMi0xLjg1OTM3NC0xLjg2MzI4MS00LjQ0MTQwNi0yLjkyOTY4OC03LjA3MDMxMi0yLjkyOTY4OHptMCAwIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIHN0eWxlPSJmaWxsOiM4MDgwODAiIGRhdGEtb2xkX2NvbG9yPSIjMDAwMDAwIj48L3BhdGg+PC9nPiA8L3N2Zz4=" />

      <br>
      <b>
        <b> <i>epenser</i> </b> journey awaits
      </b>
      <br>
      create new wallet now.<br>
    </p>

    <div v-if="this.wform != null">
    <b-modal centered id="editwallet" title="Update wallet details" hide-footer hide-header >

      <h3 class="mb-2">Update wallet detail</h3>
      <b-card class="card p-3">
        <b-form>
          <b-form-group
            label="Wallet name:"
            label-for="name"
          >
            <b-form-input
              id="name"
              v-model="wform.name"
              required
              autofill = 'false'
              placeholder="Enter wallet name"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Description:"
            label-for="description"
          >
            <b-form-input
              id="description"
              v-model="wform.description"
              required
              placeholder="Wallet detail"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Wallet type:"
            label-for="type"
          >
            <b-form-radio-group
            v-model="wform.type"
            :options="options"
            name="radio-inline"
          ></b-form-radio-group>
          </b-form-group>
          <div class="d-flex justify-content-center mt-5">
            <b-button variant="normal" class="mr-1" @click="$bvModal.hide('editwallet')">cancle</b-button>
            <b-button variant="primary" @click="update">Update</b-button>
          </div>
       </b-form>
      </b-card>

    </b-modal>
    <b-modal centered size="sm" id="confirm" title="Are you sure?" hide-header hide-footer>
      <h4>Are you sure?</h4>
      <b-row align-v="center" class='mr-2 mt-1' style="float:right;">
        <b-button @click="$bvModal.hide('confirm')" variant='none' style="">cancle</b-button>
        <b-button @click="$bvModal.hide('confirm'),del(dfocus)" variant="danger" style="width:5em; margin-right:.5em;">Delete</b-button>
      </b-row>
    </b-modal>
    </div>
  </main_>
</template>

<script>
import main_ from '@/components/main_'
import wallet from '@/components/wallet'
import wtopcard from '@/components/wtopcard'
import createwallet from '@/components/createwallet'
import updatewallet from '@/components/updatewallet'
import WalletService from '@/services/WalletService'
import TransactionsService from '../services/TransactionsService';
import transactionVue from './transaction.vue';
import { constants } from 'crypto';

export default {
  name: 'wallets',
  components: {
    main_,
    wallet,
    createwallet,
    wtopcard
  },
  // directives: {  },
  data () {
    return {
      wallets: null,
      dfocus: null,
      wallets_tmp: null,
      focus: null,
      transactions: null,
      ct: false,
      walletanimationname: "list-complete",
      Ts: [],
      help: false,
      wform: {
        name: '',
        type: '',
        description: '',
      },
      options: [
        { text: 'Saving', value: 'saving' },
        { text: 'Debt', value: 'debt' },
        { text: 'other', value: 'other' }
      ],
    }
  },
  created: async function () {
    if (localStorage.getItem('help-dimissed') != null){
      this.help = true
    }
    if (this.$store.state.user) {
      this.wallets = await WalletService.get({ user: this.$store.state.user })
      this.wallets = this.wallets.data.data
      for (const w of this.wallets)
        w.mode = 'wallet'
    } else {
      this.$router.push({ name: 'root' })
    }
  },
  methods: {
    confirm(wallet){
      this.dfocus = wallet
      this.$bvModal.show('confirm')
    },
    del (wallet) {
      this.wallets.splice(this.wallets.indexOf(wallet), 1)
    },
    select (wallet) {
      wallet.mode = 'topcard'
      this.walletanimationname = 'wallet2'
      window.scrollTo(0, 0)
      this.focus = wallet
      this.wallets_tmp = [...this.wallets]
      this.wallets = [wallet]
    },
    setupform(wallet){
      this.$bvModal.show('editwallet')
      this.wform = {
        id: wallet.id,
        type: wallet.type,
        description: wallet.description,
        name: wallet.name
      }
    },
    async update(){
      try{
        this.$bvModal.hide('editwallet')
        await WalletService.update(this.wform)
        .then(res => {
          this.wallets = []
          this.refresh()
        })
      } catch(err){
        console.log(err.message);

      }
    },
    async refresh(){
      if (this.$store.state.user) {
        this.wallets = await WalletService.get({ user: this.$store.state.user })
        this.wallets = this.wallets.data.data
        for (const w of this.wallets)
          w.mode = 'wallet'
      } else {
        this.$router.push({ name: 'root' })
      }
    },
    dismiss(){
      localStorage.setItem('help-dimissed', 'yes')
      this.help = true
    }
  }
}
</script>
<style>
  @media (max-width: 500px){
    .gg{
      text-align: left;
      display: flex;
      flex-direction: column;
    }
    .dm {
      margin-top: 1em;
    }
  }
@media (min-width: 500px){
  .gg{
      text-align: left;
      display: flex;
      flex-direction: row;
    }
    .dm{
      flex-basis: 1em;
    }
  }



  /* wallets animation configuretions */
  .list-complete-item {
    transition: all .75s;
    display: block;
  }
  .list-complete-enter {
    opacity: 0;
    transform: scale(.78) translateY(5em);
  }
  .list-complete-leave-to {
    opacity: 0;
  }
  .list-complete-leave-active {
    position: absolute;
    transform: scale(.5);
    right: 0;
    left: 0;
  }

  /* wallets animation configuretions (enter detail view) */
  .wallet2-enter {
    opacity: 0;
    transform: scale(.78) translateY(5em);
  }
  .wallet2-leave-to {
    opacity: 0;
  }
  .wallet2-leave-active {
    position: fixed;
    bottom: -20em;
    right: 0;
    left: 0;
  }

  /* transaction animation configuretions */
  .transactions-enter, .transactions-leave-to {
    opacity: 0;
    transform: scale(0.5);
  }
  .transactions-leave-active {
    position: absolute;
    right: 0;
    left: 0;
  }

  /*topbar animation configuretions*/
  .topbar-enter-active, .topbar-leave-active {
    transition: all 2s;
  }
  .topbar-enter, .topbar-leave-to {
    position: fixed;
    opacity: 0;
    transform: scale(0.2);
  }

  .addbtn {
    position: fixed;
    bottom: 1em;
    right: 1em;
    background-color: aliceblue;
    border-radius: 50%;
    height: 3em;
    width: 3em;
    z-index: 999;
  }
</style>
