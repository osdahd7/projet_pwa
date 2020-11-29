<template>
<div>
    <v-list-item
            v-for="(titre, i) in title"
            :key="i"
    >
        <v-list-item-icon>
            <v-icon v-text="titre"  @click="play_musique(i)"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
            <v-list-item-title @click="play_musique(i)" v-text="titre.titre"></v-list-item-title>
        </v-list-item-content>
        <v-list-item-content>


<Icon_list :title="titre.fav" :index="i" @favoriss="favoriss"></Icon_list>



        </v-list-item-content>
        <v-list-item-content>
            <v-icon   @click="play_after(i)">

                mdi-content-save
            </v-icon>
        </v-list-item-content>
    </v-list-item>
    </div>

</template>
<script>
    import Icon_list from "./Icon_list";
    export default {
        props: {
            title: Array,

        },
        components: {
            Icon_list
        },
        methods:{
            favoriss(val){
             console.log(val);
                this.$emit("favoris", val);
            },
            play_after(val){
                console.log(val);
                this.$emit("play_after", val);
            }
        },
        computed:{
            fav(val)
            {
                return this.title[val].fav;
            }
        }
    }
</script>
