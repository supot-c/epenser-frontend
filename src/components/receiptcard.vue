<template>
  <div>
    <div :class="dtype" id="container">
     <div @mouseenter="hover(true)" @mouseleave="hover(false)">
      <b-row style="" :class="recpad"  @click="expand">
        <b-col cols="2" class="mr-1">
            <img :src='store' class="icon"/>
        </b-col>
        <b-col cols="5" style="padding:0;">
          <div v-if="receipt.description=='' || receipt.description == null">
            <h5 style="margin:0;" class="mb-1" v-if="tbackup.length == 1">{{ tbackup[0].description }}</h5>
            <h5 style="margin:0;" class="mb-1" v-else>{{ storename }}</h5>
            <h6 style="margin:0;" class="small" v-if="tbackup.length == 1"><p>{{ storename }} on {{ receipt.transdate }}</p></h6>
            <h6 style="margin:0;" class="small" v-else><p>{{ receipt.transdate }}</p></h6>
          </div>
          <div v-else>
            <h5 style="margin:0;" class="mb-1">{{ receipt.description }}</h5>
            <h6 style="margin:0;" class="small"><p>{{ storename }} on {{ receipt.transdate }}</p></h6>
          </div>
        </b-col>
        <b-col style="padding:0;" class="text-right mr-3 justify-content-center align-self-center">
          <h4 :class="this.amount_style+type" style="margin-top:auto;margin-bottom:auto;">
            ฿{{ sum }}
          </h4>
        </b-col>
      </b-row>
      <div class="toolbar" v-if="!isMobile && ishover">
        <b-button variant="link" class="text-secondary" @click="$emit('edit')">edit</b-button>
        <b-button variant="link" class="text-secondary" @click="$emit('delete')">delete</b-button>

      </div>
     </div>

    </div>
      <!-- <div v-if="isfold && unfold" class='tsran'> -->
    <transition-group name="animation">
      <div v-for="T in transactions" class='tran' :key="T.id">
        <transaction :transaction='T'></transaction>
      </div>
    </transition-group>
    <transition >
      <div v-show="isfold && unfold" class="pb-3"></div>
    </transition>
  </div>
</template>

<script>
import TransactionsService from '../services/TransactionsService'
import ReceiptService from '../services/ReceiptService'
import transaction from '../components/transaction'

import { isMobile } from 'mobile-device-detect';

export default {
  nmae: 'receiptcard',
  components: {
    transaction,
  },
  props: [
    'receipt',
    'stores'
  ],
  data () {
    return {
      isMobile: isMobile,
      amount_style: 'justify-content-center align-self-center ',
      store:'',
      storename:'',
      dtype:'receipt-list',
      isfold: false,
      unfold: false,
      transactions:[],
      type:'neutral',
      tbackup:[],
      ishover: false,
      recpad: '',
    }
  },
  methods:{
    expand(){
      if(!this.isfold)return
      this.unfold = ! this.unfold
      if(this.dtype == 'receipt-list'){
        this.dtype = 'receipt-list2'
        this.transactions = []
      }
      else{
        this.dtype = 'receipt-list'
        this.transactions = this.tbackup
      }
    },
    hover(target){
      this.ishover = target
      this.recpad = target? 'rec pad': 'rec'
    }
  },
  beforeMount: function () {
    for(const store of this.stores){
      if(store.id === this.receipt.storeId){
        this.store = store.pic
        this.storename = store.name
      }
    }
  },
  mounted: async function(){
      await TransactionsService.get({"receipt":this.receipt}).then(trans =>{
        if(trans.data.transactions.length > 1){
          this.dtype = 'receipt-list2'
          this.isfold = true
        }
        this.tbackup = trans.data.transactions
      })
  },
  computed: {
    sum(){
      var total = 0
      for(const T of this.tbackup){
        if(T.type == 'epnse' || T.type == 'expense'){
          total -= T.amount
        }
        else{
          total += T.amount
        }
      }
      if(total > 0){
        this.type = 'income'
      }else if (total === 0){
        this.type = 'neutral'
      }else{
        this.type = 'expense'
        total = total*=-1
      }
      this.receipt.amount = total
      this.receipt.type = this.type
      return total
    }
  },
}
</script>

<style scoped>
  .tran {
    margin: auto;
    transition: all .3s;
    display: block;
  }
  .animation-enter {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  .animation-leave-to {
    opacity: 0;
  }
  .animation-leave-active {
    position: absolute;
    left: 3em;
    right: 3em;
  }
  .animation-leave-to {
    transform: translateY(-3em) translateX(0%);
  }
  .receipt-list {
    padding: 10px;
    color: #082880;
    background-color: white;
    min-height: 5em;
    max-width: 450px;
    border-radius: 1.2em;
    margin: auto;
    margin-bottom: 1em;
    box-shadow: 0px 17px 0px -7px rgba(255, 255, 255, 0);
    transition: all 1.2s;
  }
  .receipt-list2 {
    padding: 10px;
    color: #082880;
    background-color: white;
    min-height: 5em;
    max-width: 450px;
    border-radius: 1.2em;
    margin: auto;
    margin-bottom: 1.2em;
    transition: all .7s;
    cursor: pointer;
    box-shadow: 0px 17px 0px -10px rgba(255, 255, 255, 0.445) , 0px 20px 1.5px -17px rgb(255, 255, 255, 0.233);
  }

  .transaction-receipt {
    padding: 10px;
    color: #082880;
    background-color: white;
    min-height: 5em;
    max-width: 450px;
    border-radius: 1.2em;
    margin: auto;
    margin-bottom: 1.5em;
    box-shadow: 0 14px 0px -10px rgba(255, 255, 255, 0.616);
  }

  .icon {
    background-color:#f0f0f0;
    display:inline-block;
    border-radius:20%;
    width:40px;
    height:40px;
    overflow: hidden;
  }
  .icon img{
    width: 35px;
  }

  .income {
    color: #6AC57D;
  }
  .epnse, .expense {
    color: #DE7979;
  }


  .rec {
    transition: all .24s;
    overflow: hidden;
  }

  .toolbar{
    max-width: 400px;
    margin-left: 3.2em;
    margin-bottom: -0.7em;
    margin-right: 0;
    margin-top: -1.2em;
    display: flex;
  }

  .pad {
    padding-bottom: .3em;
  }

</style>