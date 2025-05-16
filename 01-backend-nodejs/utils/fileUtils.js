const fs = require("fs");

function saveBase64AudioToFile(base64Data, filepath) {
  return new Promise((resolve, reject) => {
    // base64Data dạng "UklGRuIAAABXQVZFZm10IBAAAAABAAE...==" (chỉ phần base64)
    const buffer = Buffer.from(base64Data, "base64");
    fs.writeFile(filepath, buffer, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

module.exports = { saveBase64AudioToFile };
