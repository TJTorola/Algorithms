#include <stdio.h>
#include <stdlib.h>

typedef struct {
	int parent;
	int size;
} Node;

Node * root(int idx, Node *tree[]) {
	while (idx != tree[idx]->parent) {
		idx = tree[idx]->parent;
	}

	return tree[idx];
}

int join(Node *tree[], int left, int right) {
	Node * leftRoot  = root(left, tree);
	Node * rightRoot = root(right, tree);

	if (leftRoot->size > rightRoot->size) {
		rightRoot->parent = leftRoot->parent;
		leftRoot->size += rightRoot->size;

		return leftRoot->size;
	} else {
		leftRoot->parent = rightRoot->parent;
		rightRoot->size += leftRoot->size;

		return rightRoot->size;
	}
}

int connected(Node *tree[], int left, int right) {
	Node *leftRoot  = root(left, tree);
	Node *rightRoot = root(right, tree);

	return (leftRoot->parent == rightRoot->parent);
}

Node * basicTree(int size) {
	Node * tree = Malloc(sizeof(Node) * size);

	int i = 0;
	while (i < size) {
		tree
	}
}

int main() {
	return 0;
}