<template>
    <div>
        <v-container>
            <v-row>
    <v-card

            class="mx-auto my-12"
            max-width="374"
    >


      <Image_Player :src="musique_image"></Image_Player>


        <v-card-text>

            <v-row
                    align="right"
                    class="mx-1"
            >


                <v-col

                >
                    <v-btn
                            class="mx-2"
                            fab
                            dark
                            small
                            color="pink" @click="play"
                    >
                        <v-icon dark>
                           {{icon_played}}
                        </v-icon>
                    </v-btn>
                    <v-btn
                            class="mx-2"
                            fab
                            dark
                            small
                            color="pink" @click="mute_player"
                    >
                        <v-icon dark>
                            {{icon_mute}}
                        </v-icon>
                    </v-btn>
                </v-col>
                <v-col

                >
                    <v-container>
                    <Titre :title="musique_description"></Titre>
                        <Auteur :title="musique_auteur"></Auteur>
                    </v-container>

                </v-col>
                <v-col>
                    <knob-control v-model="val"></knob-control>
                    <v-container>
                        <v-row>
                            <template>
                                <v-col>
                                    <v-card>
                                        <v-btn
                                                class="mx-2"
                                                fab
                                                dark
                                                small
                                                color="pink" @click="suivant"
                                        >
                                             <v-icon dark>
                                                mdi-arrow-right-bold-circle-outline
                                            </v-icon>
                                        </v-btn>
                                    </v-card>
                                </v-col>


                            </template>
                            <template>
                                <v-col>
                                    <v-card>
                                        <v-btn
                                                class="mx-2"
                                                fab
                                                dark
                                                small
                                                color="pink" @click="precedent"
                                        >
                                            <v-icon dark>
                                                mdi-arrow-left-bold-circle-outline
                                            </v-icon>
                                        </v-btn>
                                    </v-card>
                                </v-col>

                            </template>
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>





        </v-card-text>


    </v-card>


            </v-row>
        </v-container>
        <v-card

                class="mx-auto my-12"
                max-width="374"
        >
            <v-list dense>
                <v-subheader>Liste de lecture</v-subheader>
                <v-list-item-group

                        color="primary"
                >
                    <input
                            v-model="search"
                            type="search"
                            required
                            placeholder="recherche"
                    />
                    <Liste_musique    @favoris="favoris"  @play_after="play_after" :title="filterArtiste"></Liste_musique>
                    <!--   <v-list-item
                                v-for="(titre, i) in this.musique"
                                :key="i"
                        >
                            <v-list-item-icon>
                                <v-icon v-text="titre"  @click="play_musique(i)"></v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title @click="play_musique(i)" v-text="titre.titre"></v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-content>
                                <v-icon @click="favoris(i)">

                                  {{  titre.fav }}
                                </v-icon>


                            </v-list-item-content>
                        </v-list-item>-->
                    </v-list-item-group>
                </v-list>
            </v-card>
            <div data-app>
                <div class="text-center">
                    <v-dialog
                            v-model="dialog"
                            width="500"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                    color="red lighten-2"
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                            >
                               Mes Favoris
                            </v-btn>
                        </template>

                        <v-card>
                            <v-card-title class="headline grey lighten-2">
                               Mes Favoris
                            </v-card-title>

                            <v-list-item
                                    v-for="(titre, i) in this.musique_fav"
                                    :key="i"
                            >

                                <v-list-item-content>
                                    <v-list-item-title @click="play_musique(i)" v-text="titre.titre"></v-list-item-title>
                                </v-list-item-content>

                                <v-list-item-content>

                                </v-list-item-content>
                            </v-list-item>

                            <v-divider></v-divider>


                        </v-card>
                    </v-dialog>
                </div>
            </div>
        </div>
    </template>
    <script>
        import Image_Player from "./Image_player.vue";
       import Titre from "./Titre.vue";
       import Liste_musique from "./Liste_musique";
       import Auteur from "./Auteur";
        import KnobControl from 'vue-knob-control';

    export default {
        data: function () {
            return {
                musique: [],
                musique_liste: [],
                musique_fav:[],
               cmpt: 0,
                search: "",
                musique_url:"",
                musique_auteur:"",
                musique_image:"https://assets-global.website-files.com/5deef90e2b03a42deaf1f5f9/5dfbc118b074186ea74e058b_Music-Playlist_Octiive-Blog-Post-Feat-Image.jpg",
                musique_description:"",
                audioElement:null,
                icon_mute:'mdi-volume-off',
                icon_played:'mdi-play-circle',
                val:50



            };
        },
        props:{

        },
        components: {
            Image_Player,Titre,Liste_musique,KnobControl,Auteur
        },
        methods: {
            play() {
                if(this.audioElement != null)
                {
                    if (this.audioElement.duration > 0 && !this.audioElement.paused) {
                        this.icon_played = 'mdi-play-circle';
                        this.audioElement.pause();
                    }
                    else
                    {
                        this.icon_played=' mdi-pause-circle';
                        if(this.audioElement.paused)
                        {
                            this.audioElement.play();
                        }
                        else
                        {
                            //   var audioElement = new Audio("/assets/"+this.musique[0].url);
                            this.musique_description = this.musique[this.cmpt].titre;
                            this.musique_image = this.musique[this.cmpt].image;
                            this.musique_auteur=this.musique[this.cmpt].auteur;
                            this.audioElement = new Audio(require("../assets/"+this.musique[this.cmpt].url));
                            this.audioElement.play();
                        }

                    }
                }
                else
                {
                    this.musique_description = this.musique[this.cmpt].titre;
                    this.musique_image = this.musique[this.cmpt].image;
                    this.musique_auteur=this.musique[this.cmpt].auteur;
                    this.audioElement = new Audio(require("../assets/"+this.musique[this.cmpt].url));
                    this.audioElement.play();
                    this.icon_played=' mdi-pause-circle';
                }


            },
            suivant()
            {
                if(this.cmpt>this.musique.length-2)
                {
                    console.log(this.musique.length);
                    console.log(this.cmpt);
                    this.cmpt=0;
                }
                else
                {
                    this.cmpt++;
                }
                this.audioElement.pause();
                this.audioElement = null;
                this.musique_description = this.musique[this.cmpt].titre;
                this.musique_auteur=this.musique[this.cmpt].auteur;
                this.musique_image = this.musique[this.cmpt].image;
                this.audioElement = new Audio(require("../assets/"+this.musique[this.cmpt].url));
                this.audioElement.play();
            },
            precedent()
            {
                if(this.cmpt==0)
                {
                    this.cmpt= this.musique.length-1;
                }
                else
                {
                    this.cmpt--;
                }
                this.audioElement.pause();
                this.audioElement = null;
                this.musique_description = this.musique[this.cmpt].titre;
                this.musique_image = this.musique[this.cmpt].image;
                this.musique_auteur=this.musique[this.cmpt].auteur;
                this.audioElement = new Audio(require("../assets/"+this.musique[this.cmpt].url));
                this.audioElement.play();
            },
            play_musique(val)
            {

                this.musique_description = this.musique[val].titre;
                this.musique_image = this.musique[val].image;
                this.musique_auteur=this.musique[this.cmpt].auteur;
                this.audioElement = new Audio(require("../assets/"+this.musique[val].url));
                this.audioElement.play();
            },
            mute_player()
            {
                if(this.audioElement.muted)
                {
                    this.icon_mute='mdi-volume-high';
                    this.audioElement.muted = false;
                }
                else
                {
                    this.icon_mute='mdi-volume-off';
                    this.audioElement.muted = true;
                }


            },
            getIndexOfArray(array, findArray){
                let index = -1;
                array.some((item, i)=>{
                    if(JSON.stringify(item) === JSON.stringify(findArray)) {
                        index = i;
                        return true;
                    }
                });
                return index;
            },
            favoris(val)
            {


                if(this.getIndexOfArray(this.musique_fav,this.musique[val]) == -1)
                {
                    this.musique_fav.push(this.musique[val]);
                }
                else{
                    this.musique_fav.splice(this.getIndexOfArray(this.musique_fav,this.musique[val]), 1);

                }

           if(this.musique[val].fav === "mdi-star-outline")
                {

                    this.musique[val].fav =  "mdi-star";
                    console.log(this.musique[val]);
                }
                else
                {

                    this.musique[val].fav = "mdi-star";
                    console.log(this.musique[val]);
                }



            },
            play_after(val)
            {

                this.musique_liste.push(val);
                console.log(this.musique_liste);
            },
            set_volume(val)
            {
                this.audioElement.volume=val;
            }

        },
        computed: {
            muted(){
                return this.audioElement.muted();
            },
            fav(val)
            {
                return this.musique[0].titre;
            },
            etat_play()
            {
                if(this.audioElement != null)
                {
                    return this.audioElement.ended;
                }
                else
                {
                    return null;
                }

            },
            nbr_val()
            {
                return this.val;
            },
            filterArtiste() {
                console.log(this.musique);
                if (this.search.length < 3) {
                    return this.musique;
                } else {
                    const mus = [];
                    this.musique.forEach((item, index) => {
                        console.log(item.auteur.search(this.search)) //value
if(item.auteur.search(this.search) != -1 || item.titre.search(this.search) != -1 )
{
                    mus.push(item);
}
                    })
return mus;
                   // return this.musique.filter((elt) => elt.includes(this.search));
                }
            },
        },
        watch: {
            etat_play() {
                this.audioElement.addEventListener('ended', (event) => {
                    console.log("musique finis");
                    this.play_musique(this.musique_liste[0]);

                });

            },
            nbr_val()
            {
                console.log(this.val);
                if(this.audioElement != null)
                {
                    if(this.val == 100)
                    {
                        this.audioElement.volume = 100;
                    }
                    else
                    {
                        this.audioElement.volume = parseFloat("0."+this.val);
                    }

                }
            }
        },
        created() {
            fetch("http://localhost:3000/posts/")
                .then((response) => response.json())
                .then((json) => (this.musique = json));

        },
        beforeUpdate() {


            for (const element of this.musique) {
                element.fav =     "star-outline";
            }


        }

    };
    </script>
