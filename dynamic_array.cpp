#include <iostream>
using namespace std;

class Array {
	public:
		Array() {
			capacity = 1;
			length = 0;
			startIdx = 0;
			data = new int[capacity];

			cout << "INIT\n";
			print();
		};

		int get(int);
		void set(int, int);
		void push(int);
		int pop();
		void unshift(int);
		int shift();
		bool empty();
		void print();
		int length;
	private:
		void doubleCapacity();
		void halveCapacity();
		int addr(int);
		void shiftStartIdx(int);
		int capacity, startIdx;
		int *data;
};

int main() {
	Array a;
	a.push(3);
	a.push(4);
	a.push(5);
	a.shift();
	a.push(36);
	a.push(13);
	a.pop();
	a.push(-2);
	a.unshift(100);
	a.unshift(0);
	a.pop();
	a.shift();
	a.shift();
	a.shift();
	a.pop();
	a.pop();

	cout << "EMPTY? " << a.empty() << "\n";
	return 0;
}

void Array::doubleCapacity() {
	cout << "DOUBLE\n";
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
	cout << "HALVE\n";
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
	cout << "PUSH " << val << "\n";
	if (length == capacity) {
		doubleCapacity();
	}

	set(length++, val);
	print();
}

int Array::pop() {
	int val = get(--length);
	cout << "POP " << val << "\n";

	if (length <= capacity / 4) {
		halveCapacity();
	}

	print();
	return val;
}

void Array::unshift(int val) {
	cout << "UNSHIFT " << val << "\n";
	if (length == capacity) {
		doubleCapacity();
	}

	shiftStartIdx(-1);
	set(0, val);
	length++;
	print();
}

int Array::shift() {
	int val = get(0);
	cout << "SHIFT " << val << "\n";

	shiftStartIdx(1);
	length--;

	if (length <= capacity / 4) {
		halveCapacity();
	}

	print();
	return val;
}

bool Array::empty() {
	return (length == 0);
}

void Array::print() {
	int i = 0;

	cout << "[";
	while (i < length) {
		cout << get(i);

		if (i++ != length - 1) {
			printf(", ");
		}
	}
	cout << "]\n";
	cout << "length   : " << length << "\n";
	cout << "capacity : " << capacity << "\n";
	cout << "startIdx : " << startIdx << "\n\n";
}