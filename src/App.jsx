import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(new Date("2024-12-15T16:14:58"));
  const [prevNumbers, setPrevNumbers] = useState({
    secondOnes: 0,
    secondTens: 0,
    minuteOnes: 0,
    minuteTens: 0,
    hourOnes: 0,
    hourTens: 0,
  });
  const [animatingNumber, setAnimatingNumber] = useState(null);
  const [currentAnimationStep, setCurrentAnimationStep] = useState(9);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const buttonTimeoutRef = useRef(null);

  // 生成数字数组
  const singleDigits = Array.from({ length: 10 }, (_, i) => i);
  const tensDigits = Array.from({ length: 6 }, (_, i) => i);
  const hourTensDigits = Array.from({ length: 3 }, (_, i) => i);

  // 获取时间的各个部分
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // 计算各个数字
  const hourTens = Math.floor(hours / 10);
  const hourOnes = hours % 10;
  const minuteTens = Math.floor(minutes / 10);
  const minuteOnes = minutes % 10;
  const secondTens = Math.floor(seconds / 10);
  const secondOnes = seconds % 10;

  // 处理全屏切换
  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        // 进入全屏
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
        if (buttonTimeoutRef.current) {
          clearTimeout(buttonTimeoutRef.current);
        }
        buttonTimeoutRef.current = setTimeout(() => {
          setShowButton(false);
        }, 2000);
      } else {
        // 退出全屏
        await document.exitFullscreen();
        setIsFullscreen(false);
        setShowButton(true);
      }
    } catch (err) {
      console.error("全屏切换失败:", err);
    }
  };

  // 监听全屏变化
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      if (!document.fullscreenElement) {
        setShowButton(true);
        if (buttonTimeoutRef.current) {
          clearTimeout(buttonTimeoutRef.current);
        }
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // 处理鼠标移动
  useEffect(() => {
    if (isFullscreen) {
      const handleMouseMove = () => {
        setShowButton(true);
        if (buttonTimeoutRef.current) {
          clearTimeout(buttonTimeoutRef.current);
        }
        buttonTimeoutRef.current = setTimeout(() => {
          setShowButton(false);
        }, 2000);
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        if (buttonTimeoutRef.current) {
          clearTimeout(buttonTimeoutRef.current);
        }
      };
    }
  }, [isFullscreen]);

  // 更新时间
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 在时间更新时处理动画
  useEffect(() => {
    if (prevNumbers.secondOnes === 9 && secondOnes === 0) {
      setAnimatingNumber("secondOnes");
      setCurrentAnimationStep(9);
      const interval = setInterval(() => {
        setCurrentAnimationStep((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            setAnimatingNumber(null);
            return 0;
          }
          return prev - 1;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [secondOnes, prevNumbers.secondOnes]);

  // 更新前一个状态
  useEffect(() => {
    setPrevNumbers({
      secondOnes,
      secondTens,
      minuteOnes,
      minuteTens,
      hourOnes,
      hourTens,
    });
  }, [secondOnes, secondTens, minuteOnes, minuteTens, hourOnes, hourTens]);

  // 计算数字位置
  const getPosition = (num, currentNum, prevNum, radius, offset = 0) => {
    // 固定间隔为15度
    const angleStep = 20;
    // 基准角度为0度（右侧）
    const baseAngle = 0;

    // 计算与当前数字的差值
    let diff = num - currentNum;

    // 如果正在动画中，使用动画步骤
    if (prevNum === 9 && currentNum === 0) {
      if (num > currentAnimationStep) {
        diff = num - currentAnimationStep - 1;
      } else if (num === 0) {
        diff = 9 - currentAnimationStep;
      } else {
        diff = num - currentAnimationStep;
      }
    }

    // 计算最终角度
    const angle = baseAngle + diff * angleStep + offset;
    // 转换为弧度
    const radian = (angle * Math.PI) / 180;
    // 计算坐标
    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);

    return {
      transform: `translate(${x}px, ${y}px)`,
    };
  };

  return (
    <>
      <div className={`clock-container ${isFullscreen ? "fullscreen" : ""}`}>
        <div className="clock">
          {/* 外圈 - 秒钟个位 */}
          <div className="ring seconds-ones">
            {singleDigits.map((num) => (
              <span
                key={`seconds-ones-${num}`}
                className={`number ${num === secondOnes ? "active" : ""} ${
                  prevNumbers.secondOnes === 9 && secondOnes === 0
                    ? "reverse-rotate"
                    : ""
                }`}
                style={getPosition(
                  num,
                  secondOnes,
                  prevNumbers.secondOnes,
                  350,
                  0
                )}
              >
                {num}
              </span>
            ))}
          </div>

          {/* 外圈 - 秒钟十位 */}
          <div className="ring seconds-tens">
            {tensDigits.map((num) => (
              <span
                key={`seconds-tens-${num}`}
                className={`number ${num === secondTens ? "active" : ""} ${
                  prevNumbers.secondTens === 5 && secondTens === 0
                    ? "reverse-rotate"
                    : ""
                }`}
                style={getPosition(
                  num,
                  secondTens,
                  prevNumbers.secondTens,
                  300,
                  0
                )}
              >
                {num}
              </span>
            ))}
          </div>

          {/* 中圈 - 分钟个位 */}
          <div className="ring minutes-ones">
            {singleDigits.map((num) => (
              <span
                key={`minutes-ones-${num}`}
                className={`number ${num === minuteOnes ? "active" : ""} ${
                  prevNumbers.minuteOnes === 9 && minuteOnes === 0
                    ? "reverse-rotate"
                    : ""
                }`}
                style={getPosition(
                  num,
                  minuteOnes,
                  prevNumbers.minuteOnes,
                  250,
                  0
                )}
              >
                {num}
              </span>
            ))}
          </div>

          {/* 中圈 - 分钟十位 */}
          <div className="ring minutes-tens">
            {tensDigits.map((num) => (
              <span
                key={`minutes-tens-${num}`}
                className={`number ${num === minuteTens ? "active" : ""} ${
                  prevNumbers.minuteTens === 5 && minuteTens === 0
                    ? "reverse-rotate"
                    : ""
                }`}
                style={getPosition(
                  num,
                  minuteTens,
                  prevNumbers.minuteTens,
                  200,
                  0
                )}
              >
                {num}
              </span>
            ))}
          </div>

          {/* 内圈 - 小时个位 */}
          <div className="ring hours-ones">
            {singleDigits.map((num) => (
              <span
                key={`hours-ones-${num}`}
                className={`number ${num === hourOnes ? "active" : ""} ${
                  prevNumbers.hourOnes === 9 && hourOnes === 0
                    ? "reverse-rotate"
                    : ""
                }`}
                style={getPosition(num, hourOnes, prevNumbers.hourOnes, 150, 0)}
              >
                {num}
              </span>
            ))}
          </div>

          {/* 内圈 - 小时十位 */}
          <div className="ring hours-tens">
            {hourTensDigits.map((num) => (
              <span
                key={`hours-tens-${num}`}
                className={`number ${num === hourTens ? "active" : ""} ${
                  prevNumbers.hourTens === 2 && hourTens === 0
                    ? "reverse-rotate"
                    : ""
                }`}
                style={getPosition(num, hourTens, prevNumbers.hourTens, 100, 0)}
              >
                {num}
              </span>
            ))}
          </div>
        </div>
      </div>
      <button
        className={`fullscreen-btn ${
          !showButton && isFullscreen ? "hidden" : ""
        }`}
        onClick={toggleFullscreen}
      >
        {isFullscreen ? "退出全屏" : "全屏"}
      </button>
    </>
  );
}

export default App;
