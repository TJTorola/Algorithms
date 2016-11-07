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
	a.pop();
	a.push(-2);
	return 0;
}

void Array::doubleCapacity() {
	cout << "DOUBLE\n";
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
	cout << "PUSH " << val << "\n";
	if (length == capacity) {
		doubleCapacity();
	}

	data[length++] = val;
	print();
}

int Array::pop() {
	int val = data[--length];
	cout << "POP " << val << "\n";
	print();
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
	cout << "length   : " << length << "\n";
	cout << "capacity : " << capacity << "\n";
	cout << "startIdx : " << startIdx << "\n\n";
}