<template>
  <div class="stars">
      <hmheader title="我的收藏">
          <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
      </hmheader>
        <van-swipe-cell v-for="item in startsList" :key="item.id">
      <hmarticleBlock :post="item" @click="$router.push({path:`/articleDetail/${item.id}`})"></hmarticleBlock>
        <template>
            <van-button square type="danger" text="删除" />
        </template>
        </van-swipe-cell>
  </div>
</template>

<script>
import hmheader from "@/components/hmheader.vue"
import hmarticleBlock from "@/components/hmarticleBlock.vue"
import {getUserStars} from "@/apis/user.js"
export default {
       components :{
           hmheader,hmarticleBlock
       },
       data(){
            return {
                starsList:[]
            };
       },
       async mounted () {
           let res = await  getUserStars();
           this.starsList = res.data.data
       }
};
</script>

<style>

</style>