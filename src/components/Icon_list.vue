<template>
    <v-icon @click="test" large color="blue darken-2">{{`mdi-${icon}`}}</v-icon>


</template>
<script>
    export default {
        data: function () {
            return {
                icon: "star-outline",




            };
        },
        props:{
            title: String,
            index: String,
        },
        methods:{
            test(){
                console.log(this.icon);
                if(this.icon =="star-outline")
                {
                    this.icon = "star";
                }
                else
                {
                    this.icon = "star-outline";
                }
                this.$emit("favoriss",this.index);
            }

        }
    }
</script>
