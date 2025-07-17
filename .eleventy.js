// .eleventy.js
module.exports = function (eleventyConfig) {
  // Set your input directory (where your source files are)
  eleventyConfig.addWatchTarget("./src/css/"); // Watch CSS for changes
  eleventyConfig.addPassthroughCopy("./src/css"); // Copy CSS directly
  eleventyConfig.addPassthroughCopy("./src/images"); // Copy images directly

  return {
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
