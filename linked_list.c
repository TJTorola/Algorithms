#include <stdio.h>
#include <stdlib.h>

typedef struct node {
	int val;
	struct node * next;
} node;

void printList(node * head);
node * push(node * head, int val);
node * pop(node * head);
node * newNode(int val);
int aliquotSum(int num);
node * aliquotSequence(int base, int n);
int last(node * head);

int main() {
	node * head = aliquotSequence(12, 8);

	printList(head);
	return 0;
}

node * newNode(int val) {
	node * newNode = malloc(sizeof(node));

	newNode->val = val;
	newNode->next = NULL;
	return newNode;
}

void printList(node * head) {
	node * current = head;
	while (current != NULL) {
		printf("%d\n", current->val);
		current = current->next;
	}
}

node * push(node * head, int val) {
	node * pushed = newNode(val);

	pushed->next = head;
	return pushed;
}

node * pop(node * head) {
	node * tail = head->next;
	free(head);

	return tail;
}

void unshift(node * head, int val) {
	node * current = head;

	while(current->next != NULL) {
		current = current->next;
	}

	current->next = newNode(val);
}

void shift(node * head) {
	node * current = head;

	while(current->next->next != NULL) {
		current = current->next;
	}

	free(current->next);
	current->next = NULL;
}

int aliquotSum(int num) {
	int sum = 0;
	int i = 1;

	while (i < num) {
		if (num % i == 0) {
			sum += i;
		}
		i++;
	}

	return sum;
}

int last(node * head) {
	node * current = head;
	int last = 0;

	while(current != NULL) {
		last = current->val;
		current = current->next;
	}

	return last;
}

node * aliquotSequence(int base, int n) {
	node * head = newNode(base);

	int i = 1;
	while (i < n) {
		unshift(head, aliquotSum(last(head)));
		i++;
	}

	return head;
}