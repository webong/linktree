// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser enviroment (see documentation).

// This shows the HTML page in "ui.html".
// figma.showUI(__html__);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
// figma.ui.onmessage = msg => {
//   // One way of distinguishing between different types of messages sent from
//   // your HTML page is to use an object with a "type" property like this.
//   if (msg.type === 'create-rectangles') {
//     const nodes: SceneNode[] = [];
//     for (let i = 0; i < msg.count; i++) {
//       const rect = figma.createRectangle();
//       rect.x = i * 150;
//       rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
//       figma.currentPage.appendChild(rect);
//       nodes.push(rect);
//     }
//     figma.currentPage.selection = nodes;
//     figma.viewport.scrollAndZoomIntoView(nodes);
//   }

//   // Make sure to close the plugin when you're done. Otherwise the plugin will
//   // keep running, which shows the cancel button at the bottom of the screen.
//   figma.closePlugin();
// };

async function invertImages(node) {
  if (node.fills.length === 0) {
    figma.closePlugin("Selection is not an image asset");
  }
  for (const paint of node.fills) {
    if (paint.type !== 'IMAGE') {
      figma.closePlugin("Selection is not an image asset");
    } else {
      // Get the (encoded) bytes for this image.
      const image = figma.getImageByHash(paint.imageHash)
      const bytes = await image.getBytesAsync()

      // Create an invisible iframe to act as a "worker" which
      // will do the task of decoding and send us a message
      // when it's done. This shows the HTML page in "ui.html".
      figma.showUI(__html__, {
        width: 600,
        height: 300
      })

      // Send the raw bytes of the file to the worker.
      figma.ui.postMessage(bytes)
    }
  }
}

const selected = figma.currentPage.selection[0] as GeometryMixin
console.log(selected)
if (selected === undefined || selected.fills === undefined) {
  figma.closePlugin("Selection is not an image asset");
}
invertImages(selected)

figma.ui.onmessage = msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === 'cancel') {
    // This closes the plugin when the cancel button is clicked.
    figma.closePlugin();
  }
};