window.newSet = require('./sets.js');
window.newList = require('./list.js');
window.newCache = require('./cache.js');

window.cache = newCache();
window.cache.insert('t1', 'foo');
window.cache.insert('t2', 'bar');
window.cache.insert('t3', 'baz');