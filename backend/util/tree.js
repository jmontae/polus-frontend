class TreeNode {
	constructor(value) {
		this.value = value;
		this.children = [];
	}
}

class Tree {
	constructor(root) {
		this._root = root || null;
	}

	_traverse(callback) {
		const self = this;

		let goThrough = (node) => {
			if( !callback(node) ) {
				node.children.forEach( child => {
					goThrough(child);
				});
			}
		}

		goThrough(self._root);
	}

	add(value, parentValue) {
    this._traverse((node) => {
      if (node.value === parentValue) {
      	let child = node.children.find( el => el.value == value )
        if( !child ) {
        	node.children.push( new TreeNode(value) );
      	}
      }
    });
  }

  _removeNode(value) {
    this._traverse((node) => {
      node.children.forEach((childNode, index) => {
        if (childNode.value === value) {
          node.children.splice(index, 1);
        }
      });
    })
  }

  get(value) {
  	console.log(this._search(value));
  	return this._search(value);
  }

  _search(value) {
    let returnNode = false;
    this._traverse((node) => {
      if (node.value === value) {
        returnNode = node;
      }
    });
    return returnNode;
  }

  _displayLeafs(parentValue) {
    const parentNode = typeof parentValue === 'string' ? this._search(parentValue) : parentValue ;
    let leafsRet = [];
    if (parentValue.children && !parentValue.children.length) {
      return parentValue;
    }

    parentNode.children.forEach((child) => {
      leafsRet.push(this._displayLeafs(child));
    });

    return leafsRet.flat();
  }
}

module.exports = { TreeNode, Tree };