import { StudyCatStorage } from "../storage/StudyCatStorage.js"; 
import { Mood } from "../models/Mood.js";
import { StudyCatState } from "../models/StudyCatState.js";
export async function runStorageTest() {
  // ... (代码内容不变)console.group("🧪 StudyCat Storage System Check (存储系统检查)");
  console.log("🚀 Starting tests... (开始测试)");

  try {
    // --- TEST 1: Reset (测试重置功能) ---
    // 目标：确保 resetState 能把数据恢复成默认值（0金币，睡觉状态）
    console.log("1️⃣ Testing Reset...");
    await StudyCatStorage.resetState();
    const defaultState = await StudyCatStorage.loadState();
    
    if (defaultState.coins === 0 && defaultState.currentMood === Mood.SLEEPY) {
      console.log("✅ Reset Passed: Default state loaded correctly. (重置成功)");
    } else {
      throw new Error(`❌ Reset Failed: Expected coins 0, got ${defaultState.coins}`);
    }

    // --- TEST 2: Save New State (测试保存功能) ---
    // 目标：创建一个包含金币、心情和学习状态的新数据，看看能不能存进去
    console.log("2️⃣ Testing Save...");
    
    // 创建一个测试用的假数据
    const newState: StudyCatState = {
      ...defaultState,
      coins: 100,
      currentMood: Mood.HAPPY,
      isStudying: true, // 这是我们新加的字段，必须测试它
      blackList: defaultState.blackList,
      elapsedTime: 0
    };
    
    await StudyCatStorage.saveState(newState);
    console.log("✅ Save command executed. (保存指令已执行)");

    // --- TEST 3: Load Verification (测试读取验证) ---
    // 目标：重新从存储里读出来，看看数据是不是和刚才存的一模一样
    console.log("3️⃣ Testing Load...");
    const loadedState = await StudyCatStorage.loadState();
    
    if (loadedState.coins === 100 && loadedState.currentMood === Mood.HAPPY && loadedState.isStudying === true) {
      console.log("✅ Load Passed: Data persistence verified. (读取成功：数据一致)");
    } else {
      throw new Error(`❌ Load Failed: Data mismatch. Expected coins 100, got ${loadedState.coins}`);
    }

    // --- 结论 ---
    console.log("🎉 CONGRATULATIONS! All Storage Tests Passed! (恭喜！所有存储测试通过)");

  } catch (error) {
    console.error("💥 TEST FAILED (测试失败):", error);
  } finally {
    console.groupEnd();
  }
}