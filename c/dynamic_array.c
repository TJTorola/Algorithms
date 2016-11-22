#include <stdio.h>
#include <stdlib.h>

typedef struct {
	int length;
	int capacity;
	int *data;
	int startIdx;
} Array;

int idx(Array * array, int i);
int val(Array * array, int i);

Array * newArray() {
	Array * array = malloc(sizeof(Array));

	array->length = 0;
	array->startIdx = 0;
	array->capacity = 1;
	array->data = malloc(sizeof(int));

	return array;
}

void printArray(Array * array) {
	int i = 0;

	printf("[");
	while (i < array->length) {
		printf("%i", val(array, i));

		if (i != array->length - 1) {
			printf(", ");
		}
		i++;
	}
	printf("]\n");
}

void doubleCapacity(Array * array) {
	int *new = malloc(sizeof(int) * array->capacity * 2);

	int newIdx = 0;
	int oldIdx = 0;
	while(newIdx < array->length) {
		oldIdx = idx(array, newIdx);
		new[newIdx] = array->data[oldIdx];

		newIdx++;
	}
	free(array->data);
	array->data = new;
	array->capacity *= 2;
	array->startIdx = 0;
}

int idx(Array * array, int i) {
	if (i < 0 && i < -array->length) {
		return -1;
	} else if(i >= 0 && i > array->length) {
		return -1;
	}

	if (i < 0) {
		i = (i % array->length) + array->length;
	}

	return (array->startIdx + i) % array->capacity;
}

int val(Array *array, int i) {
	i = idx(array, i);
	return array->data[i];
}

void moveStartIndex(Array *array, int diff) {
	array->startIdx += diff;

	if (array->startIdx < 0) {
		array->startIdx = array->capacity + array->startIdx;
	}
}

void push(Array * array, int val) {
	if (array->length == array->capacity) {
		doubleCapacity(array);
	}

	int last = idx(array, -1);
	int next = last + 1;

	array->data[next] = val;
	array->length++;
}

int pop(Array * array) {
	int val = array->data[idx(array, -1)];

	array->length--;

	return val;
}

void unshift(Array * array, int val) {
	moveStartIndex(array, -1);

	int first = idx(array, 0);
	array->data[first] = val;
	array->length++;
}

int main() {
	Array * a = newArray();
	push(a, 1);
	push(a, 22);
	push(a, 32);
	push(a, 4);
	push(a, 5);
	push(a, 3);
	push(a, 4);
	push(a, 5);
	push(a, 4);
	push(a, 5);
	push(a, 3);
	push(a, 4);
	// unshift(a, 23);
	// pop(a);
	printArray(a);
	return 0;
}