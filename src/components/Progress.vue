<template>
<v-progress-linear :indeterminate="true" v-if="loading"></v-progress-linear>
</template>
<script>

    export default {
        data() {
            return {

                loading:true
            }
        },
        created() {
            this.loading=false
        },
        components: {

        }
    }
</script>
