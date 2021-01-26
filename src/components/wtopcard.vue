<template>
  <div class="container">
    <span>
      <v-touch @swipedown="createrecord">
        <div :class="type">
          <h5>{{ wallet.name }}</h5>
          <p style="max-width:450px;overflow:hidden;z-index: 0;">{{ wallet.description }}</p>
          <h1 class="amount"><strong>฿ {{ wallet.amount }}</strong></h1>

            <img 
            class="icon"
            style="color:red;color: rgb(150,150,150);
            float:right;
            width: 7em;
            height: 7em;
            margin-top:-7em;
            padding: 1.5em;"

            @click="$router.push({ name: 'dashboard' })"
            
            src="data:image/svg+xml;base64,
PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNDg2Ljc0MiA0ODYuNzQyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0ODYuNzQyIDQ4Ni43NDI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgY2xhc3M9IiI+PGc+PGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMzMsMzYyLjM3MXY3OC45YzAsNC44LDMuOSw4LjgsOC44LDguOGg2MWM0LjgsMCw4LjgtMy45LDguOC04Ljh2LTEzOC44bC00NC4zLDQ0LjMgICAgQzU3LjksMzU2LjA3MSw0NS45LDM2MS40NzEsMzMsMzYyLjM3MXoiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSJhY3RpdmUtcGF0aCIgc3R5bGU9ImZpbGw6I0ZGRkZGRiIgZGF0YS1vbGRfY29sb3I9IiMwMDAwMDAiPjwvcGF0aD4KCQk8cGF0aCBkPSJNMTQyLDMwMS40NzF2MTM5LjhjMCw0LjgsMy45LDguOCw4LjgsOC44aDYxYzQuOCwwLDguOC0zLjksOC44LTguOHYtODIuM2MtMTMuOS0wLjMtMjYuOS01LjgtMzYuNy0xNS42TDE0MiwzMDEuNDcxeiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojRkZGRkZGIiBkYXRhLW9sZF9jb2xvcj0iIzAwMDAwMCI+PC9wYXRoPgoJCTxwYXRoIGQ9Ik0yNTEsMzUwLjI3MXY5MWMwLDQuOCwzLjksOC44LDguOCw4LjhoNjFjNC44LDAsOC44LTMuOSw4LjgtOC44di0xNjcuOWwtNjkuOSw2OS45ICAgIEMyNTcsMzQ1Ljk3MSwyNTQuMSwzNDguMjcxLDI1MSwzNTAuMjcxeiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojRkZGRkZGIiBkYXRhLW9sZF9jb2xvcj0iIzAwMDAwMCI+PC9wYXRoPgoJCTxwYXRoIGQ9Ik00MzIuNywxNzAuMTcxbC03Mi43LDcyLjd2MTk4LjRjMCw0LjgsMy45LDguOCw4LjgsOC44aDYxYzQuOCwwLDguOC0zLjksOC44LTguOHYtMjY1LjZjLTItMS43LTMuNS0zLjItNC42LTQuMiAgICBMNDMyLjcsMTcwLjE3MXoiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSJhY3RpdmUtcGF0aCIgc3R5bGU9ImZpbGw6I0ZGRkZGRiIgZGF0YS1vbGRfY29sb3I9IiMwMDAwMDAiPjwvcGF0aD4KCQk8cGF0aCBkPSJNNDgyLjYsNDEuMzcxYy0yLjktMy4xLTcuMy00LjctMTIuOS00LjdjLTAuNSwwLTEuMSwwLTEuNiwwYy0yOC40LDEuMy01Ni43LDIuNy04NS4xLDRjLTMuOCwwLjItOSwwLjQtMTMuMSw0LjUgICAgYy0xLjMsMS4zLTIuMywyLjgtMy4xLDQuNmMtNC4yLDkuMSwxLjcsMTUsNC41LDE3LjhsNy4xLDcuMmM0LjksNSw5LjksMTAsMTQuOSwxNC45bC0xNzEuNiwxNzEuN2wtNzcuMS03Ny4xICAgIGMtNC42LTQuNi0xMC44LTcuMi0xNy40LTcuMmMtNi42LDAtMTIuNywyLjYtMTcuMyw3LjJMNy4yLDI4Ni44NzFjLTkuNiw5LjYtOS42LDI1LjEsMCwzNC43bDQuNiw0LjZjNC42LDQuNiwxMC44LDcuMiwxNy40LDcuMiAgICBzMTIuNy0yLjYsMTcuMy03LjJsODAuNy04MC43bDc3LjEsNzcuMWM0LjYsNC42LDEwLjgsNy4yLDE3LjQsNy4yYzYuNiwwLDEyLjctMi42LDE3LjQtNy4ybDE5My42LTE5My42bDIxLjksMjEuOCAgICBjMi42LDIuNiw2LjIsNi4yLDExLjcsNi4yYzIuMywwLDQuNi0wLjYsNy0xLjljMS42LTAuOSwzLTEuOSw0LjItMy4xYzQuMy00LjMsNS4xLTkuOCw1LjMtMTQuMWMwLjgtMTguNCwxLjctMzYuOCwyLjYtNTUuMyAgICBsMS4zLTI3LjdDNDg3LDQ5LjA3MSw0ODUuNyw0NC41NzEsNDgyLjYsNDEuMzcxeiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojRkZGRkZGIiBkYXRhLW9sZF9jb2xvcj0iIzAwMDAwMCI+PC9wYXRoPgoJPC9nPgo8L2c+PC9nPiA8L3N2Zz4=" />
        </div>
        <transition name='dummy-card'>
          <div v-if="isanimated && !creatingrecord" class="dummy shake"><div style="text-align:center;">Pull to create new receipt.</div></div>
        </transition>
      </v-touch>

      <transition name="form-a">
        <div v-if="creatingrecord" class="form-a-item">
          <receipt v-if="!editting" @dis='creatingrecord = false' @create='create2' @addedstore='refreshstore'></receipt>
          <editreceipt :form='form' v-else @dis='creatingrecord = false' @replace='del' @create='create2'></editreceipt>
        </div>
      </transition>
    </span>
    <br>
    <transition name='transactions-ani'>
      <div v-if="true" class="tran">
        <transition-group name="transactions-ani">
          <div v-for="T in receipts" class="tran" :key='T.id'>
            <div
              v-touch="{
                left: () => confirm(T),
                right: () => editrecord(T),
              }"
            >
              <receiptcard :receipt='T' :stores='stores' @edit='editrecord(T)' @delete="confirm(T)"></receiptcard>
            </div>
          </div>
        </transition-group>
        <div v-if="!receipts.length" style="color:grey;text-align:center;" class="mt-5">
          <p>This wallet is empty.</p>
        </div>
      </div>
    </transition>>

    <b-modal centered size="sm" id="confirm" title="Are you sure?" hide-header hide-footer>
      <h4>Are you sure?</h4>
      <b-row align-v="center" class='mr-2 mt-1' style="float:right;">
        <b-button @click="$bvModal.hide('confirm')" variant='none' style="">cancle</b-button>
        <b-button @click="$bvModal.hide('confirm'),del(dfocus)" variant="danger" style="width:5em; margin-right:.5em;">Delete</b-button>
      </b-row>
    </b-modal>

  </div>
