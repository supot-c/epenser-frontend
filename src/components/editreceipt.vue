<template>
  <div class="receipt">
    <!-- store part -->
    <div class="block">
      <div v-show='checked' style="float:right;margin-top:-2em;margin-right:3em;color:lightgrey;"><i>INCOME RECEIPT</i></div>
      <div v-show='!checked' style="float:right;margin-top:-2em;margin-right:3em;color:lightgrey;"><i>EXPENSE RECEIPT</i></div>
      <b-form-checkbox v-model="checked" name="check-button" switch button-variant="danger" style="float:right;margin-top:-2em;"></b-form-checkbox>
      <div
        style="border-bottom: 2px dashed rgb(200,200,200);margin-bottom:20px;padding-bottom:1em;"
      >
        <b-row style="padding-top:1em;" v-b-modal.modal-1>
          <b-col cols="1">
            <img v-if="store" :src="store.pic" class="icon">
          </b-col>
          <b-col class="ml-2">
            <h6 v-if="store">{{store.name}}</h6>
            <h6 v-if='store' class="small">{{store.description}}</h6>
          </b-col>
        </b-row>
        <b-modal centered id="modal-1" title="Select store" hide-footer>
          <div v-show="storecreating" @click="storecreating = !storecreating" style="background-color:rgb(240,240,240);border-radius:.5em;padding:.3em;color:darkgrey;"> + Add new store</div>
          
          <b-form v-show="!storecreating" class="" @submit.prevent="" style="border:2px solid lightgrey; border-radius:.65em;padding:.25em;padding-bottom:2em;">
            <h5 class="ml-2" style="color:grey;">New store.</h5>
            <b-input placeholder="Name" v-model="sform.name" style="border:none;background-color:rgba(0,0,0,0);margin:0em 0em 0em 5em;width:70%;"></b-input>
            <b-input placeholder="Description" v-model="sform.description" style="border:none;background-color:rgba(0,0,0,0);margin:0em 0em 0em 5em;width:70%;"></b-input>
            <img :src="iconsrc(sform.name)" style="width:50px;border-radius:10px;margin-top:-7em;margin-left:1.2em;">

            <b-row align-v="center" class='mr-2 mt-1' style="float:right;">
              <b-button @click="storecreating = true" variant='none' style="">cancle</b-button>
              <b-button @click="createstore" style="width:5em; margin-right:.5em;">create</b-button>
            </b-row>
          </b-form>

          <div v-for="s in stores" :key="s.id">
            <b-row style="padding-top:1em;" @click="store = s;$bvModal.hide('modal-1');storecreating = true;">
              <b-col cols="1">
                <img :src="s.pic" class="icon">
              </b-col>
              <b-col class="ml-2">
                <h6>{{s.name}}</h6>
                <h6 class="small">{{s.description}}</h6>
              </b-col>
            </b-row>
          </div>
        </b-modal>
      </div>
    </div>
    <b-form class="" @submit.prevent="create">
      <transition-group name="items">
        <b-row v-for="item in form.items" :key="item.no" class="mb-2 item">
          <b-col cols="8">
            <b-input
              v-model="item.description"
              placeholder="Description"
              style="border:none;background-color:rgba(0,0,0,0);"
            ></b-input>
          </b-col>
          
          <b-col>
            <b-input
              placeholder="Amount"
              v-model="item.amount"
              type='number'
              style="border:none;background-color:rgba(0,0,0,0);text-align:right;"
              @keydown.enter.prevent="add"
            ></b-input>
          </b-col>
        </b-row>
      </transition-group>

      <b-row align-h="end" class="mr-2 mt-2" style="vertical-align: baseline;">
        <a class="mr-1" style="padding:10px;">total:</a>
        <div v-show="sign=='0'" class="total"><b>{{sum}}</b></div>
        <div v-show="sign=='-'" class="total expense"><b>{{sum}}</b></div>
        <div v-show="sign=='+'" class="total income"><b>{{sum}}</b></div>
      </b-row>

      <div style="border-bottom: 2px dashed rgb(200,200,200);margin-bottom:20px;padding-bottom:1em;"></div>
      <b-row aligh-h='center' class="mr-0 ml-0">
      <!-- <h6>Date</h6> -->
      <b-input required type="date" v-model="form.transdate" style="border:none;background-color:rgb(245,245,245);"></b-input>
      </b-row>
      <transition name='items'>
        <b-input v-show="this.form.items.length > 2" class='item' placeholder="Receipt description..." v-model="form.description" style="border:none;background-color:rgb(245,245,245);margin-top:.8em;"></b-input>
      </transition>

      <div style="float:right;margin-bottom:2em;" class="mt-4">
        <a @click="$emit('dis')" class="mr-3">cancle</a>
        <b-button type="submit">Save</b-button>
      </div>
      <br>
    </b-form>
  </div>
