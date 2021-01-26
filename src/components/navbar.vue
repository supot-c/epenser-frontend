<template>
  <div class="e-nav p-2 flexbox">
    <main_ class="p-0">
      <div>
        <b-container fluid class="text-dark text-center">
          <b-row align-h="between">
            <b-col cols='0' class=""><h2 class='clickable' @click="$router.push({ name: 'root' })">epenser</h2></b-col>
            <b-col cols='0' class="ml-md-auto mt-1" v-if="!this.$store.state.isLogin">
              <b-link class="mr-3" @click="$router.push({ name: 'register' })">Register</b-link>
              <b-button variant='primary' @click="$router.push({ name: 'login' })">Login</b-button>
            </b-col>

            <b-col md='0' class="ml-md-auto mt-1" v-if="this.$store.state.isLogin">
              <b-dropdown id="dropdown-right" right :text="this.$store.state.user.name+''" variant="" class="">
                <h6 class="dropdown-header">{{ username }}</h6>

               <!-- <b-dropdown-item href="#" >Settings</b-dropdown-item> -->
               <!-- <b-dropdown-item href="#" @click="$router.push({name: 'settings'})">Settings</b-dropdown-item> -->
               <b-dropdown-item href="#"><div style="color:red;" @click="logout">Log out</div></b-dropdown-item>
             </b-dropdown>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </main_>
  </div>
</template>

<script>
import main_ from '@/components/main_'

export default {
  name: 'navbar',
  components: {
    main_
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$router.push({ name: 'root' })
    }
  },
  data () {
    return {
      username: '',
      name: '',
      email: ''
    }
  }
}
</script>

<style scoped>
  .e-nav{
    background-color: rgb(255, 255, 255);
    box-shadow: 0 10px 10px rgba(143, 45, 255, 0.027);
    width: 100%;
    top: 0;
  }
</style>
