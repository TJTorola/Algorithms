#include <stdio.h>
#include <stdlib.h>
#include "./linked_list.c"
#include "./dynamic_array.c"

int aliquotSum(int num);
int * aliquotSequence(int base, int n);
node * aliquotList(int base, int n);

int main() {
	Array * arr = newArray();

	push(arr, 1);
	push(arr, 2);
	push(arr, 1);
	printArray(arr);
	return 0;
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

node * aliquotList(int base, int n) {
	node * head = newNode(base);

	int i = 1;
	while (i < n) {
		listUnshift(head, aliquotSum(lastListVal(head)));
		i++;
	}

	return head;
}

Array * aliquotArray(int base, int n) {
	Array * arr = newArray();
	arr.push(base);

	int i = 1;
	while (i < n) {
		push(arr, aliquotSum(last(arr)));
	}
}