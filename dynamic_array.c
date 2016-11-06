#include <stdio.h>
#include <stdlib.h>

typedef struct {
	int length;
	int capacity;
	int *data;
	int startIdx;
} Array;

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
		printf("%i", *(array->data + i));

		if (i != array->length - 1) {
			printf(", ");
		}
		i++;
	}
	printf("]\n");
}

void doubleCapacity(Array * array) {
	array->capacity *= 2;
	array->data = realloc(array->data, sizeof(int) * array->capacity);
}

void push(Array * array, int val) {
	if (array->length == array->capacity) {
		doubleCapacity(array);
	}

	int * next = array->data + array->length + array->startIdx;
	*next = val;

	array->length++;
}