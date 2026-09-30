import numpy as np

# Creating array
a = np.array([10, 20, 30, 40, 50])
print("Array: ", a)

# Basic Operations
print("Addition: ", a + 5)
print("Multiplication: ",a * 2)

# Indexing
print("First Element: ",a[0])
print("Last Element: ",a[-1])

# Slicing
print("Elements from index 1 to 3: ",a[1:4])
print("Alternate Elements: ",a[::2])