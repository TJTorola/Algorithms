#include <stdio.h>
#include <stdlib.h>

int aliquotSum(int num);
int * aliquotSequence(int base, int n);

int main() {

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

int * aliquotSequence(int base, int n) {
	int sequence[n];
	sequence[0] = base;

	int i = 1;
	while (i < n) {
		sequence[i] = aliquotSum(sequence[i - 1]);
	}

	return sequence;
}