</template>

<script>
import TransactionService from '../services/TransactionsService'
import TransactionsService from '../services/TransactionsService'
import ReceiptService from '../services/ReceiptService'
import transaction from '../components/transaction'
import receipt from '../components/receipt'
import editreceipt from '../components/editreceipt'
import StoreService from '../services/StoreService'
import receiptcard from '../components/receiptcard'
import Touch from 'vue-touch'
import { async } from 'q'

export default {
  name: 'wtopcard',
  // directives: {
  //   Touch
  // },
  components: {
    transaction,
    receipt,
    receiptcard,
    editreceipt,
  },
  props: [
    'wallet'
  ],
  data() {
    return {
      type: 'wallet',
      dfocus: null,
      waltype: '',
      isanimated: false,
      creatingrecord: false,
      transactions: [],
      receipts: [],
      stores:[],
      editting:false,
      form: {
        items: [
          {
            no: 0,
            description: '',
            amount: ''
          }
        ],
        type: '',
        transdate: '',
        description:'',
      }
    }
  },
  mounted: function () {
    this.waltype = this.wallet.type
    this.type = this.waltype + ' wallet'
    setTimeout(() => {
      this.type = this.waltype + ' topcard'
    }, 1000);
    setTimeout(() => {
      this.isanimated = true
    }, 1200);
  },
  beforeMount: function () {
    for(const store of this.stores){
      if(store.id === this.receipt.storeId){
        this.store = store.pic
      }
    }
  },
  methods: {
    refreshstore(stores){
      this.stores = stores
    },
    confirm(receipt){
      
      this.dfocus = receipt
      this.$bvModal.show('confirm')
    },
    createrecord () {
      if (!this.creatingrecord) {
        this.editting = false
        this.creatingrecord = true
      }
    },
    async editrecord (receipt) {
      if (!this.creatingrecord) {

        await TransactionsService.get({"receipt":receipt}).then(trans =>{
          this.form.items = []
          this.form.stores = this.stores
          this.form.receipt = receipt
          
          for(const t of trans.data.transactions){
            this.form.items.push({
              no: this.form.items.length,
              description: t.description,
              amount: t.amount
            })
          }
          this.form.transdate = receipt.transdate
          this.form.description = receipt.description
          for (const s of this.stores){
            if(s.id === receipt.storeId){
              this.form.store = s
            }
          }
        }).then(()=>{
          this.editting = true
          this.creatingrecord = true
        })
      }
    },

    async create2 (form) {
      window.scrollTo(0, 0)
      this.creatingrecord = false
      await ReceiptService.create({
        wallet: this.wallet,
        receipt: {
          description: form.items.length == 1? form.items[0].name : form.description,
          transdate: form.transdate,
          storeId: form.storeId,
        }
      }).then(res => {
        for(const i of form.items){
          TransactionService.create({
            receipt: res.data.receipt,
            tran: {
              description: i.description,
              amount: Math.abs(i.amount),
              type: form.isIn? i.amount>0? 'income': 'expense' : i.amount>0? 'expense': 'income'
            }
          })
          .then(() => {
            this.wallet.amount += (i.amount * (form.isIn? i.amount>0? 1: -1 : i.amount>0? -1: 1))
          })
        }
        this.getTrans()
      });
    },
    async del (receipt) {
      await ReceiptService.delete(receipt)
        .then(() =>{
          this.wallet.amount -= (receipt.amount * (receipt.type === 'income' ? 1 : -1))
          this.getTrans()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async getTrans () {
      await ReceiptService.get({ wallet: this.wallet })
      .then((R) => {
        this.receipts = R.data.receipts
      })

      // await TransactionService.get({ wallet: this.wallet })
      // .then((transactions) => {
      //   this.transactions = transactions.data.targettransactions
      //   this.transactions = this.transactions.reverse()
      // })
      // .catch(err => {
      //   console.log(err)
      // })
    },
    dis () {
      console.log('cancle')
      this.creatingrecord = false
    },
  },
  beforeMount: async function () {
    await StoreService.get().then(stores =>{
      this.stores = stores.data
    }).then(()=>{
      this.getTrans()
    })
  }
}
</script>

<style>
  .dummy {
    margin: auto;
    margin-top: -2em;
    max-width: 250px;
    max-height: 1.5em;
    background-color: whitesmoke;
    padding: .25em;
    box-shadow: inset 0 .25em 1em #3433385b;
    border-bottom-left-radius: .45em;
    border-bottom-right-radius: .45em;
    transition-delay: 3s;
    overflow: hidden;
    transition: all 1s;
    z-index: -10;
  }
  .dummy div {
    left: auto;
    right:auto;
    margin-top: -15px;
    padding: 10px;
  }

  .dummy-card-enter {
    opacity: 0;
    transform: translateY(-.5em);
  }
  .dummy-card-leave-to {
    opacity: 0;
    color: white;
    transform: translateY(.8em) scale(1.2,2);
  }

  .tran {
    transition: all .75s;
    display: block;
  }
  .transactions-ani-enter {
    opacity: 0;
    transform: scale(.78);
  }
  .transactions-ani-leave-to {
    opacity: 0;
  }
  .transactions-ani-leave-active {
    position: absolute;
    width: 80%;
  }
  .transactions-ani-leave-to {
    transform: translateX(-10em);
  }

  /* form */
  .form-a-item {
    transition: all .75s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  .form-a-enter, .form-a-leave-to{
    opacity: 0;
    transform: translateY(-15em) scaleY(.99);
  }
  .form-a-leave-active {
    position: fixed;
    left: 0;
    right: 0;
    z-index: 0;
  }

  .shake {
    animation-timing-function: ease-in-out;
    animation: shake 5s;
    animation-iteration-count: infinite;
    animation-delay: 2s;
  }


  @keyframes shake{
    0% {padding-top:.15%;}
    5% {padding-top:0%;}
    10% {
      padding-top:.25%;
      transform: translateY(.1em) scale(1.01,1.15);
    }
    30% {padding-top:0%;transform: scale(1,1);}
    100% {padding-top:0%;}
  }

</style>