import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const host = "127.0.0.1";
const port = 4173;
const basePath = "/portfolio";
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = path.join(projectRoot, "out");

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".mp3": "audio/mpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};

function sendText(response, statusCode, message) {
  response.writeHead(statusCode, { "Content-Type": "text/plain; charset=utf-8" });
  response.end(message);
}

function resolveRequestPath(requestUrl) {
  const url = new URL(requestUrl, `http://${host}:${port}`);
  const decodedPathname = decodeURIComponent(url.pathname);

  if (decodedPathname === basePath) return { redirect: `${basePath}/` };
  if (!decodedPathname.startsWith(`${basePath}/`)) return null;

  let relativePath = decodedPathname.slice(basePath.length);
  if (relativePath.endsWith("/")) relativePath += "index.html";
  if (relativePath === "") relativePath = "/index.html";

  const filePath = path.resolve(outputRoot, `.${relativePath}`);
  if (!filePath.startsWith(`${outputRoot}${path.sep}`)) return null;

  return { filePath };
}

const server = http.createServer(async (request, response) => {
  let resolved;

  try {
    resolved = resolveRequestPath(request.url || "/");
  } catch {
    sendText(response, 400, "Bad request");
    return;
  }

  if (!resolved) {
    sendText(response, 404, "Not found");
    return;
  }

  if (resolved.redirect) {
    response.writeHead(308, { Location: resolved.redirect });
    response.end();
    return;
  }

  try {
    const fileStats = await stat(resolved.filePath);
    if (!fileStats.isFile()) throw new Error("Not a file");

    const extension = path.extname(resolved.filePath).toLowerCase();
    response.writeHead(200, {
      "Content-Type": contentTypes[extension] || "application/octet-stream",
      "Content-Length": fileStats.size,
      "Cache-Control": "no-store",
    });
    createReadStream(resolved.filePath).pipe(response);
  } catch {
    sendText(response, 404, "Not found");
  }
});

server.listen(port, host, () => {
  console.log(`Static export server: http://${host}:${port}${basePath}/`);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
