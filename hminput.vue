<template>
  <input type="text" class="hminput" :class="{'success':statu,'error':!statu}" @input='handleInput' @blur='handleBlur'>
</template>

<script>
export default {
    // rules:验证规则
    // msg:如果输入不合法时的提示信息
    props:['rules','msg'],
    data () {
        return {
            // 标记用户的输入是否合法
            statu:true
        }
    },
    methods:{
        // 当用户输入数据的时候，监听用户的输入，并且使用正则表达式进行用户输入数据的验证，如果成功，则添加成功的对应的样式，否则也添加错误的样式
        handleInput(event){
            let value = event.target.value
            // 正则的匹配方法
            // test侧重的是匹配
            if(this.rules && this.rules.test(value)){
                this.statu = true
            }else{
                this.statu = false
            }
            // 告诉父组件输入框的内容变化了
            this.$emit('input',value)
        },
        // 当失去焦点时，再次验证用户的输入是否合法，如果不合法则给出明确的提示
        handleBlur(){
            let value = event.target.value
            if(this.rules && !this.rules.test(value)){
                // console.log(this.msg || '输入不正确')
                this.$toast.fail({
                    message:this.msg || '输入不正确',
                    duration:5000
                })

            }
        }
    }
}
</script>

<style lang='less' scoped>
    .hminput{
        width:318/360*100vw;
        height: 60px;
        outline:none;
        border:none;
        border-bottom: 3px solid #ccc;
        font-size: 20px;
        line-height: 60px;
    }
    .success{
        border-bottom-color:green;
    }
    .error{
        border-bottom-color:red;
    }
</style>