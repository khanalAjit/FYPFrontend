<template>
  <base-card>
    <h2>Choose the caretaker for your pet</h2>
    <span class="filter-option">
      <input type="checkbox" id="dog" checked @change="applyFilter" />
      <label for="dog">Dog</label> </span
    ><span>
      <input type="checkbox" id="cat" checked @change="applyFilter" />
      <label for="cat">Cat</label> </span
    ><span>
      <input type="checkbox" id="fish" checked @change="applyFilter" />
      <label for="fish">Fish</label>
    </span>
  </base-card>
</template>

<script>
export default {
  emits: ["change-filters"],
  data() {
    return {
      filters: {
        dog: true,
        cat: true,
        fish: true,
      },
    };
  },
  methods: {
    applyFilter(event) {
      const inputId = event.target.id;
      const isActive = event.target.checked;
      const updatedFilters = {
        ...this.filters,
        [inputId]: isActive,
      };
      this.filters = updatedFilters;
      this.$emit("change-filter", updatedFilters);
    },
  },
};
</script>

<style lang="scss" scoped>
input {
  margin: 10px;
  padding: 10px;
}
.card {
  margin: 10px;
}
</style>
