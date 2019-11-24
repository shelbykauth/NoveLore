<template>
  <div>
    <h1>Your Current Project: {{ project.name }}</h1>
  </div>
</template>

<script>
export default {
  name: "listSeries",
  data: function() {
    return {
      project: {
        name: "My Project"
      }
    };
  }
};
</script>
