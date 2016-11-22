#include <stdio.h>
#include <stdlib.h>

typedef struct node {
	int val;
	struct node * next;
} node;

node * newNode(int val) {
	node * newNode = malloc(sizeof(node));

	newNode->val = val;
	newNode->next = NULL;
	return newNode;
}

void printList(node * head) {
	node * current = head;
	while (current != NULL) {
		printf("%d", current->val);
		if (current->next == NULL) {
			printf("\n");
		} else {
			printf(" -> ");
		}
		current = current->next;
	}
}

node * listPush(node * head, int val) {
	node * pushed = newNode(val);

	pushed->next = head;
	return pushed;
}

node * listPop(node * head) {
	node * tail = head->next;
	free(head);

	return tail;
}

void listUnshift(node * head, int val) {
	node * current = head;

	while(current->next != NULL) {
		current = current->next;
	}

	current->next = newNode(val);
}

void listShift(node * head) {
	node * current = head;

	while(current->next->next != NULL) {
		current = current->next;
	}

	free(current->next);
	current->next = NULL;
}

int lastListVal(node * head) {
	node * current = head;
	int last = 0;

	while(current != NULL) {
		last = current->val;
		current = current->next;
	}

	return last;
}