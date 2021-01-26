<template>
  <div class="transaction-list">

    <b-row style="">
      <b-col cols="2" class="mr-1">
        <div class="icon">
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNTEyIiB2aWV3Qm94PSItNjUgMCA1MTEgNTEyIiB3aWR0aD0iNTEyIj48Zz48cGF0aCBkPSJtMzgwLjc3MzQzOCA0NTYuMjY1NjI1LTE0LjQ1NzAzMi0zNjEuNTMxMjVjLS4zMjQyMTgtOC4wNDY4NzUtNi45Mzc1LTE0LjQwMjM0NC0xNC45ODgyODEtMTQuNDAyMzQ0aC04NS40MTc5Njl2LTUuMDgyMDMxYzAtNDEuNDkyMTg4LTMzLjc1NzgxMi03NS4yNS03NS4yNS03NS4yNS00MS40OTIxODcgMC03NS4yNSAzMy43NTc4MTItNzUuMjUgNzUuMjV2NS4wODIwMzFoLTg1LjQxNzk2OGMtOC4wNTA3ODIgMC0xNC42NjQwNjMgNi4zNTU0NjktMTQuOTg0Mzc2IDE0LjQwMjM0NGwtMTQuNDYwOTM3IDM2MS41MzEyNWMtLjU5Mzc1IDE0Ljc5Mjk2OSA0LjY3NTc4MSAyOC43NjE3MTkgMTQuODM1OTM3IDM5LjMzNTkzNyAxMC4xNTYyNSAxMC41NzQyMTkgMjMuOTA2MjUgMTYuMzk4NDM4IDM4LjcxMDkzOCAxNi4zOTg0MzhoMjczLjEzMjgxMmMxNC44MDQ2ODggMCAyOC41NTQ2ODgtNS44MjQyMTkgMzguNzE0ODQ0LTE2LjM5ODQzOCAxMC4xNjAxNTYtMTAuNTc0MjE4IDE1LjQyNTc4Mi0yNC41NDI5NjggMTQuODMyMDMyLTM5LjMzNTkzN3ptLTIzNS4zNjMyODItMzgxLjAxNTYyNWMwLTI0Ljk0OTIxOSAyMC4zMDA3ODItNDUuMjUgNDUuMjUtNDUuMjUgMjQuOTUzMTI1IDAgNDUuMjUgMjAuMzAwNzgxIDQ1LjI1IDQ1LjI1djUuMDgyMDMxaC05MC41em0xMjAuNSAxNjAuNjY0MDYyYzAgNDEuNDk2MDk0LTMzLjc1NzgxMiA3NS4yNS03NS4yNSA3NS4yNS00MS40OTIxODcgMC03NS4yNS0zMy43NTM5MDYtNzUuMjUtNzUuMjV2LTYwLjI1YzAtOC4yODEyNSA2LjcxODc1LTE1IDE1LTE1IDguMjg1MTU2IDAgMTUgNi43MTg3NSAxNSAxNXY2MC4yNWMwIDI0Ljk1MzEyNiAyMC4zMDA3ODIgNDUuMjUgNDUuMjUgNDUuMjUgMjQuOTQ5MjE5IDAgNDUuMjUtMjAuMjk2ODc0IDQ1LjI1LTQ1LjI1di02MC4yNWMwLTguMjgxMjUgNi43MTg3NS0xNSAxNS0xNSA4LjI4NTE1NiAwIDE1IDYuNzE4NzUgMTUgMTV6bTAgMCIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBkYXRhLW9sZF9jb2xvcj0iIzAwMDAwMCIgc3R5bGU9ImZpbGw6IzA4Mjg4MCI+PC9wYXRoPjwvZz4gPC9zdmc+" />
        </div>
      </b-col>
      <b-col cols="5" style="padding:0;">
        <h5 style="margin:0;" class="mb-1">{{ transaction.description }}</h5>
        <h6 style="margin:0;" class="small"><p>{{ transaction.transdate }}</p></h6>
      </b-col>
      <b-col style="padding:0;" class="text-right mr-3 justify-content-center align-self-center">
        <h4 :class="this.amount_style+this.transaction.type" style="margin-top:auto;margin-bottom:auto;">
          ฿{{ transaction.amount }}
        </h4>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  nmae: 'transaction',
  props: [
    'transaction'
  ],
  data () {
    return {
      amount_style: 'justify-content-center align-self-center '
    }
  },
}
</script>

<style scoped>
  .transaction-list {
    padding: 10px;
    color: #030003;
    background-color: rgb(255, 255, 255);
    min-height: 5em;
    max-width: 400px;
    border-radius: 1.5em;
    margin: auto;
    margin-top: -0.7em;
    margin-bottom: 1em;
    box-shadow: inset 0px 20px 30px rgba(0, 0, 0, 0.089);
  }
  .transaction-receipt {
    padding: 10px;
    color: #082880;
    background-color: white;
    min-height: 5em;
    max-width: 410px;
    border-radius: 1.05em;
    margin: auto;
    margin-bottom: 1.5em;
    box-shadow: 0 14px 0px -10px rgba(255, 255, 255, 0.616);
  }

  .icon {
    display:inline-block;
    width:50px;
    height:50px;
  }
  .icon img{
    width: 35px;
  }

  .income {
    color: #6AC57D;
  }
  .epnse,.expense {
    color: #DE7979;
  }
</style>