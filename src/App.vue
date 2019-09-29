<template>
  <div>
    <h2>Rectangle Creator</h2>
    <p>
      Count:
      <input id="count" value="5" />
    </p>
    <button id="create">Create</button>
    <button id="cancel">Cancel</button>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    document.getElementById("create").onclick = () => {
      const textbox = document.getElementById("count");
      const count = parseInt(textbox.value, 10);
      parent.postMessage(
        { pluginMessage: { type: "create-rectangles", count } },
        "*"
      );
    };

    document.getElementById("cancel").onclick = () => {
      parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>