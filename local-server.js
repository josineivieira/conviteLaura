const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const zlib = require("node:zlib");

const root = __dirname;
const port = Number(process.env.PORT) || 8080;
const host = process.env.HOST || "0.0.0.0";
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".mp3": "audio/mpeg"
};

http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const cleanPath = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  let filePath = path.normalize(path.join(root, cleanPath));

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      const hasExtension = path.extname(filePath) !== "";
      if (hasExtension && cleanPath.startsWith("/assets/")) {
        response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        response.end("Not found");
        return;
      }

      filePath = path.join(root, "index.html");
      data = fs.readFileSync(filePath);
    }

    const ext = path.extname(filePath).toLowerCase();
    const isAsset = cleanPath.startsWith("/assets/");
    const headers = {
      "Content-Type": types[ext] || "application/octet-stream",
      "Cache-Control": isAsset ? "public, max-age=31536000, immutable" : "public, max-age=300"
    };

    const acceptsGzip = request.headers["accept-encoding"]?.includes("gzip");
    const canCompress = [".html", ".css", ".js", ".json", ".svg"].includes(ext);

    if (acceptsGzip && canCompress) {
      headers["Content-Encoding"] = "gzip";
      response.writeHead(200, headers);
      response.end(zlib.gzipSync(data));
      return;
    }

    response.writeHead(200, headers);
    response.end(data);
  });
}).listen(port, host, () => {
  console.log(`Convite da Laura: http://${host}:${port}/`);
});
