class Solution:
    def plusOne(self, list: list[int]) -> list[int]:
        num = ''
        for n in list:
            num += str(n)
        
        digits = []
        num = str(int(num) + 1)
        for digit in num:
            digits.append(int(digit))
        
        return digits        