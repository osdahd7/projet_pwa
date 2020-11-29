<template>
    <div>
        <button @click="get_comments"></button>
        <v-btn
                elevation="2"
                @click="get_comments"
        >Test</v-btn>


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
