#include "./array.cpp"

void bubbleSort(Array);
void selectionSort(Array);
void insertionSort(Array arr, int jump = 1);
void shellSort(Array arr);

int main() {
	Array a;
	int i = 10;
	while (i < 50) {
		a.push(i);
		i++;
	}

	a.shuffle();
	shellSort(a);
	a.print(true);

	a.shuffle();
	selectionSort(a);
	a.print(true);

	return 0;
}

void bubbleSort(Array arr) {
	int i;
	bool sorted = false;
	while (!sorted) {
		sorted = true;
		i = 1;
		while (i < arr.length) {
			if (arr.get(i - 1) > arr.get(i)) {
				arr.swap(i - 1, i);
				sorted = false;
				arr.print();
			}
			i++;
		}
	}
}

void selectionSort(Array arr) {
	int min, mindex;
	for (int i = 0; i < arr.length - 1; i++) {
		mindex = i;
		for (int j = i + 1; j < arr.length; j++) {
			if (arr.get(j) < arr.get(mindex)) {
				mindex = j;
			}
		}

		arr.swap(i, mindex);
		arr.print();
	}
}

void insertionSort(Array arr, int jump) {
	for (int i = jump - 1; i < arr.length; i++) {
		for (int j = i; j >= jump; j -= jump) {
			if (arr.get(j) < arr.get(j - jump)) {
				arr.swap(j, j - jump);
				arr.print();
			} else {
				break;
			}
		}
	}
}

void shellSort(Array arr) {
	int i = 0;
	while ((3 * (i + 1) + 1) <= arr.length) {
		i++;
	}

	while(i >= 0) {
		insertionSort(arr, (3 * i-- + 1));
	}
}
