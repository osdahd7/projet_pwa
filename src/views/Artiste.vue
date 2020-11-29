<template>
    <div>
         <button @click="get_comments"></button>

    </div>
</template>
<script>
    export default {
        methods:{
            get_comments(){
                this.$router.push({name:'comments',params: { prenom: this.$route.params.prenom}})
            }
        }
    }
</script>
