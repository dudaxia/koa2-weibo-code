/**
 * @description 测试用例 demo
 * @author dudaxia
 */

function sum(a, b) {
  return a + b
}

test('10plus20equle30', () => {
  const res = sum(10,20)
  // 断言：判断值是否相等
  expect(res).toBe(30) 
  expect(res).not.toBe(40)
})