<template>
  <main_ align="center">
    <div style="" class="">
      <b-card align="center" title="Most frequent shop" style="max-width:30em;">
      <apexchart width='350px' type=pie  :options="chartOptions" :series="series"></apexchart>
      </b-card>
    </div>
  </main_>
</template>

<script>
import main_ from '@/components/main_'
export default {
  name:'dashboard',
  props:[],
  components:{
  },
  data: function() {
    return {
      series: [44, 55, 13],
      chartOptions: {
        labels: ['ร้านยาย', '7-11', 'Tesco'],
        colors: ['#8bdafc', '#d280f0', '#ff75ca'],
      }
    }
  },
  components: {
    main_
  },
  methods: {

  }
}
</script>

<style lang="stylus" scoped>

</style>