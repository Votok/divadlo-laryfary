// .eleventy.js
const fs = require("node:fs");
const path = require("node:path");

module.exports = function (eleventyConfig) {
  // Enable Eleventy Bundle for CSS with minification (via csso)
  eleventyConfig.addBundle("css", {
    transforms: [
      function (content) {
        try {
          const csso = require("csso");
          return csso.minify(content).css;
        } catch (e) {
          // If csso is not installed, fall back to original content
          return content;
        }
      },
    ],
  });
  // Add a simple cache-busting filter based on build time
  eleventyConfig.addFilter("cacheBust", function () {
    return Date.now();
  });

  // Set your input directory (where your source files are)
  eleventyConfig.addWatchTarget("./src/css/"); // Watch CSS for changes
  eleventyConfig.addPassthroughCopy("./src/css"); // Copy CSS directly
  eleventyConfig.addPassthroughCopy("./src/images"); // Copy images directly
  // Root static assets (favicons, etc.)
  eleventyConfig.addPassthroughCopy({ "src/favicon.svg": "favicon.svg" });
  // If other favicon files (png, ico) exist in src root, copy them
  ["favicon.ico", "apple-touch-icon.png"].forEach((f) => {
    const full = path.join(__dirname, "src", f);
    if (fs.existsSync(full)) {
      eleventyConfig.addPassthroughCopy({ ["src/" + f]: f });
    }
  });

  // Helper to read a file's contents (used to feed CSS into the bundle)
  eleventyConfig.addFilter("readFile", function (filePath) {
    const full = path.resolve(__dirname, filePath);
    return fs.readFileSync(full, "utf8");
  });

  // Convert a root-relative URL (e.g. "/file.css") to relative ("file.css")
  eleventyConfig.addFilter("toRelativeFromRoot", function (url) {
    if (!url || typeof url !== "string") return url;
    return url.startsWith("/") ? url.slice(1) : url;
  });

  // Transform: make stylesheet hrefs relative in final HTML output
  eleventyConfig.addTransform("relative-stylesheet-href", function (content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      return content.replace(
        /(<link[^>]*rel=["']stylesheet["'][^>]*href=["'])\/(.*?)(["'][^>]*>)/gi,
        (m, p1, p2, p3) => {
          return `${p1}${p2}${p3}`;
        }
      );
    }
    return content;
  });

  return {
    pathPrefix: "",
    dir: {
      input: "src", // All your source files will be in the 'src' directory
      output: "_site", // Eleventy will build your site here
      includes: "_includes", // Where your layouts and components live (relative to input)
      data: "_data", // Where your global data files live (relative to input)
    },
    // Set Nunjucks as the default template engine for .html files
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: false, // If you truly want no Markdown processing
  };
};