</template>

<script>
import { log } from 'util';
import StoreService from '../services/StoreService'

export default {
  name: 'editreceipt',
  props: [
    'form',
  ],
  data () {
    return {
      options: [
        { text: 'Income', value: 'income' },
        { text: 'Epense', value: 'epnse' }
      ],
      stores: {},
      store: null,
      sign: '0',
      checked:false,
      sform: {
        name:'',
        description:'',
      },
      storecreating:true,
    }
  },
  methods: {
    add () {
      const before = this.form.items[this.form.items.length-1]
      if (!before.amount || !before.description) return
      this.form.items.push({
        no: this.form.items.length,
        description: '',
        amount: ''
      })
    },
    create () {
      const valid = []
      for (const i of this.form.items){
        if (i.description && i.amount){
          valid.push(i)
        }
      }
      this.form.storeId = this.store.id
      this.form.trantype = valid.length === 1? 'transaction-list': 'transaction-receipt'
      this.form.items = valid
      this.form.isIn = this.checked
      this.$emit('replace', this.form.receipt)
      this.$emit('create', this.form)
    },
    iconsrc(name){
      return 'https://api.adorable.io/avatars/120/'+name+'.png'
    },
    async createstore(){
      await StoreService.create({
        name: this.sform.name,
        description: this.sform.description,
        type: 'grocery',
        pic: this.iconsrc(this.sform.name)
      }).then(res =>{
        this.storecreating = true;
        StoreService.get().then(out => {
          this.stores = out.data
          this.store = this.stores[0]
        })
      })
    }
  },
  computed: {
    sum: function () {
      const last = this.form.items[this.form.items.length-1]
      if(last.description && last.amount){
        this.add()
      }
      var sum = 0
      for(const i of this.form.items){
        sum += this.checked? -(Number(i.amount)):Number(i.amount)
      }
      if(sum == 0){
        this.sign = '0'
      }else if(sum > 0){
        this.sign = '-'
      }else{
        this.sign = '+'
      }
      return '฿' + Math.abs(sum)
    },
  },
  beforeMount: function() {
    this.stores = this.form.stores
    this.store = this.form.store
  },
}
</script>

<style scoped>
  .icon {
    color: rgb(202, 238, 255);
    border-radius: .3em;
    margin-top: -.5em;
    width: 1.7em;
  }

  .receipt {
    margin: auto;
    margin-bottom: 2em;
    padding: 1em;
    padding-top: 3em;
    max-width: 450px;
    background: linear-gradient(rgb(255, 255, 255), rgb(250, 250, 250));
  }

  .receipt::after {
    background: 
					linear-gradient(45deg, transparent 16px, rgb(250, 250, 250) 0), 
					linear-gradient(-45deg, transparent 16px, rgb(250, 250, 250)  0);
    background-repeat: repeat-x;
    background-size: 12px 25px;
    content: " ";
    display: block;

    height: 35px;
		width: 110.378%;

		position: relative;
    max-width: 450px;
		left:-1em;
    top: 2.7em;
  }

  .receipt::before {
    background: 
					linear-gradient(45deg, rgb(255, 255, 255) 16px, transparent 0), 
					linear-gradient(-45deg, rgb(255, 255, 255) 16px, transparent  0);
    background-repeat: repeat-x;
    background-size: 13px 25px;
    content: " ";
    display: block;

    height: 35px;
		width: 110.378%;

		position: relative;
    max-width: 450px;
		left:-1em;
    top: -3.5em;
  }

  .item {
    transition: all 2s;
  }

  .items-enter, .items-leave-to {
    opacity: 0;
  }
  .income {
    color: #6AC57D;
  }
  .epnse,.expense {
    color: #DE7979;
  }
  .total{
    font-size: 1.5em;
  }
  .income_r{
    color: #6AC57D;
  }
</style>