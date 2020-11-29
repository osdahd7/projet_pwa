<template>
  <div>
  <div>
    <input type="checkbox" id="scales" name="scales"
           checked>
    <p @click="change" :class="yellow === true ? 'yellow' : ''">
      {{ title }}
    </p>

  </div>

  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },

  data: function () {
    return {
      yellow: false,
    };
  },

  methods: {
    change() {
      this.yellow = !this.yellow;
      this.$emit("increase", 5);
    },
    delete() {

      this.$emit("deleteEvent", this.index);
    },
  },
};
</script>

<style scoped>
.yellow{
    color: yellowgreen;
}
</style>
