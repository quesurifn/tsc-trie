class TrieNode {
    parent: TrieNode;
    char: string;
    children: TrieChildren;
    isEndOfWord: boolean;

    constructor(char: string) {
        this.char = char;
        this.children = {};
        this.isEndOfWord = false;
    }

    // AddChild to add char
    addChild(char: string) {
        this.children[char] = new TrieNode(char);
    }

    addParent(parent: TrieNode) {
        this.parent = parent;
    }

    // GetChild Char
    getChild(char: string) {
        return this.children[char];
    }

    // hasChild
    hasChild(char: string) {
        return this.children[char] !== undefined;
    }

    // Is End Of Sequence
    setIsEndOfWord() {
        this.isEndOfWord = true;
    }

    getWord() {
        let word:string = '';
        let current:TrieNode = this;
        while (current.parent) {
            // ascend the tree appending each character to word
            word = current.char + word;
            // make current the current's parent to go up the tree
            current = current.parent;
        }
        return word;
    }
}


interface TrieChildren {
    a?: TrieNode;
    b?: TrieNode;
    c?: TrieNode;
    d?: TrieNode;
    e?: TrieNode;
    f?: TrieNode;
    g?: TrieNode;
    h?: TrieNode;
    i?: TrieNode;
    j?: TrieNode;
    k?: TrieNode;
    l?: TrieNode;
    m?: TrieNode;
    n?: TrieNode;
    o?: TrieNode;
    p?: TrieNode;
    q?: TrieNode;
    r?: TrieNode;
    s?: TrieNode;
    t?: TrieNode;
    u?: TrieNode;
    v?: TrieNode;
    w?: TrieNode;
    x?: TrieNode;
    y?: TrieNode;
    z?: TrieNode;
}

export default TrieNode;