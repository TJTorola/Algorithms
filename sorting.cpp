#include "./array.cpp"

int main() {
	Array a;
	int i = 0;
	while (i < 10) {
		a.push(i);
		i++;
	}

	a.print();

	return 0;
}