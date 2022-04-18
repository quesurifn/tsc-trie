import esserializer from 'esserializer';
import TrieNode from './TrieNode'

class Trie {
    root: TrieNode;

    constructor() {
        this.root = new TrieNode('*');
    }

    insert(word: string) {
        let current = this.root;

        // Loop through characters of the word
        for (let c = 0; c < word.length; c++) {
            // If the current node doesn't have a child with the current character; create that child;
            if (!current.hasChild(word[c])) {
                current.addChild(word[c]);
                current.getChild(word[c]).addParent(current);
            }
            // Set the current node to the child with the current character
            current = current.getChild(word[c]);

            // When the word is complete, set the current node to be (is end of word)
            if (c === word.length - 1) {
                current.setIsEndOfWord();
            }
        }
    }

    search(word: string): boolean {
        // Set currentNode to be root node
        let current = this.root;

        // Loop through characters of word we're searching for
        for (let c = 0; c < word.length; c++) {
            
            // Check to see if the node has a child with the current character
            if(!current.hasChild(word[c])) {
                // If it doesn't we know it's not a word
                return false;
            }

            // Set the new current node to be the child with the current character
            current = current.getChild(word[c]);
        }

        // Return is a word; This guards against returning early 
        // if it's only a valid prefix but not a whole word;
        return current.isEndOfWord;
    }
 
    // Return TrieNode to keep track of sequential calls for typeahead;
    startsWith(prefix: string): Array<string> {
        // Set currentNode to be root node
        let current = this.root;
        const output = [];

        // Loop through characters of word we're searching for
        for (let c = 0; c < prefix.length; c++) {
            if(current.hasChild(prefix[c])) {
                // If it doesn't we know it's not a word
                current = current.getChild(prefix[c]);
            }
        }
        

        // We need to descend the tree to the end of the word
        // and then return the words that are at the end of the tree
        // We can use dfs on each child to do this;
        let nodesToVisit: Array<TrieNode> = [...Object.values(current.children)];
        let visitedNodes: Array<TrieNode> = [];
        // While nodes to visit is not empty
        while(nodesToVisit.length > 0) {
            // removes and returns first node to visit
            let currentNode:TrieNode = nodesToVisit.shift();

            // add current node to visited nodes
            visitedNodes.push(currentNode);

            // if the current node is at the end of the word
            // we call getWord which goes back up the tree
            // and returns the word ascending the tree to the root
            if(currentNode.isEndOfWord) {
                output.push(currentNode.getWord());
            }

            // add all children of current node to nodes to visit
            nodesToVisit.push(...Object.values(currentNode.children));
        }

       return output;
    }

    remove(word: string) {
        let current = this.root;

        // Loop through characters of word we're searching for
        for (let c = 0; c < word.length; c++) {

            // Check to see if this node is the end of a word
            // And if the word matches the node's word
            if(current.isEndOfWord && word === current.getWord()) {
                // Get has children
                const hasChildren = Object.values(current.children).length > 0;
                // If the node has children all we want to do is set the current node 
                // to be not end of word to delete it. This reason is because we check for
                // isEndOfWord to return if it's a valid word.
                if(hasChildren) {
                    current.isEndOfWord = false;
                    return;
                }

                // Otherwise we want to mark this node as an empty dictionary.
                // We do that by calling this node's parent and then calling child which is 
                // where we are now. The child node of our parent is us. 
                // Otherwise if we just set current to be null, it's only a reference, 
                // not the actual node and won't do anything.
                current.parent.children = {};
            }

            if(!current.hasChild(word[c])) {
                // If it doesn't we know it's not a word
                return false;
            }
            current = current.getChild(word[c]);
        }
        return true
    }


    print() {
        console.log(esserializer.serialize(this.root));
    }   
}

export default Trie;

