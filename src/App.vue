<template>
  <div>
    <h2>Link Tree</h2>
    <div>
        <img :src="image" width="200" height="250" />
    </div>
    <button @click="cancel">Cancel</button>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      image: null,
      count: 2
    };
  },
  methods: {
    create: function() {
      const count = parseInt(this.count, 10);
      console.log(count);
      parent.postMessage(
        { pluginMessage: { type: "create-rectangles", count } },
        "*"
      );
    },
    cancel: function() {
      parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
    },
    // Decoding an image can be done by sticking it in an HTML
    // canvas, as we can read individual pixels off the canvas.
    decode: async function (canvas, ctx, bytes) {
      const url = URL.createObjectURL(new Blob([bytes]))
      const image = await new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.onerror = () => reject()
        img.src = url
      })
      // canvas.width = image.width
      // canvas.height = image.height
      // ctx.drawImage(image, 0, 0)
      // const imageData = ctx.getImageData(0, 0, image.width, image.height)
      return image
    }
  },
  mounted() {
    window.onmessage = async (event) => {
      // Just get the bytes directly from the pluginMessage since
      // that's the only type of message we'll receive in this
      // plugin. In more complex plugins, you'll want to check the
      // type of the message.
      const bytes = event.data.pluginMessage

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      const image = await this.decode(canvas, ctx, bytes)
      // const pixels = imageData.data
      console.log(image)
      this.image = image.src
      // Do the actual work of inverting the colors.
      // for (let i = 0; i < pixels.length; i += 4) {
      //   pixels[i + 0] = 255 - pixels[i + 0]
      //   pixels[i + 1] = 255 - pixels[i + 1]
      //   pixels[i + 2] = 255 - pixels[i + 2]
      //   // Don't invert the alpha channel.
      // }

      // const newBytes = await encode(canvas, ctx, imageData)
      // window.parent.postMessage({pluginMessage: newBytes}, '*')
    }
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
body {
  font: 12px sans-serif;
  text-align: center;
  margin: 20px;
}
button {
  border-radius: 5px;
  background: white;
  color: black;
  border: none;
  padding: 8px 15px;
  margin: 0 5px;
  box-shadow: inset 0 0 0 1px black;
  outline: none;
}
#create {
  box-shadow: none;
  background: #18a0fb;
  color: white;
}
input {
  border: none;
  outline: none;
  padding: 8px;
}
input:hover {
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
}
button:focus {
  box-shadow: inset 0 0 0 2px #18a0fb;
}
#create:focus {
  box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.3);
}
input:focus {
  box-shadow: inset 0 0 0 2px #18a0fb;
}
</style>