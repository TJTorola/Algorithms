#include <iostream>
using namespace std;

class Array {
	public:
		Array() {
			capacity = 1;
			length = 0;
			startIdx = 0;
			data = new int[capacity];
		};

		void push(int);
		int pop();
		void unshift(int);
		int shift();
		bool empty();
		void print();
		int length;
	private:
		void doubleCapacity();
		int capacity, startIdx;
		int *data;
};

int main() {
	Array a;
	a.push(3);
	a.push(4);
	a.push(5);
	a.push(36);
	a.push(13);
	a.push(-2);
	a.print();
	return 0;
}

void Array::doubleCapacity() {
	int *newData = new int[capacity * 2];

	int i = 0;
	while (i < length) {
		newData[i] = data[i];
		i++;
	}

	delete data;
	data = newData;
	capacity *= 2;
}

void Array::push(int val) {
	if (length == capacity) {
		doubleCapacity();
	}

	data[length++] = val;
}

int Array::pop() {
	int val = data[length--];
	return val;
}

void Array::unshift(int val) {

}

int Array::shift() {
	return 0;
}

bool Array::empty() {
	return true;
}

void Array::print() {
	int i = 0;

	cout << "[";
	while (i < length) {
		cout << data[i];

		if (i++ != length - 1) {
			printf(", ");
		}
	}
	cout << "]\n";
}