import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(false);
  const [passWord, setPassWord] = useState("");
  const [bgColorButton, setBgColorButton] = useState("bg-blue-700");
  const passwordRef = useRef(null); //Using useRef to get focus

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "1234567890";
    if (charAllowed) str += `!@#$%^&*()_+-=~"[] `;

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassWord(pass);
    setBgColorButton("bg-blue-700");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, numberAllowed, charAllowed, setPassWord]);

  useEffect(() => {
    generatePassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, numberAllowed, charAllowed, generatePassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current.select();
    passwordRef.current?.setSelectionRange(0, 101)
    window.navigator.clipboard.writeText(passWord);
    setBgColorButton("bg-green-500");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passWord]);

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <h1 className="text-3xl text-blue-500 font-bold fixed top-14">
        PassWord Generator
      </h1>

      <div className="h-1/2 w-1/2 bg-[#252525bd] px-4 rounded-3xl flex items-center justify-center flex-col">
        <div className="flex w-full rounded-xl overflow-hidden shadow mb-4">
          <input
            type="text"
            value={passWord}
            className=" bg-[#555555] outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            className={`outline-none text-white px-3 py-0.5 shrink-0 ${bgColorButton}`}
            onClick={copyPasswordToClipboard}
          >
            <i className="fa fa-copy"></i>
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>

        <button
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 rounded-lg mt-8 h-12 w-16"
          onClick={generatePassword}
        >
          <i className="fa fa-refresh text-3xl" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}

export default App;
