import Trie from './Trie';

const trie = new Trie();

trie.insert('hello');
trie.insert('amazon');
trie.insert('apple');
trie.insert('app');
trie.insert('tyler');
trie.insert('taylor');
trie.insert('tacos');
trie.insert('john');
trie.insert('jane');
trie.insert('jim');
trie.insert('joe');
trie.insert('jake');
trie.insert('jill');
trie.insert('jason');
trie.insert('jess');
trie.insert('jessica');
trie.insert('jimmy');
trie.insert('jimbo');
trie.insert('kyle');
trie.insert('johnny');
trie.insert('jodi');
trie.insert('kevin');
trie.insert('kyle');
trie.insert('linkedin');

trie.remove('linkedin');

console.log(trie.startsWith('j'));
console.log(trie.startsWith('ap'));
console.log(trie.search('linkedin'));