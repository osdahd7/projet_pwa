<template>
  <div>
    <header>
      <slot name="header">
        <h1>Liste des prénoms</h1>
      </slot>
    </header>

    <ul>
      <li v-for="(prenom, index) in filterPrenoms" :key="index">
        <Item @increase="increase" :title="prenom" /> <button @click="deleteEvent(index)">Supprimer</button>
      </li>
    </ul>
    <p>Nb de click: {{ nbClick }}</p>
  </div>
</template>

<script>
import Item from "./Item";
export default {
  name: "Liste",
  props: {
    filterPrenoms: Array,
  },
  data: function () {
    return {
      nbClick: 0,
    };
  },
  methods: {
    increase(val) {
      this.nbClick += val;
    },
    deleteEvent: function(index) {
      this.filterPrenoms.splice(index, 1);
    }
  },
  components: {
    Item,
  },
};
</script>
