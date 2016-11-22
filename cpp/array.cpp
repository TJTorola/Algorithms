#include <iostream>
#include <stdlib.h>
#include <time.h>
using namespace std;

class Array {
	public:
		Array() {
			capacity = 1;
			length = 0;
			startIdx = 0;
			data = new int[capacity];
		};

		int get(int);
		void set(int, int);
		void push(int);
		int pop();
		void unshift(int);
		int shift();
		bool empty();
		void print(bool);
		int length;
		void shuffle();
		void swap(int, int);
	private:
		void doubleCapacity();
		void halveCapacity();
		int addr(int);
		void shiftStartIdx(int);
		int capacity, startIdx;
		int *data;
};

void Array::doubleCapacity() {
	int *newData = new int[capacity * 2];

	int i = 0;
	while (i < length) {
		newData[i] = get(i);
		i++;
	}

	delete data;
	data = newData;
	capacity *= 2;
	startIdx = 0;
}

void Array::halveCapacity() {
	int *newData = new int[capacity / 2];

	int i = 0;
	while (i < length) {
		newData[i] = get(i);
		i++;
	}

	delete data;
	data = newData;
	capacity /= 2;
	startIdx = 0;
}

int Array::addr(int idx) {
	return (startIdx + idx) % capacity;
}

void Array::shiftStartIdx(int delta) {
	startIdx = (startIdx + delta) % capacity;
	if (startIdx < 0) { startIdx += capacity; }
}

int Array::get(int idx) {
	return data[addr(idx)];
}

void Array::set(int idx, int val) {
	data[addr(idx)] = val;
}

void Array::push(int val) {
	if (length == capacity) {
		doubleCapacity();
	}

	set(length++, val);
}

int Array::pop() {
	int val = get(--length);

	if (length <= capacity / 4) {
		halveCapacity();
	}

	return val;
}

void Array::unshift(int val) {
	if (length == capacity) {
		doubleCapacity();
	}

	shiftStartIdx(-1);
	set(0, val);
	length++;
}

int Array::shift() {
	int val = get(0);

	shiftStartIdx(1);
	length--;

	if (length <= capacity / 4) {
		halveCapacity();
	}

	return val;
}

bool Array::empty() {
	return (length == 0);
}

void Array::shuffle() {
	srand(time(NULL));

	int i = 1;
	int randIdx;
	while(i < length) {
		randIdx = rand() % (i + 1);
		swap(i, randIdx);
		i++;
	}
}

void Array::swap(int left, int right) {
	int saved = get(left);
	set(left, get(right));
	set(right, saved);
}

void Array::print(bool metaInfo = false) {
	int i = 0;

	cout << "[";
	while (i < length) {
		cout << get(i);

		if (i++ != length - 1) {
			printf(", ");
		}
	}
	cout << "]\n";

	if (metaInfo) {
		cout << "length   : " << length << "\n";
		cout << "capacity : " << capacity << "\n";
		cout << "startIdx : " << startIdx << "\n\n";
	}
}