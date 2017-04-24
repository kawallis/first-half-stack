const url = require('url');

function parsePath(path) {

  const parsed = url.parse(path, true);
  const parts = parsed.pathname.slice(1).split('/');
  console.log(parts);
  
  return {
    route: parts[0],
    query: parsed.query,
    params: { id: parts[1] }
  };
}

module.exports = parsePath;